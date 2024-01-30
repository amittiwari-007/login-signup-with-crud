
import React, { useState } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@mui/material";
import axios from 'axios';
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const salt = bcrypt.genSaltSync(10);

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const login = () => {
    const pwd = bcrypt.hashSync(password, salt);

    console.log(password);
    console.log(pwd);

    axios.post('http://localhost:2000/login', {
      username: username,
      password: password,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      navigate("/dashboard");
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          value={username}
          onChange={onChangeUsername}
          placeholder="User Name"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
          required
        />
        <br /><br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={username === '' || password === ''}
          onClick={login}
        >
          Login
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link
          component="button"
          style={{ fontFamily: "inherit", fontSize: "inherit" }}
          onClick={() => navigate("/register")}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
