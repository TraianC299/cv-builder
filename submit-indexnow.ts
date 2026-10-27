import fs from "fs";

const HOST = "resumelio.com";
const KEY = "a3f8b2c4d9e1f67890abcdef12345678";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function extractUrls(sitemapXml: string): string[] {
    const matches = sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g);
    return Array.from(matches, (m) => m[1].trim());
}

async function submitUrls(urls: string[]): Promise<void> {
    const body = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
    };

    const res = await fetch(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
    });

    if (res.ok || res.status === 202) {
        console.log(`✓ IndexNow: submitted ${urls.length} URLs (HTTP ${res.status})`);
    } else {
        const text = await res.text().catch(() => "");
        throw new Error(`IndexNow responded with HTTP ${res.status}: ${text}`);
    }
}

async function main() {
    const sitemapPath = "public/sitemap.xml";

    if (!fs.existsSync(sitemapPath)) {
        console.error("sitemap.xml not found — run generate-sitemap first.");
        process.exit(1);
    }

    const xml = fs.readFileSync(sitemapPath, "utf-8");
    const urls = extractUrls(xml);

    if (urls.length === 0) {
        console.warn("No URLs found in sitemap.");
        return;
    }

    console.log(`Found ${urls.length} URLs in sitemap.`);

    // IndexNow supports up to 10,000 URLs per request
    const BATCH_SIZE = 10_000;
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        await submitUrls(urls.slice(i, i + BATCH_SIZE));
    }
}

main().catch((err) => {
    console.error("IndexNow submission failed:", err.message);
    process.exit(1);
});
