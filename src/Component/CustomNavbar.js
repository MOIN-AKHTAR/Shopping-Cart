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
        <Navbar.Brand href="#home">Shopping Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
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
