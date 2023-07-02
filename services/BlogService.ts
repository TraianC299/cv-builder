import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}


const postsDirectory = join(process.cwd(), '_blogs')

function getPostSlugs() {
  console.log('postsDirectory', postsDirectory)
  return fs.readdirSync(postsDirectory)
  
}

function getPostBySlug(slug: string, fields: string[] = [], locale: string = 'en') {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(`${postsDirectory}/${realSlug}`, `${locale}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

function getAllPosts(fields: string[] = [], locale: string = 'en') {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, locale))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}


const BlogService = {
    getPostSlugs,
    getPostBySlug,
    getAllPosts,
    markdownToHtml
}

export default BlogService