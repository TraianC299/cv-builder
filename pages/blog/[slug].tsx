import COLORS from '@/constants/COLORS'
import LANGUAGES from '@/constants/LANGUAGES'
import useRewrites from 'hooks/useRewrites'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BlogSEO } from '../../components/utilities/SEO'
import useScrollPosition from '../../hooks/useScrollPosition'
import BlogPostInterface from '../../interfaces/blog-post'
import BlogService from '../../services/BlogService'
import { Button } from '../../styles/global'


const Wrapper = styled.main`
width: 100%;
position:relative;
border-top: 1px solid ${COLORS.LIGHTGREY};
progress{
  /* Reset the default appearance */
  -webkit-appearance: none;
   appearance: none;
  position: fixed;
    right: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.25rem;
    border: none;
    background-color: whiteSmoke;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    appearance: none;
    z-index:100;

  
}

progress[value]::-webkit-progress-value {
  background: ${COLORS.MAINCOLOR};
    background-size: 35px 20px, 100% 100%, 100% 100%;
}
`
const Container = styled.div`
max-width: 800px;
display: flex;
flex-direction: column;
margin: 0 auto;
position: relative;
box-sizing: border-box;
padding: 0 1rem;


   
    p, li, div{
        line-height: 1.8rem;
        letter-spacing: 0.02em;
    }
    li{
        margin-bottom: 20px;
    }



`


const Title = styled.header`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 15rem;
text-align: center;
margin: auto;
row-gap: 1rem;
padding-top: 3rem;
padding-bottom: 3rem;
>h1{
        margin-bottom: 2rem;
        letter-spacing: 0.1em;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin:0;
        
    }


`


const BlogContent = styled.div`
margin:auto;
h1, h2, h3{
  color: ${COLORS.BLACKGREY};
}
*{
  color: ${COLORS.GREY};
}
img{
      max-width:100%;
      margin:auto;
      border-radius:1rem;
      border: 2px solid ${COLORS.LIGHTGREY};
    }
`


const CallToAction = styled.div`
width:100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 5rem 0;
row-gap: 1rem;
`

type Props = {
  post: BlogPostInterface
}

const BlogPage = ({ post }: Props) => {
  const router = useRouter()

  const scrollPosition = useScrollPosition()
  const [percentageRead, setPercentageRead] = React.useState(0)
  const { t } = useTranslation('blog')

  useEffect(() => {
    const scrollPercentage = Math.round((scrollPosition / (document.body.clientHeight - window.innerHeight)) * 100)
    setPercentageRead(scrollPercentage)
  }, [scrollPosition])

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const { rewrite } = useRewrites()


  return (
    <article>
      <BlogSEO
        title={post.title}
        summary={post.excerpt}
        images={post.coverImage}
        date={post.date}
        authorDetails={[{
          name: post.author.name,
          avatar: post.author.picture,
        }]}
        url={`https://resumelio.com/${router.locale}/blog/${post.slug}`}
      />

      <Wrapper >
        <progress className='blog-progress-indicator' value={percentageRead} max={100} ></progress>
        <Container >
          <Title className='sectionPadding'>
            <h1 className='text-4xl mf-h1 font-semibold'>{post.title}</h1>
            <p>Read it in <b>5 minutes</b></p>
            <h2 className='text-xl t300'>{post.excerpt}</h2>
          </Title>
          <BlogContent className='blog sectionPadding' dangerouslySetInnerHTML={{ __html: post.content }}></BlogContent>
          <CallToAction className='sectionPadding'>
            <p style={{ textAlign: "center" }} className="p font-semibold">{t("end-of-blog-call-to-action")}</p>
            <Link href={rewrite("/creeaza-cv")}><Button>{t("create-your-cv")}</Button></Link>
          </CallToAction>
        </Container>
      </Wrapper>
    </article>
  )
}

export default BlogPage



export async function getStaticProps({ params, locale }: any) {
  console.log("getStaticProps for blog post", params, locale)
  const post = BlogService.getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ], locale)
  const content = await BlogService.markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,

      },
      ...(await serverSideTranslations(locale, ["blog", "common"])),
    },
  }
}

export async function getStaticPaths() {
  const slugs = BlogService.getPostSlugs()
  const paths: any[] = []
  slugs.forEach((slug: any) => {
    LANGUAGES.forEach(el => {
      paths.push({
        params: {
          slug: slug,
        },
        locale: el.locale,
      })
    })
  })

  return {
    paths: paths,
    fallback: false,
  }
}