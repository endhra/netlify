const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allPages:allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
              langKey
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
      blogposts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
        edges {
          node {
            id
            fields {
              slug
              langKey
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              description
              image
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    const pages = result.data.allPages.edges
    const sortedBlogPosts = result.data.blogposts.edges
    let posts = {
      es: [],
      en: []
    }
    // sort posts for every locale
    sortedBlogPosts.forEach((edge) => { 
      posts[edge.node.fields.langKey].push(edge)
    })

    //create all pages without blog posts
    pages.forEach((edge) => {
      // we need this because we have layout.md which 
      // we do not need to be converted to page
      if(!edge.node.fields) return

      const id = edge.node.id
      const langKey = edge.node.fields.langKey
      let templateKey = edge.node.frontmatter.templateKey
      let slug = edge.node.fields.slug
      
      if (templateKey !== 'blog-post' ) {

        if ( templateKey === 'blog-page' ) {
          createBlogPaginatedPages(posts.en, 'en', createPage)
          createBlogPaginatedPages(posts.es, 'es', createPage)
        } else {
          //all pages that are not connected to blog
          createPage({
            path: slug,
            component: path.resolve(
              `src/templates/${String(templateKey)}.js`
            ),
            // additional data can be passed via context
            context: {
              id,
              langKey
            },
          })
        }
      }
    })

    createPostPagesForLocale(posts.en, 'en', createPage)
    createPostPagesForLocale(posts.es, 'es', createPage)

  })
}

const createPostPagesForLocale = (posts, langKey, createPage)=> {
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    
    let templateKey = post.node.frontmatter.templateKey
    createPage({
      path: post.node.fields.slug,
      component: path.resolve(
        `src/templates/${String(templateKey)}.js`
      ),
      context: {
        id: post.node.id,
        langKey,
        skip: 0,
        slug: post.node.fields.slug,
        previous: previous?previous:null,
        next: next?next:null,
      },
    })
  })

}

const createBlogPaginatedPages = (posts, langKey, createPage) => {
  const postsPerPage = 9;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    let slug = langKey==='en'?'/blog':'/es/blog'
    createPage({
      path: i === 0 ? slug : slug+`/${i + 1}`,
      component: path.resolve('./src/templates/blog-page.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        langKey
      },
    });
  });

}