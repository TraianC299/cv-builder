import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import CoverImage from './CoverImage'
import BlogAuthorInterface from '../../interfaces/blog-author'
import DateFormatter from './DateFormatter'
import Avatar from './Avatar'
import COLORS from '@/constants/COLORS'
import useRewrites from 'hooks/useRewrites'

const Container = styled.article`
width:100%;
display: flex;
flex-direction: column;
background: ${COLORS.WHITE};
row-gap:0.5rem;
:hover{

    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

>div:first-child{
    width: 100%;
    height: 240px;
    overflow: hidden;

}


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
      const {rewrite} = useRewrites()
  return (
    <Container className='transition rounded-sm'>
    <div  >
      <CoverImage  title={title} src={coverImage} />
    </div>
    <div className='flex column gap-2 p-4'>
      <div  >
        <DateFormatter className="sp" dateString={date} />
      </div>
      <h3 className="h5 font-semibold">
        <Link
          //locale 
          as={`/${rewrite("blog")}/${slug}`}
          href={`/${rewrite("blog")}/[slug]`}
        >
          {title}
        </Link>
      </h3>
      <p className="p text-grey font-light">{excerpt}</p>
      <Avatar
      style={{margin: 'auto', marginBottom: '0rem', marginLeft: '0rem'}}
      name={author.name}
      picture={author.picture} />
    </div>
  </Container>
  )
}

export default BlogPreview