import React, { useState } from 'react' 
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button' 
import axios from 'axios'



const Register = () => {
  const [formdata, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    profile_image: '',
  })

  const handleChange = (event) => {
    const newFormdata = { ...formdata, [event.target.name]: event.target.value }
    setFormData(newFormdata)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/auth/register/', formdata)

    } catch (err) {
      console.log(err)
    }
  }







  
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              name="username" 
              value={formdata.username}
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              name="email" 
              value={formdata.email}
              onChange={handleChange} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={formdata.password}
              onChange={handleChange} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
            <Form.Label>Password confirmation</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password confirmation" 
              name="password_confirmation" 
              value={formdata.password_confirmation}
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              name="first_name" 
              value={formdata.first_name}
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter last name" 
              name="last_name" 
              value={formdata.last_name}
              onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile picture</Form.Label>
            <Form.Control 
              type="file" 
              name="profile_image" 
              value={formdata.profile_image}
              onChange={handleChange} />
          </Form.Group>
          <Button type="submit" variant="dark">Register</Button>{' '}
        </Form>
      </Container>
    </>
  )





}

export default Register 