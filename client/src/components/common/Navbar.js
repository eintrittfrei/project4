import React, { useEffect, useState } from 'react' 
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useLocation, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth/functions'



const NavBar = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [userinfo, setUserinfo] = useState([])
  
  
  // console.log('location', location)

  // useEffect(() => {

  // },[pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/furniture/')
  }
  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const currentTime = Math.round(Date.now() / 1000) // as its millisconds devide by 1k as here 
    return currentTime < payload.exp // will return true or false booloean 
  }
  console.log(userIsAuthenticated())

  const userId = () => {
    const payload = getPayload()
    if (!payload) return false
    console.log('SUB', payload.sub)
    return payload.sub
  
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/jwt_auth/${userId()}/`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          })
        setUserinfo(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()

  }, [pathname])
  console.log('userinfo', userinfo)
  
  return (
    <>
      <Navbar bg="transparent" variant="light" expand="lg">
        <Container>
          <div className="navbar_start">
            <Navbar.Brand  href="/furniture/">Furniture</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="navbar_end">
              <Nav className="me-auto">
                <Nav.Link href="/about/">About</Nav.Link>
                {!userIsAuthenticated() ? 
                  <>
                    <Nav.Link href="/register/">Register</Nav.Link>
                    <Nav.Link href="/login/">Sign In</Nav.Link>
                  </> :
                  <>
                    <Nav.Link href="/new/">Add new furniture</Nav.Link>
                    
                    <Nav.Link href="/furniture/">{`Welcome ${userinfo.username}`} </Nav.Link>
                    <img 
                      src={userinfo.profile_image}
                      alt={userinfo.owner}
                      height={30}
                      width={30}
                      className="nav-bar-profile-image"
                    />
                    <Button className="logout" onClick={handleLogout} variant="transparent">Logout</Button>
                  </>

                }
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>

  )



}

export default NavBar