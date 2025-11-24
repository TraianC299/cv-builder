import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import BlogPreview from '../../components/blog/BlogPreview'
import { PageSEO } from '../../components/utilities/SEO'
import BlogPostInterface from '../../interfaces/blog-post'
import BlogService from '../../services/BlogService'

const BlogsContainer = styled.main`
display: grid;
grid-template-columns: 1fr;
grid-gap: 2rem;
margin-top: 1rem;


@media ${MEDIAQUERIES.laptopSmall}{
  grid-template-columns: repeat(3, 1fr);
}
`

const Container = styled.section`
padding: 0 1rem;
max-width: 1400px;
margin:auto;
margin-bottom: 4rem;

`
const Page = ({ allPosts }: { allPosts: BlogPostInterface[] }) => {
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation("blog")
  return (
    <>
      <PageSEO
        canonicalUrl={`https://resumelio.com/${locale}/blog`}
        title={t("blog_meta_title")}
        description={t("blog_meta_description")}
      ></PageSEO>
      <Container className='sectionPadding'>
        <h1 className='text-4xl font-semibold'>{t("blogs")}:</h1>
        <BlogsContainer>
          {allPosts.length > 0 && allPosts.map((post) => {
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

export const getStaticProps = async ({ locale }: {
  locale: string
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


