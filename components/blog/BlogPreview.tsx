import COLORS from '@/constants/COLORS'
import Link from 'next/link'
import styled from 'styled-components'
import BlogAuthorInterface from '../../interfaces/blog-author'
import Avatar from './Avatar'
import CoverImage from './CoverImage'
import DateFormatter from './DateFormatter'

const Container = styled.article`
width:100%;
display: flex;
flex-direction: column;
background: ${COLORS.WHITE};
&:hover{
    background: ${COLORS.LIGHTGREY};
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

const BlogPreview = ({ title,
  coverImage,
  date,
  excerpt,
  author,
  slug }: Props) => {
  // const {rewrite} = useRewrites()
  return (
    <Container className='transition rounded-sm'>
      <CoverImage title={title} src={coverImage} link={`/blog/${slug}`} />
      <div className='flex flex-col gap-2 p-4 flex-1'>
        <div>
          <DateFormatter className="sp" dateString={date} />
        </div>
        <h3 className="text-xl font-semibold">
          <Link
            href={`/blog/${slug}`}
          //locale 
          // as={`/${rewrite("blog")}/${slug}`}
          // href={`/${rewrite("blog")}/[slug]`}

          >
            {title}
          </Link>
        </h3>
        <p className="font-light">{excerpt}</p>
        <div className='flex-1' />
        <Avatar
          name={author.name}
          picture={author.picture} />
      </div>
    </Container>
  )
}

export default BlogPreview