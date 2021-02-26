import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Col, Row,Alert } from "react-bootstrap";


export default function Login(props) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [register, setRegister] = useState(true); // to show aleart
 
  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };


  const onSubmit = (event) => {
    
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/users/login", credentials)
      .then((res) => {
        console.log("Express backend /login response", res);

        const token = res.data.token;
        const msg = res.data.msg;

        if (token) {
          localStorage.setItem("jwtToken", token);
          props.loginCallback();
          
          history.push("/Home");
          
        } else {
          console.log("Login error: ", msg);
          setRegister(false)
        }
       
      });
  };

  return (
    <>
          {!register && (
        <Alert variant={"danger"}>
          The email address or password is incorrect. Please retry...
        </Alert>
      )}
    <Form className="mt-5" className='container' style={{ color : "black" }}>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control style={{width: '300px '}}
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => onChangeInput(e)}
              />
            </Form.Group>
            </Form.Row>

            <Form.Row>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control style={{width: '300px '}}
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => onChangeInput(e)}
              />
            </Form.Group>
          </Form.Row>

          <p> You don`t have account ?  <a href="/Signup"> Sign Up</a></p>

          <Button variant="outline-secondary" type="submit" onClick={(e) => 
            
             onSubmit(e)}>
            Submit
          </Button>

        </Col>
      </Row>
    </Form>
    </>
  );
}