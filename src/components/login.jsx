/* eslint-disable eqeqeq */
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

import {decode as base64_decode, encode as base64_encode} from 'base-64'



export default class Login extends Component {

  constructor(props) {
    super(props)

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);

     // State
     this.state = {
        email: '',
        password: '',
       
        
        
      }
    
    
  }

  responseSucessGoogle(response) {
    console.log(response)

    axios({
        method:"POST",
        url:"http://localhost:5000/api/auth/googlelogin",
        data: {tokenId: response.tokenId}
    }).then(response => {
        console.log(response)
    });
}

responseErrorGoogle(response) {
    console.log(response)
}

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangepassword(e) {
    this.setState({ password: e.target.value })
  }



  
      
      
  
 async onSubmit(e) {
    e.preventDefault();
    
    

    
         const avengerObject = {
      email: this.state.email,
      password: this.state.password,
      
    };

   

    

    
   

   await axios.post('http://localhost:5000/api/auth', avengerObject,{
     
    })
      .then((res) => {
        localStorage.setItem(`login`, res.data.token)
        console.log('Authentication checking.....')
        console.log('Authentication Successfull')
        console.log('Authorization checking.....')
        
           
        let token =localStorage.getItem('login')

      
      

       axios.post('http://localhost:5000/api/auth/check',token,{
       
        headers:{
          'token':token
        }
      })
      
    .then((res) => {
     if(res.data=="Admin"){

      let userRole = base64_encode(res.data);

      localStorage.setItem(`userRole`, userRole)
       console.log("User login successfully")
       console.log("Login role: ADMIN")
      
    
       window.location.reload();
     }
    else if(res.data=="User"){
      let userRole = base64_encode(res.data);
      localStorage.setItem(`userRole`, userRole)
      console.log("User login successfully")
      console.log("Login role: USER")

     
     
      window.location.reload();
    }

    else{
      console.log("Error while authorization")
    }
    
          
          
    }).catch((error) => {
      console.log('Authorization failed!')
      console.log(error)
    })
    

  
        
         
            
      }).catch((error) => {
        console.log('Authentication failed!')
        console.log(error)
      })
    

      

      
        
     
    }
  
  
    
  
   
  

    
 

  

  render() {
      
    return (
        
        
    <div onSubmit={this.mySubmitHandler} className="form-wrapper">
       <br/> <h3>Welcome To Ecare</h3><br/><br/>
      <form  onSubmit={this.onSubmit}>
        <Form.Group  controlId="Name">
          <Form.Label>email</Form.Label>
          <Form.Control type="text" autoComplete="off"  value={this.state.name} onChange={this.onChangeEmail} />
          {this.state.errormessage}
        </Form.Group>

        <Form.Group controlId="BirthName">
          <Form.Label>pass</Form.Label>
          <Form.Control type="text" autoComplete="off" value={this.state.password} onChange={this.onChangepassword} />
        </Form.Group>

       

        <Button variant="btn btn-outline-success" size="lg" block="block" type="cancel">
          Log in
          
        </Button><br/><br/>

        <Button variant="btn btn-outline-link" size="lg" block="block" type="cancel">
          Sign Up
          
        </Button><br/><br/>
        <GoogleLogin
    clientId="1089033934877-4tmqhiqtilv5bpecrjj9pne10mhlhihq.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseSucessGoogle}
    onFailure={this.responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />,
      </form>
    </div>);
  }
}



