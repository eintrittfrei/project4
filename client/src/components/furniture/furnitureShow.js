import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
// import ListGroupItem from 'react-bootstrap/ListGroupItem'
// import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth/functions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'





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

  console.log('onepiece', onepiece)

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


  return (
    <>
    
      <Container className="header">{onepiece.name}</Container>
      <Container className="show_style">
        <Row className="inner_row">
          <Col className="image" xs={2} md={2} lg={2} style={{ width: '22rem' }}><Image style={{ width: '20rem' }} src={onepiece.image} alt={onepiece.name} />
          </Col>
          <Col className="detail"xs={2} md={2} lg={2} style={{ width: '22rem' }}>
            <Row >{`[description] ${onepiece.description}`}</Row>
            <Row>{`[name] ${onepiece.name}`}</Row>
            <Row>{`[year] ${onepiece.year}`}</Row>
            <Row>{`[designer] ${onepiece.designer}`}</Row>
            <Row>{`[color] ${onepiece.color}`}</Row>
            <Row>{`[name] ${onepiece.name}`}</Row>
            {onepiece.owner &&
            <>
              <Row>{`[added by] ${onepiece.owner.username}`}</Row>
            </>
            }
            <Row>{userIsOwner() === onepiece.owner ?
              <>
                <Button onClick={handleDelete} variant="dark">Delete</Button>
                <Card.Link href={`/furniture/${id}/edit`} >Edit</Card.Link>
        
              </>
              :
              <></>
            }</Row>
            
          </Col>
          
        </Row>
        <Col xs={2} md={2} lg={3} style={{ width: 'rem' }}>
          <Row><div><p>Comments</p>
      
            { onepiece.comments && 
<Row>
  <Col xs={1} md={1} lg={1} style={{ width: '200rem' }}>
    {
      onepiece.comments.map(item => {
        return (
          <div key={item.id}>
            <p>{item.owner} </p>
            <p>{item.text}</p>
            <p>created at {item.created_at}</p>
          
          </div>
        )
      })
    }
  </Col>
</Row>
            }
          </div></Row> 
        </Col>
        <Row>

        </Row>
        
      </Container>
      
    </>
       
        



  )


}

export default FurnitureShow