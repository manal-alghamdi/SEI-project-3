import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert , Image, Spinner } from "react-bootstrap";
import {Link} from 'react-router-dom'
import axios from "axios";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API_URL from '../apiConfig.js'

const validtionSchima = Yup.object({
    name: Yup.string()
             .required('Name is required'),
    email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    password: Yup.string(),
    confirmPassword: Yup.string().test('passwords-match', 'Passwords must match ', function(value) {
        return this.parent.password === value;
      }),
    img: Yup.string().required("This Field is Required")
    
  })
export default function EditProfile(props) {
    const history = useHistory();   
    const [userInfo, setUserInfo] = useState({})

    const user = {
            name: props.userProfile.name,
            email:props.userProfile.email,
            password: '',
            confirmPassword: "",
            img: props.userProfile.img
        }
        
    console.log('User const ==>', user)
    // to add the user info to database
    const onSubmit = (values) => {
        let userId = props.userProfile._id
        axios
            .post(`${API_URL}/api/users/EditProfile/${userId}`, values)
            .then((res) => {
                  console.log("res.data.user from profile update: ", res.data.user)
                  props.setUserProfile(values)
                  let userdetails = {
                      name: values.name,
                      email: values.email
                  }
                  
                  setUserInfo(userdetails)
                })
                .catch((err) => console.log(err));
    };
  

   
    return (
        <>
         
          {props.userProfile.name ? 
          
            <Formik
                initialValues={user} // Takes precedence on all other values
                validationSchema={validtionSchima}
                onSubmit={(values) => onSubmit(values)}
               
            >
                 
                <FormikForm className="mt-5" style={{ color : "black" }}
                >
               
                    <Row className="justify-content-center mt-5">
                   
                        <Form.Row>
                        
                            <Col md={4}  >
                            
                                <Image className='proImg'
                                    width={171}
                                    height={180}
                                    name="img"
                                    src={props.userProfile.img }
                                    roundedCircle />
                                     <Form.Label>
                                     <h2>{userInfo.name ? userInfo.name : props.userProfile.name}</h2>
                                     </Form.Label>
                                     <Form.Label>
                                         {userInfo.name ? userInfo.email : props.userProfile.email}
                                    </Form.Label>

                            </Col>
                            <Col md={6} className='proInfo'>
                               
                                <Form.Group as={Col} controlId="formGridEmail" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control style={{ width: '300px ' }}
                                        as={Field}
                                        type="Text"
                                        name="name" // this name will be given to you in the "values" variable in onSubmit(values)                                    
                                    />
                                    <ErrorMessage name="name" render={(msg) => <Alert variant={"danger"}>
                                        {msg}
                                    </Alert>} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control style={{ width: '300px ' }}
                                        as={Field}
                                        type="Text"
                                        name="email"
                                    />
                                    <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
                                        {msg}
                                    </Alert>} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Password </Form.Label>
                                    <Form.Control style={{ width: '300px ' }}
                                        as={Field}
                                        type="Password"
                                        name="password"
                                    />
                                    <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                                        {msg}
                                    </Alert>} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Confirm Password </Form.Label>
                                    <Form.Control style={{ width: '300px ' }}
                                        as={Field}
                                        type="Password"
                                        name="confirmPassword"
                                    />
                                    <ErrorMessage name="confirmPassword" render={(msg) => <Alert variant={"danger"}>
                                        {msg}
                                    </Alert>} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control style={{ width: '300px ' }}
                                        as={Field}
                                        name="img"
                                    />
                                    <ErrorMessage name="img" render={(msg) => <Alert variant={"danger"}>
                                        {msg}
                                    </Alert>} />
                                </Form.Group>
                                <Button style={{margin: '20px 0px 20px 140px'}}
                            variant="outline-secondary"
                            // size="lg" block 
                            type="submit"
                        >Save
                     </Button>
                            </Col>
                        </Form.Row>
                        
                    </Row>
                </FormikForm>
         </Formik> : <Spinner animation="border" />}
        </>
    );
}