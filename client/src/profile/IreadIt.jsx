import React from 'react'
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
// import OneCardBook from "./components/OneCardBook";
import OneCardIreadit from "../components/OneCardIreadit"
import axios from 'axios'
import MyBooks from "./MyBooks";
import { Nav } from "react-bootstrap";
import API_URL from '../apiConfig.js'
import {Link} from 'react-router-dom'


export default function IreadIt(props) {
  const { name, email, favoriteBooks1, _id } = props.auth.currentUser;
  const [favoriteBooks, setFavoriteBooks] = useState([]) // Contains all fave books form user

  const getbook = async () => {
    let getUser = await axios.get(`${API_URL}/api/users/profile/${props.auth.currentUser._id}`)
    console.log('get profile', getUser)
    axios.get('http://localhost:4000/api/books/')
      .then(res => {
        console.log(">>>>>>> props.user.favoriteBooks: ", getUser.data.user.ireadit)
        const favoriteBooksBooks = res.data.filter(book => getUser.data.user.ireadit.includes(book._id));
        setFavoriteBooks(favoriteBooksBooks)
      })
  }
  useEffect(
    getbook

    , [])

  const deleteBook = (bookId) => {
    let userId = _id
    axios.delete(`${API_URL}/api/books/ireadit/${bookId}/${userId}`)
      .then(data => {
        const userData = localStorage.getItem("userData");
        // 1. update (userData), add fav, delete or whatever then 2. do the setItem
        const user = JSON.parse(userData);
        localStorage[_id] = JSON.stringify(data.data.ireadit)
        console.log(localStorage[_id])
        console.log('deleted book', data.data.ireadit)
        setFavoriteBooks(favoriteBooks.filter(book=>{
          return book._id != bookId
        }))
      })
  }
  

  let Myfavbooks = favoriteBooks.map((favBook, i) => {
    return (
      <OneCardIreadit 
        favBook={favBook} 
        deleteBook={deleteBook}  
        delete={true}
       />
    )
  });

  if(Myfavbooks.length == 0) return(
    <>
     <h1 style={{
       textAlign : "center" ,
       justifyContent : "center",
       marginTop : "300px"
     }}> You Didn't Read Any Book Yet 
     <br></br>
      <Link to={`/toread`}> 
     Go To Your Books
     </Link> </h1>
     
    </>
     )

  else{
  return (

    <>
          <h1 style={{
            textAlign : "center" ,
            justifyContent : "center",
            marginTop : "100px"
          }}>Books You Already Read it  </h1>
          <div className='padding'>

                <Row className="justify-content-md-center">  
                
                   {Myfavbooks}
                </Row>
          </div>
    </>
  )
  }
}
