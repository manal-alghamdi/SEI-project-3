import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function AddNewBook(props) {
    const history = useHistory();
    const [book, setBook] = useState({}); // book info
    const [bdescription, setBdescription] = useState(true); 


    const onChangeInput = ({ target: { user,name, value } }) => {
        setBook({ ...book, [name]: value });  
        console.log(props.data._id)
        if (name == "bdescription") {
            if (value.length >= 225) {
               setBdescription(false)
           } else {
               setBdescription(true)
            }
         }
        
    };
    // to add the user info to database
    const onSubmit = (event,user) => {
        if(bdescription==true){
            book.user = props.data._id;
            console.log(book)
            event.preventDefault();
            axios
                .post("http://localhost:4000/api/books/new", book)
                .then((res) => {
                        history.push("/Home");
                })
                .catch((err) => console.log(err));


        }
    };

    return (
        <>
            {!bdescription && (
                    <Alert variant={"danger"}>
                    sorry, you can typee with 225 laters only
                    </Alert>
                )}
            <Form className="mt-5 container">
                <Row className="justify-content-center mt-5">
                    <Col md={12}>
                        <Form.Row>
                            <Col md={12}>
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control
                                    placeholder="Book name"
                                    name="bname"
                                    onChange={(e) => onChangeInput(e)}
                                />
                            </Col>
                            <Col md={12}>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        name="bdescription"
                                        onChange={(e) => onChangeInput(e)}
                                        as="textarea" rows={3} />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Type of the Book</Form.Label>
                                    <Form.Control onChange={(e) => onChangeInput(e)} as="select" name="bcategory" custom>
                                        
                                    <option>History</option>
                                        <option>Memoir</option>
                                        <option>Cookbook</option>
                                        <option>Crime</option>
                                        <option>Art/architecture</option>
                                        <option>Science</option>
                                        <option>Sports and leisure</option>
                                        <option>Horror</option>
                                        <option>other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="Release Date"
                                    name="bReleasDate"
                                    onChange={(e) => onChangeInput(e)}
                                />
                            </Form.Group>


                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    placeholder="Image"
                                    name="bimg"
                                    onChange={(e) => onChangeInput(e)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Author Name</Form.Label>
                                <Form.Control

                                    placeholder="Author Name"
                                    name="bAuthor"
                                    onChange={(e) => onChangeInput(e)}
                                />
                            </Form.Group>
                        </Form.Row>

                    <Button 
                        variant="outline-secondary" 
                        size="lg" 
                        block 
                        onClick={(e) => onSubmit(e)}>
                        Save
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}