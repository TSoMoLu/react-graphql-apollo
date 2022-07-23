import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./CSS/header.css";
import expandlist from "./Images/expandlist.png";
import closelist from "./Images/closelist.png";
import Cart from "./Cart";

/*Query Defined*/
const CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

/* Initializing class component*/

class CurrencyList extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
    this.state = { selectedCurrency: "$" };

    this.toggling = this.toggling.bind(this);
    this.onOptionSelected = this.onOptionSelected.bind(this);
    this.dropDown = this.dropDown.bind(this);
  }

  /* Toglling function to open currency list*/

  toggling() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  /* Places the selected currency at the header*/

  onOptionSelected(event) {
    this.setState({ selectedCurrency: event.target.getAttribute("value") });
    this.setState({ isOpen: false });
  }

  /* Main function that incorporates toggling and optionSelected*/

  dropDown(currencies) {
    return (
      <div className="Outside">
        <div className="DropDownContainer">
          <div className="DropDownHeader">
            {this.state.selectedCurrency} {"   "}{" "}
            {/* Arrow attached to currency drop down list*/}
            <img
              className="expandArrow"
              /* operation for arrow image to change according to whether list is open or not*/
              src={this.state.isOpen ? closelist : expandlist}
              alt="listArrows"
              /* List opens on click using toggling function*/
              onClick={this.toggling}
            />
            <span className="emptycart">
              {/* Cart component*/}
              <Cart />
            </span>
          </div>
          {/* Displays a currency list obtained from data*/}
          {this.state.isOpen && (
            <div className="DropDownListContainer">
              <ul className="DropDownList">
                {currencies.map((currency) => (
                  <li
                    onClick={this.onOptionSelected}
                    key={currency.value}
                    value={currency.symbol}
                  >
                    {currency.symbol} {currency.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
                }

  render() {
    /* Main Query using currency data*/
    return (
      <Query query={CURRENCIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>'Loading...'</p>;
          if (error) return <p>'Error!'</p>;
          return this.dropDown(data.currencies);
        }}
      </Query>
    );
  }
}

export default CurrencyList;
