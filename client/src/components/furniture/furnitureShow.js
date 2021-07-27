import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth/functions'





const FurnitureShow = () => {
  const [onepiece, setOnePiece] = useState({})
  
  const { id } = useParams()
  const history = useHistory()



  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/furniture/${id}`)
      setOnePiece(data)
      console.log('DATA', data)
    }
    getData()
  }, [id])

  console.log(onepiece)

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/furniture/${id}`, { 
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      history.push(('/furniture'))
    } catch (err) {
      console.log(err)
    }
  }
  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return false
    return payload.sub
  
  }
  // userIsOwner()

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={onepiece.image} />
      <Card.Body>
        <Card.Title>{onepiece.name}</Card.Title>
        <Card.Text>
          {onepiece.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Year: {onepiece.year}</ListGroupItem>
        <ListGroupItem>Designer: {onepiece.designer}</ListGroupItem>
        
        <ListGroupItem>Color: {onepiece.color}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        {userIsOwner === onepiece.owner ?
          <>
            <Button onClick={handleDelete} variant="dark">Delete</Button>
            <Card.Link href={`/furniture/${id}/edit`} >Edit</Card.Link>
        
          </>
          :
          <></>
        }
      </Card.Body>
      <div><p>Comments</p>
      
        { onepiece.comments && 
        <div>

          {
            onepiece.comments.map(item => {
              return (
                <div key={item.id}>
                  <p>{item.text}</p>
                  <p>{item.owner.username}</p>
                  <p>{item.created_at}</p>
                </div>
              )
            })
          }
        </div>
        }
      </div>
    </Card>
        
       
        



  )


}

export default FurnitureShow