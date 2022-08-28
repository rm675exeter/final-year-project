// Import React
import React from 'react'

// Import axios to communicate with backend
import Axios from 'axios';

const saveCanvas = (elements, page_id) => {

  const stringified = JSON.stringify(elements);

  Axios.post('http://localhost:5000/saveCanvas', {
    stringified: stringified,
    page_id: page_id
  }).then(response => {
    if(response.data.message) {
      console.log(response.data.message);
    }
  })

}

export default saveCanvas;