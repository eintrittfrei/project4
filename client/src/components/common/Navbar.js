import React from 'react' 
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { getPayload } from '../../helpers/auth/functions'



const NavBar = () => {
  const history = useHistory() 
  

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  
  
  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const currentTime = Math.round(Date.now() / 1000) // as its millisconds devide by 1k as here 
    return currentTime < payload.exp // will return true or false booloean 
  }
  console.log(userIsAuthenticated())


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Furniture</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">About</Nav.Link>
              {!userIsAuthenticated() ? 
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </> :
                <Button onClick={handleLogout} variant="dark">Log Out</Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

  )



}

export default NavBar