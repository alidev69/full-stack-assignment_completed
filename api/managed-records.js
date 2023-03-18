"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const fetchFill = require("../util/fetch-fill")

//records endpoint
const url = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

async function retrieve(options = {}) {

  const { page = 1, colors } = options;

  const pageSize = 10;

  const offset = (page - 1) * pageSize;

  const queryParams = new URLSearchParams({ limit: pageSize });

  if (offset) queryParams.set('offset', offset);

  if (colors) {
    colors.forEach(color => {
      queryParams.append('color[]', color);
    });
  }

  try {

    const response = await fetchFill.fetch(url + '?' + queryParams.toString());

    if (!response.ok) {
      throw new Error(`Failed to retrieve records (${response.status})`);
    }

    const data = await response.json();
    const ids = data.map(item => item.id);

    const open = data.filter(item => item.disposition === 'open')
      .map(item => ({ ...item, isPrimary: ['red', 'blue', 'yellow'].includes(item.color) }));
      
    const closedPrimaryCount = data.filter(item => item.disposition === 'closed' && ['red', 'blue', 'yellow'].includes(item.color)).length;
    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = data.length === pageSize ? page + 1 : null;

    return {
      ids,
      open,
      closedPrimaryCount,
      previousPage,
      nextPage
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = retrieve;
