import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {tagsList} from '../../../lib/table'
import {getTypeByPriority} from '../../../lib/types'

import TableList from '../../table-list'

const AddressesTable = ({addresses, onSelect}) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const headers = [
    {title: 'Numéro'},
    {title: 'Sources'}
  ]

  const selectAddress = item => {
    setSelectedItem(item)
    onSelect(item.values[0])
  }

  const genItems = addresses => {
    return addresses.map(address => {
      return {
        key: address.cleInterop,
        values: [
          `${address.numero}${address.suffixe || ''}`,
          tagsList(getTypeByPriority(address.sources))
        ]
      }
    })
  }

  return (
    <div className='voies'>
      <TableList
        title='Adresses de la voie'
        subtitle={`${addresses.length} adresses répertoriées`}
        list={addresses}
        headers={headers}
        genItems={genItems}
        selected={selectedItem}
        handleSelect={selectAddress} />

      <style jsx>{`
        .voies {
          margin-top: 2em;
        }
      `}</style>
    </div>
  )
}

AddressesTable.propTypes = {
  addresses: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default AddressesTable
