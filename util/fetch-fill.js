"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const  FetchConstructor = require('fetch-ponyfill');
const fetchFill = FetchConstructor({ Promise: Promise });
module.exports = fetchFill