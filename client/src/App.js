import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import NavBar from './components/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import About from './components/About'


const App = () => {
  //  const [furniture, setFurniture] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/furniture')
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])





  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/' component={Home} />
        </Switch>
      </BrowserRouter>
     
    </>
  )
}

export default App
