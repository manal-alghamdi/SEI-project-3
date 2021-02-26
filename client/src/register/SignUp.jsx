import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";


export default function Singup(props) {
  const history = useHistory();
  const [user, setUser] = useState({}); // user info
  const [register, setRegister] = useState(true); // to show aleart
  const [name, setname] = useState(true); // to show aleart
  const [email1, setemail1] = useState(true); // to show aleart
  const [email2, setemail2] = useState(true); // to show aleart
  const [password, setpassword] = useState(true); // to show aleart
  const [utype, setutype] = useState(true); // to show aleart
  const [password1, setpassword1] = useState(true); // to show aleart
  //to add the input inside user
  const onChangeInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    if (name == "email") {
      if (!value.includes("@")) {
        setemail2(false)
      } else {
        setemail2(true)
      }
    }
    if (name == "password") {
      if (value.length <= 5) {
        setpassword(false)
      } else {
        setpassword(true)
      }
    }
  };
  // to add the user info to database
  const onSubmit = (event) => {
    if (password == true && email2 == true) {
      event.preventDefault();
      axios
        .post("http://localhost:4000/api/users/register", user)
        .then((res) => {
          const user = res.data.user;
          if (user) {
            history.push("/login");
          }
          else {
            setTimeout(() => {
              setRegister(false);
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    }
    if (!user.name) {
      setname(false)
    } else {
      setname(true)
    }
    if (!user.email) {
      setemail1(false)
    }
    else {
      setemail1(true)
    }
    if (!user.utype) {
      setutype(false)
    }
    else {
      setutype(true)
    }
    if (!user.password) {
      setpassword1(false)
    }
    else {
      setpassword1(true)
    }
  };
  return (
    <>
      {!register && (
        <Alert variant={"danger"}>
          The email is already in use. Please change the email
        </Alert>
      )}
     
      {!utype && (
        <Alert variant={"danger"}>
          Please Fill All the Field 
        </Alert>
      )}
      <Form  className="mt-5" className='container' style={{ color : "black" }}>
        <Row className="justify-content-center mt-5 ">
          <Col md={8}>
            <Form.Row>
              <Col md={12}>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  placeholder="Full name"
                  name="name"
                  onChange={(e) => onChangeInput(e)}
                  required />
              </Col>
            </Form.Row>
            <Form.Row >
              <Col md={12}>
                <Form.Group controlId="formGridEmail">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => onChangeInput(e)}
                    required />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={12}>
                <Form.Group controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    minlength="5"
                    onChange={(e) => onChangeInput(e)}
                    required />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Check inline label="Reader" type="radio" name="utype" id="Reader" value="0" onChange={(e) => onChangeInput(e)} />
            <Form.Check inline label="Auther" type="radio" name="utype" id="Auther" value="1" onChange={(e) => onChangeInput(e)} />
            <br />

            <p>You alredy have an account ?  <a href="/login"> log in</a></p>

            <Button
              variant="outline-secondary"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}