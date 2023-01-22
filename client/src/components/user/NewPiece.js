import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth/functions'
import EditForm from './Form'

const selectOptions = [
  { value: 5, label: 'Tables' },
  { value: 3, label: 'Sofas' },
  { value: 6, label: 'seating' },
  { value: 4, label: 'Lamps' },
  { value: 2, label: 'Storage' },
  { value: 1, label: 'Other' }
]
const selectOptionsRoom = [
  { value: 1, label: 'Hallway' },
  { value: 2, label: 'Garden' },
  { value: 3, label: 'Dining' },
  { value: 4, label: 'Kids' },
  { value: 5, label: 'Bedroom' },
  { value: 6, label: 'Kitchen' },
  { value: 7, label: 'Lounge' },
  { value: 8, label: 'Bathroom' }
]

const NewFurniture = () => {
  const history = useHistory()
  const [formdata, setFormData] = useState({
    name: '',
    image: '',
    year: '',
    designer: '',
    color: '',
    description: '',
    type: [],
    room: [],
  })

  const handleChange = (event) => {
    const newPiece = { ...formdata, [event.target.name]: event.target.value }
    
    setFormData(newPiece)
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/furniture/', formdata,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        } 
      )
      history.push('/furniture/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formdata, [name]: [...values] })
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formdata, image: url })
  }
 
  return (
    <>
      <Container className="header">add</Container>
      <Container className="form_container">
        <EditForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formdata={formdata}
          handleMultiChange={handleMultiChange}
          selectOptions={selectOptions}
          selectOptionsRoom={selectOptionsRoom}
          handleImageUrl={handleImageUrl}
        />
      </Container>
    </>

  )


}
export default NewFurniture