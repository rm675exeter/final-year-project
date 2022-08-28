import React, { useState, useEffect, useLayoutEffect } from 'react'

import Header from './../components/Header.js';

// Import images
import cover1_square from '.././assets/journal_covers/cover1_square.png';
import cover2_square from '.././assets/journal_covers/cover2_square.png';
import cover3_square from '.././assets/journal_covers/cover3_square.png';
import cover4_square from '.././assets/journal_covers/cover4_square.png';
import cover5_square from '.././assets/journal_covers/cover5_square.png';
import cover6_square from '.././assets/journal_covers/cover6_square.png';
import cover7_square from '.././assets/journal_covers/cover7_square.png';
import cover8_square from '.././assets/journal_covers/cover8_square.png';
import cover9_square from '.././assets/journal_covers/cover9_square.png';
import cover10_square from '.././assets/journal_covers/cover10_square.png';
import cover11_square from '.././assets/journal_covers/cover11_square.png';
import cover12_square from '.././assets/journal_covers/cover12_square.png';
import cover13_square from '.././assets/journal_covers/cover13_square.png';
import cover14_square from '.././assets/journal_covers/cover14_square.png';
import cover15_square from '.././assets/journal_covers/cover15_square.png';
import cover16_square from '.././assets/journal_covers/cover16_square.png';


import {
  CreateJournalContainer,
  JournalCoversContainer, Grid, JournalCoverSpace,
  HiddenContainer, ErrorContainer,
  WhiteBackgroundContainer, GreyBackgroundContainer,
  JournalGridContainer, JournalContainer
} from "./../components/Styles.js";

import './../components/Styles.css';

import { Icon } from '@iconify/react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

import { ThemeProvider } from '@mui/material/styles'
import theme from '.././components/Styles.js';
import ImagesToLoad from "./../components/ImagesToLoad.js"

// Import axios to communicate with backend
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [logInStatus, setLogInStatus] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [journals, setJournals] = useState([""]);
  const [selectedJournalId, setSelectedJournalId] = useState("");

  const navigate = useNavigate();

  // Function to handle user input
  const handleChange = (event) => {
    const {name, value } = event.target;
    setFormValues({...formValues, [name]: value});
    setFormErrors({...formErrors, [name]: ""})
  };

  // Function to handle submit on create journal form
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validateEditForm(formValues));
    setIsSubmitted(true);

    if(Object.keys(formErrors).length === 0 && isSubmitted) {
      createJournal(formValues);
    }
  };

  // Function to handle submit on edit journal form
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitted(true);

    if(Object.keys(formErrors).length === 0 && isSubmitted) {
      updateJournal(formValues);
    }
  };

  // Function to validate user input, returning any errors
  const validate = (values) => {
    const errors = {};

    if(!values.title) {
      // Title field is empty
      errors.title = "* Title is required";
    } 
    if(values.title){
      
      if(values.title.length > 35){
      // Title field exceeds 35 characters
      errors.title = "* Title must be 35 characters or less"
      }
    }
    if(!values.cover) {
      // No cover selected
      errors.cover = "* Select a cover";
    }
    if(values.description){
      
      if(values.description.length > 300){
      // Description exceeds 300 characters
      errors.description = "* Description must be 300 characters or less"
      }
    } 


    return errors;
  };

  // Function to validate user input for edit form, returning any errors
  const validateEditForm = (values) => {
    const errors = {};

    if(!values.title) {
      // Title field is empty
      errors.title = "* Title is required";
    } 
    if(values.title){
      
      if(values.title.length > 35){
      // Title field exceeds 35 characters
      errors.title = "* Title must be 35 characters or less"
      }
    }
    if(values.description){
      
      if(values.description.length > 300){
      // Description exceeds 300 characters
      errors.description = "* Description must be 300 characters or less"
      }
    } 
    return errors;
  };

  // Function to handle create new journal
  const createJournal = (values) => {

    const description = values.description ? values.description : "";

    Axios.post('http://localhost:5000/createNewJournal', {
      title: values.title,
      description: description,
      cover: values.cover,
      username: logInStatus
    }).then(response => {
      if(response.data.message) {
        handleCloseCreateDialog();

        loadJournals();

      } else {

      }}).catch(error => {
      console.log(error);
    })

    setLogInStatus(logInStatus);

    setFormValues("");
    setIsSubmitted(false);

  }

 // Function to handle create new journal
 const updateJournal = (values) => {

  const journal_id = selectedJournalId;
  const description = values.description ? values.description : "";

  Axios.post('http://localhost:5000/updateJournal', {
    title: values.title,
    description: description,
    id: journal_id
  }).then(response => {
    if(response.data.message) {
      handleCloseOptions();
      loadJournals();
    } else {
    }}).catch(error => {
    console.log(error);
  })
  setLogInStatus(logInStatus);
  setFormValues("");
  setIsSubmitted(false);
  }

  const deleteJournal = () => {
    
    const journal_id = selectedJournalId;

    Axios.post("http://localhost:5000/deleteJournal", {
      id: journal_id
    }).then((response) => {
      
      loadJournals();
      handleCloseOptions();
    })
  }

  const loadJournals = () => {

    Axios.post("http://localhost:5000/loadJournals", {
      username: logInStatus
    }).then((response) => {
      if (response.data){
        const responseArray = response.data;

        setJournals(responseArray)

      }
    }) 
  }

  // Upon first rendering page, check if user is logged in.
  // Redirect if not, or retrieve session details.
  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true){

        // User is logged in, redirect to dashboard
        setLogInStatus(response.data.user[0].username);

      } else {
        navigate('/login');
      }
    })

  }, [])

  useLayoutEffect( () => {

    loadJournals();

  }, [logInStatus])


  const handleClickCreate = () => {
    setFormValues("");
    setOpenCreateDialog(true);
  }

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  }

  const handleClickOptions = (title, description, cover, id) => {
    setOpenOptions(true);
    setSelectedJournalId(id);
    setFormValues({title: title, description: description, cover: cover});

  }

  const handleCloseOptions = () => {
    setSelectedJournalId("");
    setOpenOptions(false);
  }

  const navigateToEditor = (journal_id, page_id) => {
    // Insert search params and navigate to editor
    navigate("/editor?" + `journal_id=${journal_id}` + '&' + `page_id=${page_id}`);
  }

  const getPageIdForParams = (journal_id) => {
    Axios.post("http://localhost:5000/getPageId", {
      journal_id: journal_id
    }).then((response) => {
      if (response.data.length != 0){

        console.log(response.data);

        const page_id = response.data[0].page_id;
        navigateToEditor(journal_id, page_id);
        
      } else {

        // Page does not exist. Need to create first page.
        Axios.post('http://localhost:5000/createFirstJournalPage', {
          journal_id: journal_id
        }).then((response => {
        
          if(response.message){

          // Page has been created
            Axios.post("http://localhost:5000/getPageId", {
              journal_id: journal_id
            }).then((response) => {

              const page_id = response.data[0].page_id;
              navigateToEditor(journal_id, page_id);
            } 
          )}
        }))
      }
    })
  }


  return (
    <div>
      <ImagesToLoad></ImagesToLoad>
      <GreyBackgroundContainer>
        <JournalGridContainer>
        {
          journals.map((journal) => (
          <JournalContainer>
          <div style={{display: "flex", flexDirection: "column"}}> 
            <p style={{color: "black", 
            fontSize: "20px", 
            fontFamily: "Calibri Light", 
            fontWeight: "bold", 
            marginTop: "15px", 
            width: "250px",
            wordWrap: "break-word"}}>
              {journal.title}
            </p>
            <Icon id="journalSettings" icon="ci:settings-filled" onClick={() => {handleClickOptions(journal.title, journal.description, journal.cover, journal.journal_id)}}/>
            <Dialog onClose={handleCloseOptions} open={openOptions} style={{padding: "0px"}}>
            <CreateJournalContainer style={{height: "360px"}}>
              <h2 style={{fontFamily: "Roboto", fontSize: "18px"}}> Edit journal </h2>
              <form onSubmit={handleSubmitEdit}>
                <ThemeProvider theme={theme}>
                  <TextField 
                    style={{width: "90%", marginTop: "30px", marginBottom: "10px"}}
                    id="title"
                    type="text"
                    variant="outlined"
                    label="Title"
                    size="small"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    inputProps={{style: {fontSize: 16}}}
                  />
                  <ErrorContainer>
                    <p style={{marginTop: "1px", fontFamily: "Roboto"}}>{formErrors.title}</p>
                  </ErrorContainer>
                  <TextField 
                    style={{width: "90%", marginTop: "10px", marginBottom: "20px"}}
                    id="description"
                    type="text"
                    variant="outlined"
                    label="Description"
                    size="small"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    inputProps={{style: {fontSize: 14}}}
                  />
                  <ErrorContainer>
                    <p style={{marginTop: "1px", fontFamily: "Roboto"}}>{formErrors.description}</p>
                  </ErrorContainer> 
                  <br></br>
                  <button id="formButton_edit" style={{marginTop: "10px"}}>Edit</button>
                  <Icon id="deleteJournal" icon="fluent:delete-24-filled" style={{marginLeft: "30px;"}} onClick={deleteJournal}/>
                </ThemeProvider>
              </form>
            </CreateJournalContainer>
            </Dialog>
            <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <img src={(journal.cover)} style={{width: "229.5px", height: "306px", marginTop: "-20px"}}/>
            </div>
            <p style={{color: "black", 
            fontSize: "15px", 
            fontFamily: "Calibri", 
            marginTop: "-5px", 
            textAlign: "left", 
            marginLeft: "5px",
            paddingLeft: "4px",
            wordWrap: "break-word",
            width: "250px"}}>{journal.description}</p>
          </div>
          <button class="createEditButton" style={{position: "static"}} onClick={() => {getPageIdForParams(journal.journal_id)}}> Edit Pages </button>
          </JournalContainer>
          ))
        }
        </JournalGridContainer>
      </GreyBackgroundContainer>
      <WhiteBackgroundContainer>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
            <h1 style={{fontFamily: "Calibri Light", fontSize: "38px", color: "#2a2a2a", position: "sticky"}}> My Journals </h1>
            <h3 style={{marginTop: "20px",fontFamily: "calibri", fontSize: "18px", color: "#2a2a2a"}}> 
              Create a new journal or select a journal to edit 
            </h3>
          </div>
          <div>
            <button id="createButton" class="createEditButton" onClick={handleClickCreate}> Create a new journal </button>
          </div>
        </div>
        <Dialog onClose={handleCloseCreateDialog} open={openCreateDialog} style={{padding: "0px"}}>
        <CreateJournalContainer>
          <h2 style={{fontFamily: "Roboto", fontSize: "18px"}}> Create new journal </h2>
          <form onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
              <TextField 
                style={{width: "90%", marginTop: "30px", marginBottom: "10px"}}
                id="title"
                type="text"
                variant="outlined"
                label="Title"
                size="small"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                inputProps={{style: {fontSize: 16}}}
              />
              <ErrorContainer>
                <p style={{marginTop: "1px", fontFamily: "Roboto"}}>{formErrors.title}</p>
              </ErrorContainer>
              <TextField 
                style={{width: "90%", marginTop: "10px", marginBottom: "20px"}}
                id="description"
                type="text"
                variant="outlined"
                label="Description"
                size="small"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                multiline
                rows={4}
                inputProps={{style: {fontSize: 14}}}
              />
              <ErrorContainer>
                <p style={{marginTop: "1px", fontFamily: "Roboto"}}>{formErrors.description}</p>
              </ErrorContainer> 
              <br></br>
              <div style={{display: "flex", textAlign: "left", marginLeft: "30px"}}>
                <label style={{fontFamily: 'Roboto', marginBottom: "10px"}}>
                  Choose cover
                </label>
              </div>
              <JournalCoversContainer style={{padding: "10px"}}>
                <Grid style={{display: "flex", justifyContent: "space-evenly"}}>
                  <input onClick={handleChange} type="radio" id="radio_cover_1" name="cover" class="input_hidden" value="https://i.imgur.com/0n7DOFe.png"/>
                  <label for="radio_cover_1">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover1_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_2" name="cover" class="input_hidden" value="https://i.imgur.com/tb8lsqG.png"/>
                  <label for="radio_cover_2">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover2_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_3" name="cover" class="input_hidden" value="https://i.imgur.com/Ddq5PiW.png"/>
                  <label for="radio_cover_3">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover3_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_4" name="cover" class="input_hidden" value="https://i.imgur.com/ah7Bor2.png"/>
                  <label for="radio_cover_4">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover4_square)}></img>
                  </label>
                  <JournalCoverSpace/>

                  <input onClick={handleChange} type="radio" id="radio_cover_5" name="cover" class="input_hidden" value="https://i.imgur.com/Q9Ke5Cm.png"/>
                  <label for="radio_cover_5">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover5_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_6" name="cover" class="input_hidden" value="https://i.imgur.com/65V80vb.png"/>
                  <label for="radio_cover_6">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover6_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_7" name="cover" class="input_hidden" value="https://i.imgur.com/5QqCS5U.png"/>
                  <label for="radio_cover_7">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover7_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_8" name="cover" class="input_hidden" value="https://i.imgur.com/iTgFKIo.png"/>
                  <label for="radio_cover_8">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover8_square)}></img>
                  </label>

                  <JournalCoverSpace/>

                  <input onClick={handleChange} type="radio" id="radio_cover_9" name="cover" class="input_hidden" value="https://i.imgur.com/noqwqU1.png"/>
                  <label for="radio_cover_9">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover9_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_10" name="cover" class="input_hidden" value="https://i.imgur.com/gYjNzs6.png"/>
                  <label for="radio_cover_10">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover10_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_11" name="cover" class="input_hidden" value="https://i.imgur.com/nKEdJAg.png"/>
                  <label for="radio_cover_11">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover11_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_12" name="cover" class="input_hidden" value="https://i.imgur.com/cnmdyiW.png"/>
                  <label for="radio_cover_12">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover12_square)}></img>
                  </label>

                  <JournalCoverSpace/>

                  <input onClick={handleChange} type="radio" id="radio_cover_13" name="cover" class="input_hidden" value="https://i.imgur.com/rUehd91.png"/>
                  <label for="radio_cover_13">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover13_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_14" name="cover" class="input_hidden" value="https://i.imgur.com/447feGB.png"/>
                  <label for="radio_cover_14">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover14_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_15" name="cover" class="input_hidden" value="https://i.imgur.com/FLzu2TZ.png"/>
                  <label for="radio_cover_15">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover15_square)}></img>
                  </label>

                  <input onClick={handleChange} type="radio" id="radio_cover_16" name="cover" class="input_hidden" value="https://i.imgur.com/hnZN8db.png"/>
                  <label for="radio_cover_16">
                      <img style={{height: '110px', width: '110px', borderRadius: "5px", cursor: "pointer"}} src={(cover16_square)}></img>
                  </label>

                  <HiddenContainer/><HiddenContainer/>

                </Grid>
              </JournalCoversContainer>
              <ErrorContainer>
                <p style={{marginTop: "10px", fontFamily: "Roboto"}}>{formErrors.cover}</p>
              </ErrorContainer>
              <button id="formButton_create" style={{marginTop: "10px"}}>Create</button>
          </ThemeProvider>
        </form>
        </CreateJournalContainer>
        </Dialog>
      </WhiteBackgroundContainer>
      <Header></Header>
    </div>
  )
}
  
export default Dashboard