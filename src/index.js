import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import PLP from "./PLP";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <PLP />
  </ApolloProvider>,
  document.getElementById("root")
);
