import React from 'react'
import styled from 'styled-components'
import BlogPreview from '../../components/blog/BlogPreview'
import BlogPostInterface from '../../interfaces/blog-post'
import { PageSEO } from '../../components/utilities/SEO'
import BlogService from '../../services/BlogService'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'

const BlogsContainer = styled.main`
display: grid;
grid-template-columns: 1fr;
grid-gap: 2rem;
margin-top: 1rem;


@media ${MEDIAQUERIES.laptopSmall}{
  grid-template-columns: repeat(2, 1fr);
}
`

const Container = styled.section`
padding: 0 1rem;
max-width: 1400px;

margin:auto;

`
const Page = ({allPosts}:{allPosts:BlogPostInterface[]}) => {
 
  const {t} = useTranslation("blog")
  return (
  <>
  <PageSEO
  title='Explore Expert CV Writing Tips & Advice | Free Online CV Builder Blog'
  description='Discover our extensive collection of CV writing advice, tips, and guidance in our blog. Learn how to craft the perfect CV and land your dream job with our free online CV builder.'
  ></PageSEO>
    <Container className='sectionPadding'>
      <h2 className='h3'>{t("blogs")}:</h2>
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

        
    </Container>
    </>
  )
}

export default Page

export const getStaticProps = async ({locale}:{
  locale:string
}) => {
  const allPosts = BlogService.getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ], locale)


  return {
    props: { 
      allPosts,
      ...(await serverSideTranslations(locale, ["blog", "common"])),
     },
    
    
  }
}


