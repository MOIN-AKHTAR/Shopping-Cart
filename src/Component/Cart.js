import React from "react";
import { connect } from "react-redux";
import {
  Modal,
  Col,
  Row,
  Card,
  Button,
  ButtonGroup,
  Badge
} from "react-bootstrap";
import { Delete_Cart, Update_To_Cart } from "../Redux/Carts/Action";
import { useState } from "react";

function Cart(props) {
  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };

  const showModal = () => {
    setShow(true);
  };

  const DeleteCart = _id => props.Delete_Cart(_id);

  const onIncrement = _id => {
    props.UpdateToCart(_id, 1);
  };

  const onDecrement = _id => {
    const Item = props.Cart.find(Item => Item._id === _id);
    if (Item.quantity > 1) {
      props.UpdateToCart(_id, -1);
    }
  };

  // INITIAL RENDERING
  if (props.Cart.length === 0) {
    return <div></div>;
  } else {
    const ItemAddedToCart = props.Cart.map(Item => (
      <Card key={Item._id} style={{ margin: "0.2rem 0.5rem", padding: "0px" }}>
        <Card.Body>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{Item.title}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {Item.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>
                qty <Badge variant="success">{Item.quantity}</Badge>
              </h6>
            </Col>
            <Col xs={12} sm={4}>
              <ButtonGroup style={{ minWidth: "200px" }}>
                <Button variant="dark" onClick={() => onDecrement(Item._id)}>
                  -
                </Button>
                <Button variant="dark" onClick={() => onIncrement(Item._id)}>
                  +
                </Button>
                <Button variant="danger" onClick={() => DeleteCart(Item._id)}>
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));

    return (
      <Card style={{ width: "100%", marginBottom: "0.5rem" }}>
        {ItemAddedToCart}
        <Row>
          <Col>
            <h6 style={{ margin: "0px 0px 0.5rem 0.5rem" }}>
              Total Amount {props.totalAmount}
            </h6>
            <Button
              variant="success"
              size="small"
              style={{ margin: "0px 0px 0.5rem 0.5rem" }}
              onClick={showModal}
            >
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Thank You!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your Order Has Been Saved</h6>
            <p>You i'll Receive Email Confimation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col sm={6}>
              <h6>total $:{props.totalAmount}</h6>
            </Col>
            <Button variant="secondary" onClick={closeModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    );
  }
}

const mapStateToProps = State => {
  return {
    Cart: State.Carts.Cart,
    totalAmount: State.Carts.totalAmount
  };
};
const mapDispatchToProps = Dispatch => {
  return {
    Delete_Cart: _id => Dispatch(Delete_Cart(_id)),
    UpdateToCart: (_id, unit) => Dispatch(Update_To_Cart(_id, unit))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
