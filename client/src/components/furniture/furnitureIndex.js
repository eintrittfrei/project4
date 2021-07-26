import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import Container from 'react-bootstrap/esm/Container'
import FurnitureCard from './FurnitureCard'



const FurnitureIndex = () => {
  const [furniture, setFurniture] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/furniture')
        setFurniture(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  // console.log('furniture on state🪑', furniture)

  

  return (
    
    <Container fluid>
    
      
           
      {furniture.map(piece =>{
        
        return <FurnitureCard key={piece.id} {...piece} />
        
      }) }
      
      
    </Container>
  )






} 

export default FurnitureIndex