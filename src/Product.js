import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./CSS/header.css";
import logo from "./Images/logo.png";
import CurrencySwitcher from "./CurrencySwitcher";

/* Query Defined*/

const GET_CATEGORY = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        brand
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

/* Initializing class component*/

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryName: "All" };

    this.categorize = this.categorize.bind(this);
    this.productID = this.productID.bind(this);
  }

  /* 1. Event Listener to target category when clicked*/

  categorize(event) {
    let categoryValue = event.target.getAttribute("value");
    this.setState({ categoryName: categoryValue });
  }

  /* 2. Main function, takes in products from Query as prop*/

  productID(products) {
    /*If statements that render gallery depending on category name*/

    if (this.state.categoryName === "clothes") {
      /* Filter method, returns list of products under a spcific category = productList */

      let productList = products.filter(
        (product) => product.category === "clothes"
      );
      return (
        <div className="gallery">
          {productList.map((product) => (
            <div className="grid-item" key={product.id}>
              <img
                id={product.category}
                src={product.gallery[0]}
                key={product.id}
                value={product.category}
                alt="Product"
                className="image-grid"
              />
              <div className="product-brand-name">
                {product.name} {product.brand}
              </div>
              <div id="price-tag" className="price-tag">
                {product.prices[0].currency.symbol}
                {product.prices[0].amount}{" "}
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (this.state.categoryName === "tech") {
      let productList = products.filter(
        (product) => product.category === "tech"
      );
      return (
        <div className="gallery">
          {productList.map((product) => (
            <div className="grid-item" key={product.id}>
              <img
                id={product.category}
                src={product.gallery[0]}
                key={product.id}
                value={product.category}
                alt="Product"
                className="image-grid"
              />
              <div className="product-brand-name">
                {product.name} {product.brand}
              </div>
              <div id="price-tag" className="price-tag">
                {product.prices[0].currency.symbol}
                {product.prices[0].amount}{" "}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="gallery">
        {products.map((product) => (
          <div className="grid-item" key={product.id}>
            <img
              id={product.category}
              src={product.gallery[0]}
              key={product.id}
              value={product.category}
              alt="Product"
              className="image-grid"
            />
            <div className="product-brand-name">
              {product.name} {product.brand}
            </div>
            <div id="price-tag" className="price-tag">
              {product.prices[0].currency.symbol}
              {product.prices[0].amount}{" "}
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      /* Main Query */
      <Query query={GET_CATEGORY}>
        {({ loading, error, data }) => {
          if (loading) return <p>'Loading...'</p>;
          if (error) return <p>'Error!'</p>;
          return (
            /* Main Header on the page */
            <div id="Header" className="header">
              <div className="primaryheader">
                {data.categories.map((category) => {
                  return (
                    <div
                      id="categoryName"
                      key={category.name}
                      value={category.name}
                      onClick={this.categorize}
                    >
                      {category.name}
                    </div>
                  );
                })}
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>

                {/* Currenct Switcher component*/}
                <CurrencySwitcher />
              </div>
              <div
                id="categoryHeader"
                className="categoryName"
                value={this.state.categoryName}
              >
                {this.state.categoryName}
              </div>
              {/* Calling main class function in Query*/}
              {this.productID(data.categories[0].products)}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Product;
