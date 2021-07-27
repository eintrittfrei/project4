import React from 'react' 
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button' 
import Select from 'react-select'

const EditForm = ({ 
  formdata, 
  handleChange, 
  handleSubmit, 
  selectOptions, 
  selectOptionsRoom, 
  handleMultiChange }) => {


  return (

    <Col>
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
    </Col>


  )


}
export default EditForm