import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'




const FurnitureShow = () => {
  const [onepiece, setOnePiece] = useState({})
  const { id } = useParams()
  console.log('PARAMS', id)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/furniture/${id}`)
      setOnePiece(data)
    }
    getData()
  }, [id])

  console.log(onepiece)


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
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>



  )


}

export default FurnitureShow