import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import axios from "axios";
import Rating from '@material-ui/lab/Rating';
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

  const [selectBook, setSelectBook] = useState(props.selectbook)
  const [book, setBook] = useState(selectBook);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const onChangeInput = ({ target: { name, value } }) => setBook({ ...book, [name]: value });
  
  const updateRating =(event, values) => {

    let bookId = props.favBook._id;
    // edit book rating
         axios
        .post(`http://localhost:4000/api/books/addrating/${bookId}`, book)
        .then((res) => {
            console.log("res.data.user from profile update: ", res.data.user)
        }) .catch((err) => console.log(err));
};
    
    return (
 <>
    <div className='padding'>
        <Col md="2" sm="4">
            <Card  className='cardH' border="warning">
                <Card.Img 
                   variant="top" 
                   src={props.favBook.bimg}  
                   className='cardImg' 
                 />
                <Card.Body>
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
                     <Col md={!props.delete? "12" : "5"}>
                        <Button 
                           variant="outline-secondary"
                           className='btn2'
                           className="outline-light"
                           style={{height:'30px', width:'60px'}}
                           onClick={
                                ()=> {
                                    handleShow();
                                //  props.addBookIreadit(props.favBook._id) ;props.deleteBook(props.favBook._id);
                            } 
                            }className="outline-light" >
                               <h5>I read it</h5> 
                        </Button>
                     </Col>
                     <Col md="3">
                            {props.delete && 
                               <Button 
                                 className='btn2'
                                 variant="outline-danger"
                                 onClick={()=> props.deleteBook(props.favBook._id)}
                                 style={{height:'30px', width:'60px' }}
                                >
                                    <h5>delete</h5> 
                                </Button> } 
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Rate The Book</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Did you like the book?
                                        <Form.Control
                                                type="number"
                                                placeholder=" enter number out of 5"
                                                name="brate"
                                                max="5"
                                                min="0"
                                                onChange={(e) => onChangeInput(e)}
                                                />
                                    </Modal.Body>
                                    <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button 
                                            variant="outline-secondary"  
                                            onClick={
                                                    ()=> {
                                                    updateRating();
                                                    handleClose();
                                                    props.addBookIreadit(props.favBook._id) ;
                                                    props.deleteBook(props.favBook._id);
                                                        } 
                                                }>
                                                Save Changes
                                            </Button>
                                        
                                    </Modal.Footer>
                                </Modal>
                            
                    </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    </div>
 </>
    )
                    }