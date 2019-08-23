// import React from "react";

// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <p>Build a login page here</p>
//     </>
//   );
// };

import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "semantic-ui-react";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // console.log(credentials)
  };

  const login = e => {
    e.preventDefault();
    console.log('make axios call with:', credentials)
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(response => {
        //response.data.payload is the token
        console.log('response', response);
        localStorage.setItem("token", response.data.payload);
        props.history.push("/bubblepage");
      })
      .catch(error => console.log("Error:", error.response.data.error));
  };

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <Input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
