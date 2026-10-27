import Avatar from "@/components/blog/Avatar";
import DateFormatter from "@/components/blog/DateFormatter";
import H1Tag from "@/components/other/H1Tag";
import { BlogSEO } from "@/components/other/SEO";
import { Button } from "@/components/ui/button";
import LANGUAGES from "@/constants/LANGUAGES";
import useRewrites from "@/hooks/useRewrites";
import type { LanguageType } from "@/interfaces/lang.types";
import BlogService from "@/lib/blog-service";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ErrorPage from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useScrollPosition from "../../hooks/useScrollPosition";
import type BlogPostInterface from "../../interfaces/blog-post";

type Props = {
  post: BlogPostInterface;
};

const BlogPage = ({ post }: Props) => {
  const router = useRouter();
  const scrollPosition = useScrollPosition();
  const { t } = useTranslation("blog");
  const { rewrite } = useRewrites();

  const percentageRead = useMemo(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return 0;
    }
    const totalScrollableHeight = document.body.clientHeight - window.innerHeight;
    if (totalScrollableHeight <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((scrollPosition / totalScrollableHeight) * 100)));
  }, [scrollPosition]);

  const readingTime = useMemo(() => {
    const plainText = post.content.replace(/<[^>]*>/g, " ");
    const wordsCount = plainText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordsCount / 200));
  }, [post.content]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <article>
      <BlogSEO
        title={post.title}
        summary={post.excerpt}
        images={post.coverImage}
        date={post.date}
        authorDetails={[{ name: post.author.name, avatar: post.author.picture }]}
        url={`https://resumelio.com${router.asPath}`}
      />

      <main className="relative w-full border-t border-lightgrey">
        {/* Reading progress bar */}
        <progress
          className="fixed left-0 right-0 top-0 z-[100] h-1 w-full appearance-none overflow-hidden rounded-sm border-0 bg-[#f5f5f5] shadow-[inset_0_2px_5px_rgba(0,0,0,0.25)] [&::-webkit-progress-value]:bg-maincolor"
          value={percentageRead}
          max={100}
        />
        <div className="mx-auto w-full max-w-[760px] px-4">
          {/* Back link */}
          <Link
            href={rewrite("/blog")}
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-grey hover:text-maincolor transition-colors"
          >
            <ChevronLeft size={16} />
            {t("back-to-blog")}
          </Link>

          {/* Header */}
          <header className="mt-6 flex flex-col gap-5 pb-8 border-b border-lightgrey">
            <H1Tag className="leading-tight">{post.title}</H1Tag>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Avatar name={post.author.name} picture={post.author.picture} />
              <span className="text-grey text-sm">·</span>
              <DateFormatter className="text-sm" dateString={post.date} />
              <span className="text-grey text-sm">·</span>
              <span className="text-sm text-grey">
                {t("read-it-in", { time: readingTime })}
              </span>
            </div>

            {/* Excerpt / lead */}
            {post.excerpt && (
              <p className="border-l-4 border-maincolor pl-4 text-lg leading-relaxed text-blackgrey font-medium">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Article body */}
          <div
            className="py-10 leading-[1.85rem] tracking-[0.02em]
              [&_*]:text-grey
              [&_p]:mb-5
              [&_a]:text-maincolor [&_a]:underline [&_a:hover]:opacity-75
              [&_h1]:mb-3 [&_h1]:mt-10 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-blackgrey
              [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-blackgrey
              [&_h3]:mb-3 [&_h3]:mt-8  [&_h3]:text-xl  [&_h3]:font-semibold [&_h3]:text-blackgrey
              [&_hr]:my-10 [&_hr]:border-lightgrey
              [&_img]:mx-auto [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-lightgrey [&_img]:my-6
              [&_ul]:mb-5 [&_ul]:space-y-1
              [&_ol]:mb-5 [&_ol]:space-y-1
              [&_li]:ml-6 [&_li]:list-disc
              [&_blockquote]:border-l-4 [&_blockquote]:border-maincolor [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-grey [&_blockquote]:my-6
              [&_code]:rounded [&_code]:bg-lightgrey [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-blackgrey
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* End CTA */}
          <div className="mb-20 rounded-2xl bg-[#eef2ff] px-8 py-10 flex flex-col items-center gap-4 text-center border border-[#c7d2fe]">
            <p className="text-lg font-semibold text-blackgrey max-w-sm">
              {t("end-of-blog-call-to-action")}
            </p>
            <Button asChild size="lg">
              <Link href={rewrite("/create-cv")}>{t("create-your-cv")}</Link>
            </Button>
          </div>
        </div>
      </main>
    </article>
  );
};

export default BlogPage;

export async function getStaticProps({
  params,
  locale,
}: {
  params: { slug: string };
  locale: string;
}) {
  const post = BlogService.getPostBySlug(
    params.slug,
    ["title", "date", "slug", "author", "content", "ogImage", "coverImage", "excerpt"],
    locale,
  );
  if (!post) {
    return { notFound: true };
  }

  const content = await BlogService.markdownToHtml(post.content || "");

  return {
    props: {
      post: { ...post, content },
      ...(await serverSideTranslations(locale, ["blog", "common"])),
    },
  };
}

export async function getStaticPaths() {
  const slugs = BlogService.getPostSlugs();
  const paths: { params: { slug: string }; locale: LanguageType }[] = [];
  slugs.forEach((slug: string) => {
    LANGUAGES.forEach((el) => {
      paths.push({ params: { slug }, locale: el.locale });
    });
  });

  return { paths, fallback: false };
}
