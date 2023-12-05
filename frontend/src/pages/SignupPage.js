import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault()
    
    console.log("Login clicked");
    console.log("Username:", username);
    console.log("Email:", email);
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
      <Card sx={{ width: 390, padding: "10px" }}>
        <CardContent>
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "20px",
              color: "black",
            }}
          >
            <strong>SMART</strong>
            <i>ASSIST</i>
          </p>
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "21px",
            }}
          >
            <strong>Sign up</strong>
          </p>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Enter your credential to continue
          </p>

          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
