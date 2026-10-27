import H1Tag from "@/components/other/H1Tag";
import { PageSEO } from "@/components/other/SEO";
import BlogService from "@/lib/blog-service";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BlogPreview from "../../components/blog/BlogPreview";
import type BlogPostInterface from "../../interfaces/blog-post";

const Page = ({ allPosts }: { allPosts: BlogPostInterface[] }) => {
  const { t } = useTranslation("blog");
  return (
    <>
      <PageSEO
        title={t("blog_meta_title")}
        description={t("blog_meta_description")}
      ></PageSEO>
      <section className="mx-auto mb-16 max-w-[1400px] px-4">
        <H1Tag className="sr-only">{t("blogs")}:</H1Tag>
        <main className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {allPosts.length > 0 &&
            allPosts.map((post) => {
              return (
                <BlogPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              );
            })}
        </main>
      </section>
    </>
  );
};

export default Page;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const allPosts = BlogService.getAllPosts(
    ["title", "date", "slug", "author", "coverImage", "excerpt"],
    locale,
  );

  return {
    props: {
      allPosts,
      ...(await serverSideTranslations(locale, ["blog", "common"])),
    },
  };
};
