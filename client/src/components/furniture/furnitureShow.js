import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { getTokenFromLocalStorage, getPayload } from '../../helpers/auth/functions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Link from 'react-bootstrap/NavLink'
import Figure from 'react-bootstrap/Figure'


const FurnitureShow = () => {
  const [onepiece, setOnePiece] = useState({})
  const [user, setUser] = useState({})
  const { id } = useParams()
  const history = useHistory()



  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/furniture/${id}/`)
      setOnePiece(data)
      console.log('DATA', data)
    }
    getData()
  }, [id])

  
  useEffect(() => {
    const getData2 = async () => {
      const { data } = await axios.get(`/api/furniture/${id}/`)
      setUser(data.owner)
    }
    getData2()
  }, [id])
  

  console.log('onepiece', onepiece)

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/furniture/${id}/`, { 
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      history.push(('/furniture/'))
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
            <Row className="normal_row">{`[description] ${onepiece.description}`}</Row>
            <Row className="normal_row">{`[name] ${onepiece.name}`}</Row>
            <Row className="normal_row">{`[year] ${onepiece.year}`}</Row>
            <Row className="normal_row">{`[designer] ${onepiece.designer}`}</Row>
            <Row className="normal_row">{`[color] ${onepiece.color}`}</Row>
            <Row className="normal_row">{`[name] ${onepiece.name}`}</Row>
            {onepiece.owner &&
            <>
              <Row>{`[added by] ${onepiece.owner.username}`}</Row>
            </>
            }
            <Row className="user_is_owner">{userIsOwner() === user.id ?
              <>
                <div className="buttons">
                  <Button className="delete" onClick={handleDelete} variant="link">Delete</Button>
                  <Link href={`/furniture/${id}/edit/`} variant="light" >Edit</Link>
                </div>
              </>
              :
              <></>
            }
            </Row>
          </Col>
        </Row>
        <Col>
          <Row className="comments"><div><p>Comments</p>
            { onepiece.comments && 
<Row className="comments_row">
  <Col xs={1} md={1} lg={1} style={{ width: '200rem' }}>
    {
      onepiece.comments.map(item => {
        return (
          <Figure className="comment_item" key={item.id}>
            <Figure.Caption key={item.id}>
              <div key={item.id}>
                {/* <p>{item.owner} </p> */}
                <p>{item.text}</p>
                <p>created at: {item.created_at}</p>
              </div>
            </Figure.Caption>
          </Figure>
          
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