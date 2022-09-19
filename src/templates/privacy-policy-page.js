import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const PrivacyPageTemplate = ({
  content,
  contentComponent,
  heading,
  description
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="content">
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
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

PrivacyPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  heading: PropTypes.string,
  description: PropTypes.string,
}

const PrivacyPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <PrivacyPageTemplate
        heading={frontmatter.heading}
        description={frontmatter.description}
        contentComponent={HTMLContent}
        content={data.markdownRemark.html}
      />
    </Layout>
  )
}

PrivacyPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default PrivacyPage

export const privacyPageQuery = graphql`
  query PrivacyPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        heading
        description
      }
    }
  }
`
