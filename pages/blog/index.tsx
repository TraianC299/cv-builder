import React from 'react'
import styled from 'styled-components'
import BlogPreview from '../../components/blog/BlogPreview'
import { device } from '../../data/contants'
import { getAllPosts } from '../../lib/api'
import BlogPostInterface from '../../interfaces/blog-post'
import { PageSEO } from '../../components/utilities/SEO'

const BlogsContainer = styled.main`
display: grid;
grid-template-columns: 1fr;
grid-gap: 2rem;
margin-top: 1rem;


@media ${device.laptopSmall}{
  grid-template-columns: repeat(2, 1fr);
}
`
const Page = ({allPosts}:{allPosts:BlogPostInterface[]}) => {
 

  return (
  <>
  <PageSEO
  title='Explore Expert CV Writing Tips & Advice | Free Online CV Builder Blog'
  description='Discover our extensive collection of CV writing advice, tips, and guidance in our blog. Learn how to craft the perfect CV and land your dream job with our free online CV builder.'
  ></PageSEO>
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
    </>
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
