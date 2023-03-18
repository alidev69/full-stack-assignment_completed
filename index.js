"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const retrieve = require("./api/managed-records");


// Example usage
retrieve({ page: 1, colors: ["red", "brown"] })
  .then(data => {
    // Do something with the transformed data
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });

  module.exports = retrieve;