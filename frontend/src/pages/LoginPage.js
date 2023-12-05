// LoginPage.js
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login clicked");
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
      <Card sx={{ width: 390, paddingX: "10px" }}>
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
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack sx={{ width: "100%", marginY: 1 }} spacing={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Sign in
            </Button>
            <Alert severity="warning"></Alert>
            <div
              style={{
                margin: "15px 0", // Adjust the margin between the button and the line here
                border: "0.5px solid #ccc", // Adjust the thickness and color here
              }}
            />
            <div style={{ margin: "0px", textAlign: "center" }}>
              Does not have an account?{" "}
              <Link to="/signup">Sign Up</Link>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
