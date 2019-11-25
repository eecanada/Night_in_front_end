import React, { Component } from 'react'


class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    CurrentUserId: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }


  handleSubmit = async (e) => {
    e.preventDefault()
    const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/register`,{
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type' : 'application/json'
       
      }
      
    })

    const parsedResponse = await registerResponse.json();

    console.log(parsedResponse)

    if(parsedResponse.status.message === "Success"){
      console.log('we did it')
      this.props.doUpdateCurrentUser(parsedResponse.data)  
    }
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <small> Username</small>
        <input type='text' name="username" onChange={this.handleChange} />
        <small> Password</small>
        <input type='password' name="password" onChange={this.handleChange} />
        <small> Email</small>
        <input type='text' name="email" onChange={this.handleChange} />
        <button type="Submit"  >Register</button>
      </form>
    )
  }
}

export default Register