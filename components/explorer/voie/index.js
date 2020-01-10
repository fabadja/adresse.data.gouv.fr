import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Section from '../../section'

import AddressesTable from '../../addresses-table'
import Head from './head'
import MapContainer from './map-container'

const Voie = ({commune, voie, numero}) => {
  const handleSelect = (numero, suffixe) => {
    const {codeCommune, idVoie} = Router.query
    const href = `/explore/commune/voie?codeCommune=${codeCommune}&idVoie=${idVoie}${numero ? `&numero=${numero}${suffixe || ''}` : ''}`
    const as = `/explore/commune/${codeCommune}/voie/${idVoie}${numero ? `/numero/${numero}${suffixe || ''}` : ''}`

    Router.push(href, as)
  }

  return (
    <Section>
      <Head
        commune={commune}
        voie={voie}
        numero={numero ? numero.numero : null}
        suffixe={numero ? numero.suffixe : null} />
      <MapContainer
        voie={voie}
        addresses={voie.numeros}
        numero={numero}
        onSelect={handleSelect} />
      <AddressesTable
        addresses={voie.numeros}
        numero={numero}
        onSelect={handleSelect} />
    </Section>
  )
}

Voie.propTypes = {
  commune: PropTypes.object,
  voie: PropTypes.shape({
    nomVoie: PropTypes.string.isRequired,
    codeCommune: PropTypes.string.isRequired,
    nomCommune: PropTypes.string.isRequired,
    numeros: PropTypes.array.isRequired
  }),
  numero: PropTypes.object
}

Voie.defaultProps = {
  commune: null,
  voie: null,
  numero: null
}

export default Voie
