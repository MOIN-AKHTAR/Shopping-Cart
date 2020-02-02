import React, { Component } from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { connect } from "react-redux";
class CustomNavbar extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
        style={{ margin: "1rem 0px" }}
      >
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contactus">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            {/* <Nav.Link eventKey={1} href="/admin">
              Admin
            </Nav.Link> */}
            <Nav.Link eventKey={2} href="/cart">
              Your Cart{" "}
              <Badge variant="warning">
                {this.props.TotalItems > 0 ? this.props.TotalItems : null}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = State => {
  return {
    TotalItems: State.Carts.total
  };
};
export default connect(mapStateToProps)(CustomNavbar);
