// Import useState to store credentials
import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";

// Import axios to communicate with backend
import Axios from 'axios';

// Import styles for page and components
import {
    FormContainerLogin, BannerContainer, 
    PageContainer, LargeLogo, SmallLogo,
    BottomBanner, ButtonContainer, 
    FieldContainerLogin, TitleContainer, 
    FormFields, HeaderBar, TextLinkLogin
  } from "./../components/Styles.js";

import './../components/Styles.css';

// Import material UI modules and theme for form components
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import theme from '.././components/Styles.js';


// Main login functional component
const Login = () => {

  // UseStates for form variables
  const initialValues = {username:"", password:""};
  const [formValues, setFormValues] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [logInStatus, setLogInStatus] = useState("");

  Axios.defaults.withCredentials = true;

  // Checks if user is logged in upon rendering page
  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true){

        // User is logged in, redirect to dashboard
        setLogInStatus(response.data.user[0].username);
        navigate('/dashboard');
      } 
    })

  }, [])

  const navigate = useNavigate();

  // Function to handle user input
  const handleChange = (event) => {
    const {name, value } = event.target;
    setFormValues({...formValues, [name]: value});
    setFormErrors({...formErrors, [name]: ""})
  };

  // Function to handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitted(true);
  };

  // Called whenever there is a rerender
  useEffect (() => {
    if(Object.keys(formErrors).length === 0 && isSubmitted) {
      loginUser(formValues);
    }
  }, [formErrors]);

  // Function to handle login
  const loginUser = (values) => {

    // First check user exists
    Axios.post('http://localhost:5000/confirmUser', {
      username: values.username,
    }).then(response => {
      if(response.data.message) {

        // Username does not exist
        setFormErrors({username : "* Username does not exist"})
      } else {

        // Username exists
        // Check password
        Axios.post('http://localhost:5000/login', {
          username: values.username,
          password: values.password
        }).then(response => {
          if(response.data.message) {
            
            // Invalid password
            setFormErrors({password: "* Invalid password"})
          } else {
            navigate("/dashboard");
          }
        }).catch(error => {
          console.log(error);
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }

  // Function to validate user input, returning any errors
  const validate = (values) => {
    const errors = {};

    if(!values.username) {
      // Username input is empty
      errors.username = "* Username is required";
    }
    if(!values.password) {
      // Password input is empty
      errors.password = "* Password is required";
    } 
    return errors;
  };

  return (
    <div>
      <PageContainer>
        <HeaderBar>
          <SmallLogo></SmallLogo>
        </HeaderBar>
        <BannerContainer></BannerContainer>
        <FormContainerLogin>
        <LargeLogo></LargeLogo>
        <TitleContainer>          
          <h3 id="h3_login"> Don't have an account? </h3>
          <TextLinkLogin to="/register"> Register </TextLinkLogin>
        </TitleContainer>
        <form className ="form" onSubmit={handleSubmit}>
          <FieldContainerLogin>
            <FormFields>
            <ThemeProvider theme={theme}>
              <TextField 
                sx={{ marginTop : 1, marginBottom : 2 }}
                id="username"
                type="text"
                variant="outlined"
                label="Username"
                size="small"
                name="username"
                value={formValues.username}
                onChange={handleChange}
              />
              <p>{formErrors.username}</p>
              <TextField
                sx={{ marginTop : 2 , marginBottom : 2 }}
                id="password"
                type="password"
                variant="outlined"
                label="Password"
                size="small"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p>{formErrors.password}</p>
            </ThemeProvider>
            </FormFields>
          </FieldContainerLogin>
          <ButtonContainer>
            <button id="formButton_login">Login</button>
          </ButtonContainer>
        </form>
        </FormContainerLogin>
        <BottomBanner></BottomBanner>
      </PageContainer>
    </div>
  )
}

export default Login;