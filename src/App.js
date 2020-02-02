import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { Add_Book, Remove_Book, Get_Books } from "./Redux/Books/Action";
import { Delete_Cart } from "./Redux/Carts/Action";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import Book from "./Component/Book";
import BookForm from "./Component/BookForm";
import Cart from "./Component/Cart";
import CustomNavbar from "./Component/CustomNavbar";
class App extends Component {
  state = {
    Data: 0
  };
  componentDidMount() {
    this.props.GetBooks();
  }

  DeleteBook() {
    const Id = findDOMNode(this.refs.Delete).value;
    this.props.DeleteBook(Id);
    this.props.DeleteCart(Id);
    window.location.reload(true);
  }
  render() {
    const bookList = this.props.Book.map(Item => {
      return <Book Item={Item} key={Item._id} />;
    });

    const OptionsList = this.props.Book.map(Item => (
      <option key={Item._id}>{Item._id}</option>
    ));

    return (
      <Container style={{ marginTop: "1rem" }}>
        <CustomNavbar />
        <Row>
          <Cart />
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <BookForm />
          </Col>
          <Col xs={12} md={6} style={{ marginBottom: "1rem" }}>
            <Form.Group controlId="Delete">
              <Form.Label>Select Any Book Id</Form.Label>
              <Form.Control as="select" ref="Delete" placeholder="Select">
                {OptionsList}
              </Form.Control>
            </Form.Group>
            <Button variant="danger" onClick={this.DeleteBook.bind(this)}>
              Delete Book
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>{bookList}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = State => {
  return {
    Book: State.Books,
    Cart: State.Carts.Cart
  };
};

const mapDispatchToProps = Dispatch => {
  return {
    AddBook: Book => Dispatch(Add_Book(Book)),
    GetBooks: _ => Dispatch(Get_Books()),
    DeleteBook: Id => Dispatch(Remove_Book(Id)),
    DeleteCart: Id => Dispatch(Delete_Cart(Id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
