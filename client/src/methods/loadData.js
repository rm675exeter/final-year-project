// Import React
import React from 'react'

// Import axios to communicate with backend
import Axios from 'axios';


const loadData = async (journal_id, page_id) => {

  const response = await Axios.post("http://localhost:5000/loadData", {
    journal_id: journal_id,
    page_id: page_id
  });

  return(response.data);

}

export default loadData;