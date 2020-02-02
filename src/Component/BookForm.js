import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { Add_Book } from "../Redux/Books/Action";
import {
  Col,
  Form,
  Button,
  Jumbotron,
  FormControl,
  FormGroup,
  FormLabel
} from "react-bootstrap";
// import uuid from "uuid";

class BookForm extends Component {
  Submit(e) {
    e.preventDefault();
    const Obj = {
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
      quantity: 1
    };
    this.props.Post_Book(Obj);
    e.target.reset();
  }
  render() {
    return (
      <Jumbotron style={{ padding: "20px 10px" }}>
        <h3 style={{ textAlign: "center", color: "blue" }}>Add A Book</h3>
        <Form onSubmit={this.Submit.bind(this)}>
          <FormGroup as={Col} controlId="title">
            <FormLabel>Title</FormLabel>
            <FormControl
              type="text"
              placeholder="Book Title"
              ref="title"
              required
            />
          </FormGroup>
          <FormGroup as={Col} controlId="description">
            <FormLabel>Description</FormLabel>
            <FormControl
              type="text"
              placeholder="Book description"
              ref="description"
              required
            />
          </FormGroup>
          <FormGroup as={Col} controlId="price">
            <FormLabel>Price</FormLabel>
            <FormControl
              type="number"
              placeholder="Book Price"
              ref="price"
              required
            />
          </FormGroup>
          <Button variant="primary" type="submit">
            Save Book
          </Button>
        </Form>
      </Jumbotron>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Post_Book: Book => dispatch(Add_Book(Book))
  };
};
export default connect(null, mapDispatchToProps)(BookForm);
