import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { BLACKGREY, GREY, device, shadow600 } from '../../data/contants'
import CoverImage from './CoverImage'
import BlogAuthorInterface from '../../interfaces/blog-author'
import DateFormatter from './DateFormatter'
import Avatar from './Avatar'

const Container = styled.article`
width:100%;
display: flex;
flex-direction: column;
background: white;
row-gap:1rem;
`

const TextContainer = styled.div`
text-align: left;
padding:20px;
display: flex;
flex-direction: column;
flex-grow:1;
row-gap:0.5rem;
>h3{
    font-weight:600;
    color: ${BLACKGREY};
}
>span{
    font-size: 0.9rem;
    color: ${GREY};
    text-transform: uppercase;
    margin-bottom:-0.5rem;
}
>p{
    color: ${GREY}90;
    display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
>a{
    margin-top:auto;
    align-self: flex-end;
 


}`

type Props = {
    title: string
    coverImage: string
    date: string
    excerpt: string
    author: BlogAuthorInterface
    slug: string
  }
  
const BlogPreview = ({  title,
    coverImage,
    date,
    excerpt,
    author,
    slug}:Props) => {
  return (
    <Container>
    <div  >
      <CoverImage slug={slug} title={title} src={coverImage} />
    </div>
    <h3  className="h3">
      <Link
        as={`/blog/${slug}`}
        href="/blog/[slug]"
        className="hover:underline"
      >
        {title}
      </Link>
    </h3>
    <div  >
      <DateFormatter dateString={date} />
    </div>
    <p className="h6" >{excerpt}</p>
    <Avatar name={author.name} picture={author.picture} />
  </Container>
  )
}

export default BlogPreview