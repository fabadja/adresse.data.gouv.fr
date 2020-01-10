import React from 'react'
import PropTypes from 'prop-types'

import {getTypeByPriority} from '../lib/types'

import {tagsList} from '../lib/table'

import TableList from './table-list'
import NoPositionWarning from './no-position-warning'

class VoiesTable extends React.Component {
  static propTypes = {
    voies: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  selectVoie = item => {
    const {voies, onSelect} = this.props

    onSelect(
      voies.find(voie => voie.idVoie === item.key)
    )
  }

  render() {
    const {voies} = this.props
    const noPosition = 'Ce lieu nommé ne possède pas encore de position renseignée.'
    const headers = [
      {
        title: 'Nom de voie',
        type: 'alphabetical',
        func: voie => voie.nomVoie
      },
      {
        title: 'Nombre d’adresses',
        type: 'numeric',
        func: voie => voie.numerosCount
      },
      {title: 'Source'}
    ]

    if (!voies[0].sourceNomVoie) {
      headers.splice(2, 1)
    }

    const genItems = voies => {
      return voies.map(voie => {
        return {
          key: voie.idVoie,
          values: [
            voie.nomVoie,
            voie.numerosCount === 0 ? (<NoPositionWarning check={voie.position} text={noPosition} />) : voie.numerosCount,
            tagsList(getTypeByPriority(voie.sources))
          ]
        }
      })
    }

    const genItemsBal = voies => {
      return voies.map(voie => {
        return {
          key: voie.idVoie,
          values: [
            voie.nomVoie,
            voie.numerosCount === 0 ? (<NoPositionWarning check={voie.position} text={noPosition} />) : voie.numerosCount
          ]
        }
      })
    }

    return (
      <TableList
        title='Voies de la commune'
        subtitle={`${voies.length} voies répertoriées`}
        list={voies}
        headers={headers}
        genItems={voies[0].sourceNomVoie ? genItems : genItemsBal}
        initialSort={headers[0]}
        handleSelect={this.selectVoie} />
    )
  }
}

export default VoiesTable
