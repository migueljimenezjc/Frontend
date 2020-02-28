import { authHeader, handleResponse } from '../_helpers';
import axios from "axios";

export const receiptService = {
    getAllReceipts,
    insertReceipt,
    updateReceipt,
    deleteReceipt
};

function getAllReceipts() {
    
}

async function insertReceipt(queryString) {
    
    const resp = await  fetch('/api/Receipts?'+queryString, {
      method: 'POST'
      })
      .catch(error => console.error('Unable to add item.', error));

      return resp;
}

function updateReceipt(id, provider, amount, currency, date, commentary) {
    var obj = {
        id: 0,
        provider : provider, 
        amount : amount,
        currency : currency,
        date : date,
        commentary : commentary
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ obj })
    };

    return axios
    .put(`/api/Receipts/${ id }`, requestOptions)
    .then(result => {
      console.log(result);
      const registers = result.data;
      this.setState({ registers });
    })
    .catch(e => {
        console.log(e);
    });
}

function deleteReceipt(id) {
    return axios
    .delete(`/api/Receipts/${ id }`)
    .then(result => {
      console.log(result);
      const registers = result.data;
      this.setState({ registers });
    })
    .catch(e => {
        console.log(e);
    });
}