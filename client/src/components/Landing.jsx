import React from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
export default function Landing() {
    return (
<>
<Carousel style={{
  backgroundColor: "gray"
  }}>
  <Carousel.Item interval={1500} style={{height:"50px"}}>
    <img
      className="d-block w-100"
      src="https://www.wallpapertip.com/wmimgs/0-3795_wallpaper-books-library-shelves-lighting-hd-book-library.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3 >BooksStream</h3>
      <p >Show your wonderful book for others to read</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item interval={1500} style={{height:"650px"}}>
    <img
      className="d-block w-100"
      src="https://wallpaperaccess.com/full/124383.jpg"
      alt="Third slide"
    />
    <Carousel.Caption >
      <h3 >BooksStream</h3>
      <p>Find and read more books you'll love</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item interval={1500} style={{height:"650px"}}>
    <img
      className="d-block w-100"
      src="https://www.wallpapertip.com/wmimgs/55-556339_old-library-bookshelf-design.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>BooksStream</h3>
      <p> This website for readers and book recommendations. </p>
    </Carousel.Caption>
  </Carousel.Item>
  
</Carousel>
</>
    )
}