import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import CoverImage from './CoverImage'
import BlogAuthorInterface from '../../interfaces/blog-author'
import DateFormatter from './DateFormatter'
import Avatar from './Avatar'
import COLORS from '@/constants/COLORS'

const Container = styled.article`
width:100%;
display: flex;
flex-direction: column;
background: ${COLORS.WHITE};
row-gap:0.5rem;
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
    <div  >
      <DateFormatter dateString={date} />
    </div>
    <h3 className="h5 font-semibold">
      <Link
        as={`/blog/${slug}`}
        href="/blog/[slug]"
        className="hover:underline"
      >
        {title}
      </Link>
    </h3>
    <p className="p">{excerpt}</p>
    <Avatar name={author.name} picture={author.picture} />
  </Container>
  )
}

export default BlogPreview