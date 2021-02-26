import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
         
        <Col md="2" sm="4" style={{
                               color : "black"}}>
            <Card  className='cardH' border="warning" style={{
                               color : "black"}}>
                <Card.Img 
                  className='cardImg'
                  variant="top" 
                  src={props.favBook.bimg}  
                 />
                <Card.Title><h6>{props.favBook.bname}</h6></Card.Title>
                <Box 
                           component="fieldset" 
                           mb={3} 
                           borderColor="transparent">
                        
                           <Rating 
                               name="read-only" 
                               value={calcAvrg(props.favBook.brate)}
                               precision={0.5}
                               readOnly />
                        </Box>
                    <Row >
                        <Col md="3">
                            {props.delete && 
                             <Button 
                                className='btn3'
                                variant="outline-danger"
                                onClick={()=> props.deleteBook(props.favBook._id)}
                                >delete 
                            </Button> 
                            }
                        </Col>
                    </Row>
            </Card>
        </Col>
    </>
    )
}