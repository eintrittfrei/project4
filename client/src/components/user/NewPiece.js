import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth/functions'


const NewFurniture = () => {
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
  console.log('formdata', formdata)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/furniture/', formdata,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        } 
      )
      console.log('headers', formdata)
    } catch (err) {
      console.log(err)
    }

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
        <Form.Select 
          multiple aria-label="select_type"
          onChange={handleChange}
          name="type"
          value={formdata.type} 
        >
          <option value="seating">seating</option>
          <option value="tables">tables</option>
          <option value="sofas">sofas</option>
          <option value="storage">storage</option>
          <option value="other">other</option>
        </Form.Select>
        <br />
        <Form.Label>Room</Form.Label>
        <Form.Select 
          multiple aria-label="Default select example"
          onChange={handleChange}
          name="room"
          value={formdata.room}   
        >
          <option value="Hallway">Hallway</option>
          <option value="Garden">Garden</option>
          <option value="Dining">Dining</option>
          <option value="Kids">Kids</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Lounge">Lounge</option>
          <option value="Bathroom">Bathroom</option>
        </Form.Select>
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
