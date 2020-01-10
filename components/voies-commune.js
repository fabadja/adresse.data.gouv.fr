import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import withFetch from './hoc/with-fetch'

import VoiesTable from './voies-table'

class VoiesCommune extends React.Component {
  static propTypes = {
    commune: PropTypes.object.isRequired,
    voies: PropTypes.array,
    query: PropTypes.string
  }

  static defaultProps = {
    voies: [],
    query: null
  }

  handleSelect = voie => {
    if (this.props.query) {
      if (voie.numerosCount === 0 && !voie.position) {
        return null
      }

      Router.push(
        `/bases-locales/jeux-de-donnees/${this.props.query}/${this.props.commune.code}/${voie.codeVoie}`
      )
    } else if (!voie.codeVoie) {
      Router.push(
        `/commune/voie?idVoie=${voie.idVoie}`,
        `/explore/commune/${this.props.commune.code}/voie/${voie.idVoie}`
      )
    }
  }

  render() {
    const {voies} = this.props

    return (
      <div className='voies'>
        <VoiesTable voies={voies} onSelect={this.handleSelect} />
        <style jsx>{`
          .voies {
            margin-top: 2em;
          }
          `}</style>
      </div>
    )
  }
}

export default withFetch(data => ({
  voies: data.voies
}))(VoiesCommune)
