import axios from 'axios'
import React, { useState } from 'react' 
import { useHistory, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import EditForm from './Form'
// import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth/functions'

const selectOptions = [
  { value: 5, label: 'Tables' },
  { value: 3, label: 'Sofas' },
  { value: 6, label: 'seating' },
  { value: 4, label: 'Lamps' },
  { value: 2, label: 'Storage' },
  { value: 1, label: 'Other' }
]
const selectOptionsRoom = [
  { value: 1, label: 'Hallway' },
  { value: 2, label: 'Garden' },
  { value: 3, label: 'Dining' },
  { value: 4, label: 'Kids' },
  { value: 5, label: 'Bedroom' },
  { value: 6, label: 'Kitchen' },
  { value: 7, label: 'Lounge' },
  { value: 8, label: 'Bathroom' }
]

const Edit = () => {
  const history = useHistory()
  const { id } = useParams()
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
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get(`/api/furniture/${id}`)
  //     setFormData(data)
  //     console.log('data', data)
  //   }
  //   getData()
  // }, [id]) 

  const handleChange = (event) => {
    const updatedFormData = { ...formdata, [event.target.name]: event.target.value }
    setFormData(updatedFormData)
  }
  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formdata, [name]: [...values] })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/furniture/${id}/`, formdata,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        } )
      history.push(`/furniture/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Container>
        <EditForm
          formdata={formdata}
          handleChange={handleChange} 
          handleMultiChange={handleMultiChange}
          handleSubmit={handleSubmit}
          selectOptions={selectOptions}
          selectOptionsRoom={selectOptionsRoom}  
        />
      </Container>
    </>
  )









}
export default Edit 