import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Button, Col, Container, Row ,Alert} from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import {useParams} from 'react-router-dom';
import API_URL from '../apiConfig.js'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function calcAvrg(array){
   if(!array) return 0 
    const sum = array.reduce((sum , num)=>{
     return sum + num  
    },0)
    if(array.length == 0 ) return 0 
    else return (sum/array.length)
    
}

export default function ShowBook(props) {
    const {id} = useParams()
    const selectBook = props.selectbook;
    const [added, setadded] = useState(true);
 
    const addBookToIwantReadit = () =>{
        console.log("bookId = " , selectBook._id)
    console.log("userId = " ,props.user._id )
    axios.post('http://localhost:4000/api/books/toread' , {bookId :selectBook._id ,  userId :props.user._id  })
    .then(data =>{
        props.setAuth(pre =>({...pre , currentUser : {...pre.currentUser , favoriteBooks : data.data.favoriteBooks }}))
        console.log(data)
    })
}
const add = () =>{
    setadded(false);
    setTimeout(() => {
        setadded(true);
    }, 3000);
}
 
    return (
        <>
        {!added && (
        <Alert variant={"success"}>
          add to I want to read it
        </Alert>
      )}
        <div className='borderShow'>
            <Container className="mt-5" className='magenShow' >
                <Row >
                    <Col md="6" >
                        <img className='imgShow'  src={selectBook.bimg} alt="" srcset="" />
                    </Col>
                    <Col md="6" className='infoSowh'>
                    <div class='info'>
                   
                        <p style={{fontSize:"20px" }}>
                            <span style={{fontWeight: "bold"
                            }}>
                            {selectBook.bname} 
                            </span>
                        
                        </p>

                        <p style={{fontSize:"18px" }}>
                         <span style={{fontWeight: "bold",
                        
                        }}>
                            Book Rating : 
                        </span>
                        <Box 
                           component="fieldset" 
                           mb={3} 
                           borderColor="transparent">
                        
                           <Rating 
                               name="read-only" 
                               value={calcAvrg(selectBook.brate)}
                               precision={0.5}
                               readOnly />
                        </Box>
                        {/* <span style={{fontSize:"18px",
                        color: "yellowgreen" }}>{calcAvrg(selectBook.brate)}</span>/5 */}
                        </p>

                        <p style={{fontSize:"18px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Author : 
                        </span>
                        {selectBook.bAuthor}
                        </p>

                        <p style={{fontSize:"16px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Discription : 
                        </span>
                        {selectBook.bdescription}
                        </p>

                        <p style={{fontSize:"18px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                           Category : 
                        </span>
                        {selectBook.bcategory}
                        </p>

                        <p style={{fontSize:"18px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                           Realeas Date :
                        </span>
                        {selectBook.bReleasDate}
                        </p>
                        </div>
                        {props.user && (props.user.utype == "0") ?
                        <>
                            <Button onClick ={()=> 
                            { addBookToIwantReadit();
                                add();}
                                } variant="outline-secondary" > I want to read it </Button>
                        </>:<></>}
                    </Col>
                </Row>
            </Container>
      </div>
      </>
    )
}