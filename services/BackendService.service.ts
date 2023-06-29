import chromium from 'chrome-aws-lambda'
const BackendService = {
  getBrowserInstance:async() =>{
    const executablePath = await chromium.executablePath
    if (!executablePath) {
        // running locally
        const puppeteer = await import('puppeteer').then((m) => {
      return m.default;
    });
        return await puppeteer.launch({
            args: chromium.args,
            headless: true,
            defaultViewport: {
                width: 1280,
                height: 720
            },
            ignoreHTTPSErrors: true
        });
    }

    return await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true
    });
}

}

export default BackendService;