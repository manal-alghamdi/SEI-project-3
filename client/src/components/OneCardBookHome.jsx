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
    const [value, setValue] = React.useState(2);
 
    return ( <>
         
        <Col md="2" sm="4" >
            <Card 
               className='cardH' 
               border="warning"
               style={{ width: '11.1rem' , high:'11rem' , color : "black"}}>
                    <Card.Img 
                      className='cardImg'
                      variant="top" 
                      src={props.book.bimg}  />
                    <Card.Body>
                        <Card.Title ><h6>{props.book.bname}</h6></Card.Title>
                        <Box 
                           component="fieldset" 
                           mb={3} 
                           borderColor="transparent">
                        
                           <Rating 
                               name="read-only" 
                               value={calcAvrg(props.book.brate)}
                               precision={0.5}
                               readOnly />
                        </Box>
                        <Row 
                          style={{
                               textAlign :"center",
                               justifyContent:"center"}}>
                                   {calcAvrg(props.book.brate)}/5
                        </Row>

                        
                        
                        <Row >
                        
                        
                        <Link to={`/Showbook/${props.book._id}`}>    
                           <Button 
                              className='btn1' variant="outline-secondary" 
                              onClick={()=>props.setSelectbook(props.book)}> more info</Button> 
                        </Link> 

                        </Row>
                    </Card.Body>
            </Card>
        </Col>
        </>
    )
}