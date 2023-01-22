import React, { useState } from 'react' 
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form' 
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


const Login = () => {

  const history = useHistory()

  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const newFormdata = { ...formdata, [event.target.name]: event.target.value }
    setFormdata(newFormdata)
  } 
  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }  

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formdata)
      setTokenToLocalStorage(data.token)
      history.push('/furniture/')
      console.log('res', data)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <Container className="header">login</Container>
      <Container className="form_container">
        <Form onSubmit={handleSubmit}>
          
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
          
          <Button type="submit" variant="link">login</Button>{' '}
        
        </Form>
      </Container>
    </>
  )


}

export default Login