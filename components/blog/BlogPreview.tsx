import Link from "next/link";
import type BlogAuthorInterface from "../../interfaces/blog-author";
import Avatar from "./Avatar";
import CoverImage from "./CoverImage";
import DateFormatter from "./DateFormatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: BlogAuthorInterface;
  slug: string;
};

const BlogPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  // const {rewrite} = useRewrites()
  return (
    <article className="w-full rounded-sm bg-white transition hover:bg-lightgrey flex flex-col">
      <div className="h-60 w-full overflow-hidden">
        <CoverImage title={title} src={coverImage} link={`/blog/${slug}`} />
      </div>
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div>
          <DateFormatter className="text-sm" dateString={date} />
        </div>
        <h3 className="text-xl font-semibold">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="font-light">{excerpt}</p>
        <div className="flex-1" />
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </article>
  );
};

export default BlogPreview;
