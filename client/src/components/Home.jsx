import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Navbar, Control,FormControl, InputGroup, Button } from 'react-bootstrap'
import OneCardBookHome from "./OneCardBookHome"
import API_URL from '../apiConfig.js'
import Axios from 'axios'
import { Nav } from 'react-bootstrap'

export default function Home(props) {
    const [selectbook, setSelectbook] = useState([])
    const [filter, setFilter] = useState('All');
    const [serch, setserch] = useState("");

    useEffect(() => {
        Axios.get(`${API_URL}/api/books/`)
            .then(res => {
                // console.log(props.data._id)
                console.log(res.data)
                setSelectbook(res.data)

            })

    }, [])
    const onChangeHandler = (e) => {
        setFilter(e.target.innerHTML);
    }
    const onchanges =(e)=>{
        setserch(e.target.value)
    }

    let allmybooks;

    if (filter === 'All' && serch == "") {
        allmybooks = selectbook.map((book, i) => {
            return <OneCardBookHome book={book} setSelectbook={props.setSelectbook} />
        });
    }
    else {
        allmybooks = selectbook.map((book, i) => {
            if (book.bcategory === filter || serch == book.bname)
                return <OneCardBookHome book={book} setSelectbook={props.setSelectbook} />
        });
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    {/* <Nav.Control onClick={onChangeHandler} >   */}

                    <Nav className="mr-auto" >
                   
                        <Nav.Link onClick={onChangeHandler} >All</Nav.Link>
                        <Nav.Link onClick={onChangeHandler}>History</Nav.Link>
                        <Nav.Link onClick={onChangeHandler} >Memoir</Nav.Link>
                        <Nav.Link onClick={onChangeHandler} >Cookbook</Nav.Link>

                        <Nav.Link onClick={onChangeHandler} >Crime</Nav.Link>
                        <Nav.Link onClick={onChangeHandler}>Art/architecture</Nav.Link>

                        <Nav.Link onClick={onChangeHandler}>Science</Nav.Link>
                        <Nav.Link onClick={onChangeHandler} >Sports and leisure</Nav.Link>

                        <Nav.Link onClick={onChangeHandler}>Horror</Nav.Link>
                        <Nav.Link onClick={onChangeHandler}>other</Nav.Link>
                    </Nav>
                    {/* </Nav.Control>   */}

                </Navbar.Collapse>
                <Form inline className='search'>
                <FormControl onChange={onchanges} type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-secondary"
                >Search</Button>
              </Form>
            </Navbar>
            
            <div className='padding'>
                <Row className="justify-content-md-center">
                    {allmybooks}
                </Row>

            </div>
            {/* <Row>
                <Footer />
            </Row> */}
        </div>
    )
}