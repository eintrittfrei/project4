import React from 'react'
// import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Link from 'react-bootstrap/NavLink'

const FurnitureCard = ({ id, name, image }) => {


  return (
    <>
      <Row>
        <Col sm={true} >
          <Row>
            <Card  style={ { width: '18rem', height: '25rem' }} key={id}>
              <Link href={`/furniture/${id}/`}>
                <Card.Img height={300}  className='card_image' key={id} variant="top" src={image} />
              </Link>
             
              <Card.Title key={id}>{name}</Card.Title>
           
            </Card>
          </Row>
        </Col>
      </Row>
              
    </>
  )



}

export default FurnitureCard