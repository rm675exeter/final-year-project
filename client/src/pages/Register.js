// Import useState to store credentials
import React, { useState, useEffect } from 'react'

// Import axios to communicate with backend
import Axios from 'axios';

import { useNavigate } from "react-router-dom";

// Import styles for page and components
import {
    FormContainer, BannerContainer, 
    PageContainer, LargeLogo, 
    BottomBanner, ButtonContainer, 
    FieldContainer, TitleContainer, 
    FormFields, SmallLogo, HeaderBar, TextLink
  } from "./../components/Styles.js";

import './../components/Styles.css';

// Import material UI modules and theme for form components
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import theme from '.././components/Styles.js';
import Checkbox from '@mui/material/Checkbox';
import { FormGroup, FormControlLabel } from '@mui/material';

// Main register functional component
const Register = () => {

  // UseStates for form variables
  const initialValues = {username:"", email: "", password:"", confirm_password:""};
  const [formValues, setFormValues] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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

  // Allow navigation between pages
  const navigate = useNavigate();

  // Function to handle user input
  const handleChange = (e) => {
    /* console.log(e.target); */
    const {name, value } = e.target;
    setFormValues({...formValues, [name]: value});
    setFormErrors({...formErrors, [name]: ""})
    /* console.log(formValues); */
  };

  // Function to handle checkbox state
  const handleCheckbox = (e) => {
    setAcceptTerms(e.target.checked);
    if(isSubmitted){
      if(!acceptTerms){
        setFormErrors({...formErrors, termsAndConditions: ""});
      } else {
        setFormErrors({...formErrors, termsAndConditions: "* Must accept terms and conditions"})
      }
    }
  }

  // Function to handle submit
  const handleSubmit = (e) => {
  
    e.preventDefault();
    setFormErrors(validate(formValues, acceptTerms));
    setIsSubmitted(true);
  };


  // Called whenever there is a rerender
  useEffect (() => {

    if(Object.keys(formErrors).length === 0 && isSubmitted) {
      registerUser(formValues)
    }

  }, [formErrors]);


  const registerUser = (values) => {

    // First check if username exists
    Axios.post('http://localhost:5000/confirmUser', {
      username: values.username,
    }).then(response => {
      if(!response.data.message) {

        // Username is taken
        console.log("Username already exists")
        setFormErrors({...formErrors, username : "* Username is taken"})

        // Check email too
        Axios.post('http://localhost:5000/confirmEmail', {
          email: values.email,
        }).then(response => {
          if(!response.data.message){

            // Email is already registered
            console.log("Email is already registered")
            setFormErrors({...formErrors, 
              email : "* Email is already registered", 
              username : "* Username is taken"
            })
      
          } else {
            console.log("Email is free to use")
          }
        })

      } else {

        // Username is free to use
        // Check email too

        Axios.post('http://localhost:5000/confirmEmail', {
          email: values.email,
        }).then(response => {
        if(!response.data.message){

          // Email is already registered
          console.log("Email is already registered")
          setFormErrors({...formErrors, email : "* Email is already registered"})
        } else {
          
          // Both email and username are free to use
          // Now register user
          Axios.post('http://localhost:5000/register', {
            username: values.username,
            password: values.password,
            email: values.email
          }).then(response => {
            if(response.status = 200) {
              console.log("Registered user successfully")
              navigate('/dashboard')
            } else {
              console.log("Failed to register");
            }
          }).catch(error => {
            console.log(error);
          })
        }
      }).catch(error => {
        console.log(error);
      })
    }
  })

  }

  // Function to validate user input, returning any errors
  const validate = (values, acceptTerms) => {
    
    // Initiate error messages
    const errors = {};

    // regex to check email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!values.username) {
      errors.username = "* Username is required";
    }
    if(!values.email) {
        errors.email = "* Email is required";
    } else if (!regex.test(values.email)) {
        errors.email = "* Not a valid email";
    } 
    if(!acceptTerms) {
        errors.termsAndConditions= "* Must accept terms and conditions";
    }
    if(!values.password) {
        errors.password = "* Password is required";
    } else if (!values.confirm_password){
        errors.confirm_password = "* Confirm password";
    } else if (values.password !== values.confirm_password){
        errors.confirm_password = "* Passwords do not match."
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
        <FormContainer>
        <LargeLogo></LargeLogo>
        <TitleContainer>
          <h3> Already have an account? </h3>
          <TextLink to="/login"> Sign In </TextLink>
        </TitleContainer>
        <form className ="form" onSubmit={handleSubmit}>
          <FieldContainer>
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
                id="email"
                type="text"
                variant="outlined"
                label="Email address"
                size="small"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p>{formErrors.email}</p>
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
              <TextField
                sx={{ marginTop : 2 , marginBottom : 2 }}
                id="confirm_password"
                type="password"
                variant="outlined"
                label="Confirm Password"
                size="small"
                name="confirm_password"
                onChange={handleChange}
              />
              <p>{formErrors.confirm_password}</p>
              <FormGroup>
                <FormControlLabel 
                  control={<Checkbox checked={acceptTerms} />} 
                  label="I agree to the terms and conditions" 
                  sx={{ marginTop : 1 , marginBottom : 1 }}
                  name="termsAndConditions"
                  onChange = {handleCheckbox}
                />
              </FormGroup>
              <p>{formErrors.termsAndConditions}</p>
            </ThemeProvider>
            </FormFields>
          </FieldContainer>
          <ButtonContainer>
            <button className="formButton">Register</button>
          </ButtonContainer>
        </form>
        </FormContainer>
        <BottomBanner></BottomBanner>
      </PageContainer>
    </div>
  )
}

export default Register;