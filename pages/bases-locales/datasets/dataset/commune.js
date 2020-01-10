import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {getCommune, getDataset} from '../../../../lib/bal/api'

import Page from '../../../../layouts/main'
import withErrors from '../../../../components/hoc/with-errors'

import Commune from '../../../../components/bases-locales/bases-adresse-locales/dataset/commune'
import VoiesCommune from '../../../../components/voies-commune'
import Section from '../../../../components/section'

const CommunePage = ({commune, dataset}) => {
  const [communePromise, setCommunePromise] = useState(null)

  useEffect(() => {
    setCommunePromise(getCommune(dataset.id, commune.code))
  }, [dataset.id, commune.code])

  const description = `${commune.nom} - ${commune.code}`

  return (
    <Page title={`Commune de ${commune.nom}`} description={description}>
      <Section>
        <Commune dataset={dataset} commune={commune} />
        <VoiesCommune query={dataset.id} promise={communePromise} commune={commune} />
      </Section>
    </Page>
  )
}

CommunePage.propTypes = {
  commune: PropTypes.object.isRequired,
  dataset: PropTypes.object.isRequired
}

CommunePage.getInitialProps = async ({query}) => {
  const {id, codeCommune} = query
  const dataset = await getDataset(id)
  const commune = await getCommune(id, codeCommune)
  return {
    dataset,
    commune
  }
}

export default withErrors(CommunePage)
