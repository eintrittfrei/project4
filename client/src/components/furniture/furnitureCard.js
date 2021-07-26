import React from 'react'
// import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const FurnitureCard = ({ id, name, image, description }) => {


  return (
    <>
      <Row>
        <Col>
          <Row>
            <Card key={id}>
              <Card.Img key={id} variant="top" src={image} />
              <Card.Body>
                <Card.Title keyt={id}>{name}</Card.Title>
                <Card.Text key={id}>
                  {description}
                </Card.Text>
                <Button href={`/furniture/${id}`} variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
              
    </>
  )



}

export default FurnitureCard