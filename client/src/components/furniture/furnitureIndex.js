import React, { useEffect, useState } from 'react' 
import axios from 'axios'



const FurnitureIndex = () => {
  const [furniture, setFurniture] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/furniture')
        setFurniture('data💽', data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  console.log('furniture🪑', furniture)



  return (
    <h3>Index</h3>
  )






} 

export default FurnitureIndex