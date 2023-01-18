import React, { useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { BLACKGREY, DARKGREY, GREYWHITE, MAINCOLOR } from '../../data/contants'
import Link from 'next/link'
import { Button } from '../../styles/global'
import useScrollPosition from '../../hooks/useScrollPosition'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'


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
  background: ${MAINCOLOR};
    background-size: 35px 20px, 100% 100%, 100% 100%;
}
:after{
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            max-height: 30rem;
            background: linear-gradient(to bottom, ${MAINCOLOR}20 0%, rgba(255, 255, 255, 0) 100%);
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
  color: ${BLACKGREY};
}
*{
  color: ${DARKGREY};
}
img{
      max-width:100%;
      margin:auto;
      border-radius:1rem;
      border: 2px solid ${GREYWHITE};
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
const BlogPage = ({post}) => {
  const router = useRouter()

  const scrollPosition = useScrollPosition()
  const [percentageRead, setPercentageRead] = React.useState(0)


  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  useEffect(()=>{
    const scrollPercentage = Math.round((scrollPosition / (document.body.clientHeight - window.innerHeight)) * 100)
    setPercentageRead(scrollPercentage)
  },[scrollPosition])



  return (
 <article>
 <Head>
        <title>{post.title}</title>
        {/* <link rel="canonical" href={`https://beelocals.com/blog/${props.queryTitle}`}></link> */}
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta name="author" content="Ionel Vrabii" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        {/* <meta property="og:url" content={`https://beelocals.com/blog/${props.queryTitle}`} /> */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="https://beelocals.com" />
        
 </Head>
    <Wrapper >
      <progress  className='blog-progress-indicator' value={percentageRead} max={100} ></progress>
      <Container >
        <Title className='sectionPadding'>
          <h1 className='h1'>{post.title}</h1>
          <p>Read it in <b>5 minutes</b></p>
          <h2 className='h6 t300'>{post.description}</h2>
        </Title>
        <BlogContent  className='blog sectionPadding' dangerouslySetInnerHTML={{__html: post.content}}></BlogContent>
        <CallToAction className='sectionPadding'>
          <p style={{textAlign:"center"}} className="p t600">After reading this you might want to try out CV-builder, it's free so just give it a try</p>
          <Link href="/create"><Button>{"Create your blog"}</Button></Link>
        </CallToAction>
      </Container>
    </Wrapper>
    </article>
  )
}

export default BlogPage



export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

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
  const posts = getAllPosts(['slug'])

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