import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import NavBar from './components/common/Navbar'
import Register from './helpers/auth/Register'
import Login from './helpers/auth/Login'
import About from './components/common/About'
import FurnitureIndex from './components/furniture/FurnitureIndex'
import FurnitureShow from './components/furniture/FurnitureShow'
import NewFurniture from './components/user/NewPiece'
import Edit from './components/user/EditPiece'


const App = () => {
  

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/furniture/:id/edit/' component={Edit} />
          <Route path='/furniture/:id/' component={FurnitureShow} />
          <Route path='/furniture/' component={FurnitureIndex} />
          <Route path='/new/' component={NewFurniture} />
          <Route path='/about/' component={About} />
          <Route path='/login/' component={Login} />
          <Route path='/register/' component={Register} />
          <Route path='/' component={Home} />
        </Switch>
      </BrowserRouter>
     
    </>
  )
}

export default App
