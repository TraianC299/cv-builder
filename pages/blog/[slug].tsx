import React, { useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '../../styles/global'
import useScrollPosition from '../../hooks/useScrollPosition'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { BlogSEO } from '../../components/utilities/SEO'
import BlogPostInterface from '../../interfaces/blog-post'
import BlogService from '../../services/BlogService'
import COLORS from '@/constants/COLORS'


const Wrapper = styled.main`
width: 100%;
position:relative;

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
:after{
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            max-height: 30rem;
            background: linear-gradient(to bottom, ${COLORS.MAINCOLOR}20 0%, rgba(255, 255, 255, 0) 100%);
            right: 0;
            top: 0;
            pointer-events: none;
        }`
const Container = styled.div`
max-width: 800px;
display: flex;
flex-direction: column;
margin: 0 auto;
position: relative;
box-sizing: border-box;



   
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
min-height: 20rem;
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

const BlogPage = ({post}:Props) => {
  const router = useRouter()

  const scrollPosition = useScrollPosition()
  const [percentageRead, setPercentageRead] = React.useState(0)


  useEffect(()=>{
    const scrollPercentage = Math.round((scrollPosition / (document.body.clientHeight - window.innerHeight)) * 100)
    setPercentageRead(scrollPercentage)
  },[scrollPosition])

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }  


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
        url={`/blog/${post.slug}`}
      />

    <Wrapper >
      <progress  className='blog-progress-indicator' value={percentageRead} max={100} ></progress>
      <Container >
        <Title className='sectionPadding'>
          <h1 className='h1'>{post.title}</h1>
          <p>Read it in <b>5 minutes</b></p>
          <h2 className='h6 t300'>{post.excerpt}</h2>
        </Title>
        <BlogContent  className='blog sectionPadding' dangerouslySetInnerHTML={{__html: post.content}}></BlogContent>
        <CallToAction className='sectionPadding'>
          <p style={{textAlign:"center"}} className="p font-semibold">After reading this you might want to try out CV-builder, it's free so just give it a try</p>
          <Link href="/create-cv"><Button>{"Create your own cv"}</Button></Link>
        </CallToAction>
      </Container>
    </Wrapper>
    </article>
  )
}

export default BlogPage



export async function getStaticProps({ params }:any) {
  const post = BlogService.getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await BlogService.markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = BlogService.getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}