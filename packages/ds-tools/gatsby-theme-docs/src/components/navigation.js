import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Element } from 'react-ui'

import sidebar from '../sidebar'

const demoSlugs = ['/setup-guide/', '/button/']

function Navigation() {
  const data = useStaticQuery(query)

  const posts = data.allMdx.edges.map(post => {
    const title = post.node.frontmatter.title
    const slug = post.node.fields.slug

    return { title, slug }
  })

  const categories = sidebar.map(item => item.title)

  return (
    <>
      {categories.map(function(category, index) {
        const { slugs } = sidebar.find(item => item.title === category) || {
          slugs: []
        }

        return (
          <div key={index}>
            <Element as="h4" component="CategoryHeader">
              {category}
            </Element>
            <Element as="ul" component="List">
              {slugs.map((slug, index) => {
                const post = posts.find(post => post.slug === slug)

                if (post) {
                  return (
                    <Element as="li" component="ListItem">
                      <Link to={post.slug}>{post.title}</Link>
                    </Element>
                  )
                } else {
                  console.log(
                    `Did not find ${slug}, did you mean one of: \n${posts
                      .map(post => post.slug)
                      .filter(post => !demoSlugs.includes(post.slug))
                      .join('\n')}`
                  )
                  return <li key={index}>Missing {slug}</li>
                }
              })}
            </Element>
          </div>
        )
      })}
    </>
  )
}

export default Navigation

const query = graphql`
  query {
    allMdx {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            home
          }
        }
      }
    }
  }
`