import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Content, { HTMLContent } from '../components/Content'

export const GamePageTemplate = ({
  content,
  contentComponent,
  image,
  title,
  heading,
  description,
  intro,
  main,
  testimonials,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="content">
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
        }}
      >
        <h2
          className="has-text-weight-bold is-size-1"
          style={{
            boxShadow: '0.5rem 0 0 #22B573, -0.5rem 0 0 #22B573',
            backgroundColor: '#22B573',
            color: 'white',
            padding: '1rem',
          }}
        >
          {title}
        </h2>
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
                <p>{description}</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10 is-offset-1">
                {intro.blurbs && <Features gridItems={intro.blurbs} />}
                <PageContent className="content" content={content} />
                <Testimonials testimonials={testimonials} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

GamePageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
  testimonials: PropTypes.array,
}

const GamePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <GamePageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        description={frontmatter.description}
        contentComponent={HTMLContent}
        intro={frontmatter.intro}
        title={frontmatter.title}
        content={data.markdownRemark.html}
        testimonials={frontmatter.testimonials}
      />
    </Layout>
  )
}

GamePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default GamePage

export const gamePageQuery = graphql`
  query GamePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
        }
        testimonials {
          author
          quote
        }
      }
    }
  }
`
