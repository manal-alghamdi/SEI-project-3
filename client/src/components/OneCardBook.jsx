import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function calcAvrg(array){
    if(!array) return 0 
     const sum = array.reduce((sum , num)=>{
      return sum + num  
     },0)
     if(array.length == 0 ) return 0 
     else return (sum/array.length)
     
 }

export default function OneCardBook(props) {
  
 return (
     
    <>
         
        <Col md="2" sm="4" >
             
            <Card className='cardH' border="warning"style={{
                               color : "black"}}>
                    <Card.Img 
                       variant="top" 
                       src={props.bimg} 
                       className='cardImg' />
                
                    <Card.Body>
                        <Card.Title><h6>{props.bname}</h6></Card.Title>
                        <Row 
                          style={{
                               textAlign :"center",
                               justifyContent:"center",
                               color : "black"}}>
                                   {calcAvrg(props.brate)}/10
                        </Row>
                        

                        <Row >
                            <Button 
                              className='btn1' variant="outline-danger"  
                              onClick={()=> props.deleteBook(props.id)}>Delete
                            </Button>

                            <Link to={`/EditBook/${props.id}`}> 
                                <Button 
                                    className='btn1' 
                                    variant="link" 
                                    onClick={()=>{props.setSelectbook(props.books)
                                    localStorage.setItem("EditBook" ,JSON.stringify( props.books)
                                    )
                                    console.log(props.books)
                                    }}>Edit Book
                                </Button>
                            </Link> 

                        </Row>
                    </Card.Body>
                </Card>
        </Col>
    </>
    )
}