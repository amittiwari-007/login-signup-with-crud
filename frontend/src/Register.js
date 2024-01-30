import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if(value === undefined) {return}
    if (name === 'username' && value!=undefined) {
      setUsername(value);
    } else if (name === 'password'&& value!=undefined) {
      setPassword(value);
    } else if (name === 'confirm_password'&& value!=undefined) {
      setConfirmPassword(value);
    }
  };

  const register = () => {
    if (password !== confirmPassword) {
      swal({
        text: "Passwords do not match",
        icon: "error",
        type: "error"
      });
      return;
    }

    axios.post('http://localhost:2000/register', {
      username,
      password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      navigate("/");
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Register</h2>
      </div>

      <div>
        <TextField
          id="username"
          type="text"
          autoComplete="off"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="User Name"
          required
        />
        <br /><br />
        <TextField
          id="password"
          type="password"
          autoComplete="off"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <br /><br />
        <TextField
          id="confirm_password"
          type="password"
          autoComplete="off"
          name="confirm_password"
          value={confirmPassword}
          onChange={onChange}
          placeholder="Confirm Password"
          required
        />
        <br /><br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={username === '' || password === '' || confirmPassword === ''}
          onClick={register}
        >
          Register
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link
          component="button"
          style={{ fontFamily: "inherit", fontSize: "inherit" }}
          onClick={() => navigate("/")}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
