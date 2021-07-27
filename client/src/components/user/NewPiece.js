import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth/functions'
import Select from 'react-select'

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
    console.log('type', event.target.type)
    setFormData(newPiece)
  }
  console.log('formdata', formdata)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/furniture/', formdata,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        } 
      )
      history.push('furniture')
    } catch (err) {
      console.log(err)
    }
  }

  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formdata, [name]: [...values] })
  }
 
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="basic_name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            value={formdata.name} 
            placeholder="Enter Furniture Name"
            onChange={handleChange}  
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="bascic_year">
          <Form.Label>Year</Form.Label>
          <Form.Control 
            type="year"
            name="year"
            value={formdata.year} 
            placeholder="Year of design" 
            onChange={handleChange}   
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="basic_designer">
          <Form.Label>Designer</Form.Label>
          <Form.Control 
            type="text" 
            name="designer"
            value={formdata.designer}
            placeholder="Designer" 
            onChange={handleChange} 
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="basic_color">
          <Form.Label>Color</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Color"
            name="color"
            value={formdata.color} 
            onChange={handleChange} 
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="basic_description">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Description"
            name="description"
            value={formdata.description} 
            onChange={handleChange} 
          />
          <Form.Text className="text-muted">
          </Form.Text>

        </Form.Group>
        <Form.Label>Type</Form.Label>
        <Select 
          options={selectOptions}
          isMulti
          name="type"
          onChange={(selected) => handleMultiChange(selected, 'type')}
        />
        
        <br />
        <Form.Label>Room</Form.Label>
        <Select 
          options={selectOptionsRoom}
          isMulti
          name="room"
          onChange={(selected) => handleMultiChange(selected, 'room')}
        />
        <br />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control 
            type="file" 
            name="image" 
            value={formdata.image}
            onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
      Submit
        </Button>{' '}
      </Form>

    </Container>


  )


}
export default NewFurniture
