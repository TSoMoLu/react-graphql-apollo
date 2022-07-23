import React, { Component } from "react";
import "./CSS/header.css";
import emptyCart from "./Images/emptyCart.png";

class Cart extends Component {
  render() {
    return (
      <div>
        <img className="emptyCart" src={emptyCart} alt="Empty Cart" />
      </div>
    );
  }
}

export default Cart;
