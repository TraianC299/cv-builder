import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
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
    <h3 className="h3">
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