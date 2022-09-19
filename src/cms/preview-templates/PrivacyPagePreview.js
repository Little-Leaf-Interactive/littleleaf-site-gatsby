import React from 'react'
import PropTypes from 'prop-types'
import { PrivacyPageTemplate } from '../../templates/privacy-policy-page'

const PrivacyPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  return (
    <PrivacyPageTemplate
      heading={data.heading}
      description={data.description}
      content={widgetFor('body')}
    />
  )
}

PrivacyPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
}

export default PrivacyPagePreview
