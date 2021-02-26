import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Button, Nav, Navbar, NavDropdown, Form, FormControl } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";


export default function NaveBar(props) {
  return (

    <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <h4>BookStream</h4>
        </Navbar.Brand>

        <Nav.Link href="#home" as={Link} to="/Home" style={{color:"gray"}}>
          Home
        </Nav.Link>

        {!props.isLoggedIn ?
              <>
                 <Nav.Link as={Link} to="/login">LogIn</Nav.Link > 
              </>
              :
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    {props.data && (props.data.utype == "0") ?
                      <>
                          <Nav>

                            <NavDropdown title="MENU" id="basic-nav-dropdown1">
                                <NavDropdown.Item as={Link} to="/toread">Books You Want Read</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/ireadit">Books You Read It</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/editprofile">Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/home" onClick={() => {
                                  console.log("Logging Out!");
                                  localStorage.removeItem("jwtToken");
                                  props.loginCallback();
                                }}>Logout</NavDropdown.Item>

                            </NavDropdown>
                          </Nav>
                      </> :
                      <>
                          <Nav>

                            <NavDropdown title="MENU" id="basic-nav-dropdown2">
                                <NavDropdown.Item as={Link} to="/newbook">Add New Book</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/mybooks">My Books</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/EditProfile">Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/home" onClick={() => {
                                  console.log("Logging Out!");
                                  localStorage.removeItem("jwtToken");
                                  props.loginCallback();
                                }}>Logout</NavDropdown.Item>

                            </NavDropdown>
                          
                          </Nav>
                      </>}
                      </Navbar.Collapse>
              </>
        }
      
    </Navbar>
  );
}