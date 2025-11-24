import METADATA from '@/constants/METADATA';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';


interface CommonSEOProps {
  title: string;
  description: string;
  ogType: string;
  ogImage: string | { url: string }[];
  canonicalUrl?: string;
}

export const CommonSEO: FC<CommonSEOProps> = ({ title, description, ogType, ogImage, canonicalUrl }) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${METADATA.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={METADATA.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={Array.isArray(ogImage) ? ogImage[0].url : ogImage} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <link
        rel="canonical"
        href={canonicalUrl ? canonicalUrl : `${METADATA.siteUrl}${router.asPath}`}
      />
    </Head>
  );
};


type PageSEOProps = {
  title: string
  description: string,
  canonicalUrl?: string
}

export const PageSEO = ({ title, description, canonicalUrl }: PageSEOProps) => {
  const ogImageUrl = METADATA.siteUrl + METADATA.socialBanner
  return (
    <CommonSEO
      canonicalUrl={canonicalUrl}
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
    />
  )
}



type TagSEOProps = {
  title: string
  description: string
}

export const TagSEO = ({ title, description }: TagSEOProps) => {
  const ogImageUrl = METADATA.siteUrl + METADATA.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${METADATA.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

type BlogSEOProps = {
  authorDetails?: {
    name: string
    avatar: string
  }[]
  title: string
  summary: string
  date: string
  lastmod?: string
  url: string
  images?: string | { url: string }[]
  canonicalUrl?: string
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}: BlogSEOProps) => {
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  let imagesArr =
    images.length === 0
      ? [METADATA.socialBanner]
      : typeof images === 'string'
        ? [images]
        : images

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      // @ts-ignore
      url: img.includes('http') ? img : METADATA.siteUrl + img,
    }
  })

  let authorList
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
      }
    })
  } else {
    authorList = {
      '@type': 'Person',
      name: METADATA.author,
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: METADATA.author,
      logo: {
        '@type': 'ImageObject',
        url: `${METADATA.siteUrl}${METADATA.siteLogo}`,
      },
    },
    description: summary,
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        // @ts-ignore
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
