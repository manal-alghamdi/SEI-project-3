import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
// import OneCardBook from "./components/OneCardBook";
import OneCardFavBooks from "../components/OneCardFavBooks"
import axios from 'axios'
import MyBooks from "./MyBooks";
import { Nav } from "react-bootstrap";
import API_URL from "../apiConfig.js"
import {Link} from 'react-router-dom'

export default function ToReadBook(props) {
  const { name, email, favoriteBooks1, _id } = props.auth.currentUser;
  const [favoriteBooks, setFavoriteBooks] = useState([]) // Contains all fave books form user
  // const [changeuseEffect, setChangeuseEffect] = useState(false)
  const getbook = async () => {
    let getUser = await axios.get(`${API_URL}/api/users/profile/${props.auth.currentUser._id}`)
    console.log('get profile', getUser)
    axios.get(`${API_URL}/api/books/`)
      .then(res => {
        console.log(">>>>>>> props.user.favoriteBooks: ", getUser.data.user.favoriteBooks)
        const favoriteBooksBooks = res.data.filter(book => getUser.data.user.favoriteBooks.includes(book._id));
        setFavoriteBooks(favoriteBooksBooks)
      })
  }
  useEffect(
    getbook

    , [])

  const deleteBook = (bookId) => {
    console.log("myyyyyyyyyy")
    let userId = _id
    axios.delete(`${API_URL}/api/books/${bookId}/${userId}`)
      .then(data => {
        const userData = localStorage.getItem("userData");
        // 1. update (userData), add fav, delete or whatever then 2. do the setItem
        // localStorage.setItem("userData", userData)
        const user = JSON.parse(userData);
        localStorage[_id] = JSON.stringify(data.data.favoriteBooks)
        console.log(localStorage[_id])
        console.log('deleted book', data.data.favoriteBooks)
        // setChangeuseEffect(!changeuseEffect)
        setFavoriteBooks(favoriteBooks.filter(book=>{
          return book._id != bookId
        }))
      })
  }

  const addBookIreadit = (a) => {



    console.log("bookId = ", a)
    console.log("userId = ", props.user._id)
    axios.post(`${API_URL}/api/books/ireadit`, { bookId: a, userId: props.user._id })
      .then(data => {

        props.setAuth(pre => ({ ...pre, currentUser: { ...pre.currentUser, ireadit: data.data.ireadit } }))
        console.log(data)
      })
     
  }

  let Myfavbooks = favoriteBooks.map((favBook, i) => {
    return (
      <OneCardFavBooks favBook={favBook} deleteBook={deleteBook} addBookIreadit={addBookIreadit} delete={true} />
    )
  });
  if(Myfavbooks.length == 0) return(
    <>
     <h1 style={{
       textAlign : "center" ,
       justifyContent : "center",
       marginTop : "300px"
     }}> You Add Any Book Yet 
     <br></br>
      <Link to={`/Home`}> 
     Go To All Books
     </Link> </h1>
     
    </>
     )

  else{
  return (

    <>
          <h1 style={{
            textAlign : "center" ,
            justifyContent : "center",
            marginTop : "100px",
            marginBottom:"-80px"
          }}>Books You Want Read   </h1>
          <div className='padding'>

                <Row className="justify-content-md-center">  
                
                   {Myfavbooks}
                </Row>
          </div>
    </>
  )
  }
}
