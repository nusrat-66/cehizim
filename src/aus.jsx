import React, { useReducer } from 'react';

export default function reducer(state, action) {
    switch (action.type) {
      case 'close':
        return {modal: state = "bucket-disabled"};
      case 'open':
        return {modal: state = "bucket"};
      default:
        return {modal: state = "bucket-disabled"};
    }
  }