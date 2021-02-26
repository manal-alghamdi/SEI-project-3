import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import OneCardBook from "../components/OneCardBook"
import API_URL from '../apiConfig.js'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export default function MyBooks(props) {
    const [mybooks, setmybooks] = useState([])
    const { name, email, favoriteBooks1, _id } = props.auth.currentUser;

    const deleteBook = (bookId) => {
        console.log("myyyyyyyyyy")
        console.log(" id boooooooooook",bookId)
        Axios.delete(`http://localhost:4000/api/books/${bookId}`)
          .then(data => {
  
            // setChangeuseEffect(!changeuseEffect)
            setmybooks(mybooks.filter(book=>{
              return book._id != bookId
            }))
          })
      }
    

    useEffect(() => {
        Axios.get(`${API_URL}/api/books/`)
            .then(res => {
               // console.log(props.data._id)
               console.log(res.data)
                setmybooks(res.data)
               
            })

    }, [])

    // Books[0].bname

    let allmybooks = mybooks.map((books, i) => {
        if(books.user == props.data._id )
            return (
                <OneCardBook 
                bimg={books.bimg} 
                bname={books.bname} 
                id={books._id} 
                deleteBook={deleteBook}
                books={books} 
                setSelectbook={props.setSelectbook}
                />
                
            )
    });
console.log("ggggg  ",allmybooks.length)
   
        return (
        
        <>
            <div  className='padding'>
                
                <Row className="justify-content-md-center">
                
                {allmybooks}
                </Row>
            </div>

        </>
        )
        
}
