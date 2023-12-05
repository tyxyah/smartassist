// LoginPage.js
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    
    e.preventDefault()
    console.log("Login clicked");
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 390, paddingX: "10px"}}>
        <CardContent>
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "20px",
              color: "black"
            }}
          >
            <strong>SMART</strong>
            <i>ASSIST</i>
          </p>
          <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
          }}
          >
           Hi, Welcome Back
            </p>
          <p style={{
            textAlign: "center",}}
          >Use your UPM-ID</p>

          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
