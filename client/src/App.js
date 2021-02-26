import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./register/SignUp";
import Login from "./register/LogIn";
import Home from "./components/Home"
import Landing from "./components/Landing"
import NavBar from "./components/NavBar"
import NewBook from "./profile/AddNewBook"
import MyBooks from "./profile/MyBooks"
// import ToReadBook from "./profile/ToReadBook"
import Showone from "./components/ShowBook"
import AuthRoute from"./profile/AuthRoute"
import Ireadit from"./profile/IreadIt"
import AuthRoutec from "./components/AuthRoute";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import EditBook from"./profile/EditBook"
import API_URL from './apiConfig'
import Footer from "./components/Footer";

function App() {
  const [selectbook, setSelectbook] = useState({});
//const [dataLoading, setDataloading] = useState(false)
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });
  const [userProfile , setUserProfile] = useState({})
  const [userBook , setUserBook] = useState({})
  const [dataLoaded, setDataloaded] = useState(false)

  const [userData , setUserData] = useState({currentDataUser : null})


  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      const currentBook = jwt_decode(jwtToken, "SECRET").book;
      const currentDataUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
      setUserData({ currentDataUser });
      getProfile(currentUser);
     // getBook(currentBook)

    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

   // setDataloading(true)
   setDataloaded(true)
    console.log("The current User is: ", auth.currentUser);
    console.log("The current DATA User  ", userData.currentDataUser);
    
  };
  const getProfile = async (currentUser) => {
    const {data: {user}} =  await axios.get(`${API_URL}/api/users/profile/${currentUser._id}`)
    console.log('Loaded user profile: ', user)
    setUserProfile(user)
  } 
  // const getBook = async (currentBook) => {
  //   const {data: {user}} =  await axios.get(`http://localhost:4000/api/users/userbook/${currentBook._id}`)
  //   console.log('Loaded user profile: ', user)
  //   setUserProfile(user)
  // } 

  useEffect(userLogin, []);

  useEffect(()=>{
    if(userProfile.name){
      setDataloaded(true)
    }
  },[userProfile])


  return (
    <>
     { dataLoaded ?
        <Router>
         

         <NavBar isLoggedIn={auth.isLoggedIn} data={userData.currentDataUser}loginCallback={userLogin} 
         />

          <Route path="/login">
            <Login loginCallback={userLogin} />
          </Route>

          <Route path="/Showbook/:id">
            <Showone 
            setAuth = {setAuth}
            user={userData.currentDataUser}
            selectbook={selectbook} />
          </Route>

          <Route path="/signup">
            <Signup loginCallback={userLogin} />
          </Route>

          <Route exact path="/Home">
            <Home setSelectbook={setSelectbook}/>
          </Route>

          <Route exact path="/EditProfile" >
             <AuthRoutec
              auth={auth}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              />
          </Route>

          <Route exact path="/EditBook/:id" >
             <EditBook
              auth={auth}
              setAuth = {setAuth}
              selectbook={selectbook} 
              setSelectbook={setSelectbook}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              />
          </Route>


          
          <Route exact path="/NewBook">
            <NewBook  data={userData.currentDataUser}/>
          </Route>
          <Route exact path="/Mybooks">
            <MyBooks 
            auth={auth} 
            data={userData.currentDataUser} 
            setAuth = {setAuth}
            setSelectbook={setSelectbook}/>
          </Route>

          <Route exact path="/ireadit">
            <Ireadit auth={auth} user={userData.currentDataUser} setAuth = {setAuth} />
          </Route>

          <Route exact path="/toread">
          <AuthRoute  auth={auth} user={userData.currentDataUser} setAuth = {setAuth} />
            {/* <ToReadBook data={userData.curr entDataUser}/> */}
          </Route>

          <Route exact path="/">
            <Landing />
          </Route>

          <Route  path="/">
             <Route   />
             <Footer/>
          </Route>

        </Router> : <Spinner animation="border" />
      }
    </>
  );
}

export default App;
