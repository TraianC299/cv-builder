import React from 'react'
import styled from 'styled-components'
import BlogPreview from '../../components/blog/BlogPreview'
import { device } from '../../data/contants'
import { getAllPosts } from '../../lib/api'
import BlogPostInterface from '../../interfaces/blog-post'

const BlogsContainer = styled.main`
display: grid;
grid-template-columns: 1fr;
grid-gap: 1rem;
padding: 1rem;



@media ${device.laptopSmall}{
  grid-template-columns: repeat(2, 1fr);


}
`
const Page = ({allPosts}:{allPosts:BlogPostInterface[]}) => {
 
  return (
  
    <section className='sectionPadding'>
      <h2 className='h3'>Stories:</h2>
      <BlogsContainer>
        { allPosts.length > 0 && allPosts.map((post) => {
          return <BlogPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
        />
        })}
      </BlogsContainer>

        
    </section>
  )
}

export default Page

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
