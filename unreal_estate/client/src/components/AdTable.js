import React, { Component } from 'react'

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>BuildingType</th>
          <th>Location</th>
          <th>AvgRating</th>
        </tr>
      </thead>
    )
  }
const TableBody = props => {
  const rows = props.propertyData.map((row, index) => {
    return (
        <tr key={index}>
        <td>{row.name}</td>
        <td>{row.buildingType}</td>
        <td>{row.location}</td>
        <td>{row.avgRating}</td>
        <td>
          <button onClick={() => props.removeProperty(index)}>Delete</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}
class AdTable extends Component {
  render() {
    const { propertyData, removeProperty, addProperty} = this.props
    return (
        <table>
            <TableHeader />
            <TableBody propertyData={propertyData} removeProperty={removeProperty} addProperty={addProperty}/>
        </table>
    )
  }
}

export default AdTable