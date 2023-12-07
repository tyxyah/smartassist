import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentType, setStudentType] = useState("");
  const [startSession, setStartSession] = useState("");
  const [muet, setMuet] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Perform signup
    const signupSuccess = await signup(email, username, password, studentType, startSession, muet, currentSemester);

    // Clear the form only on successful signup
    if (signupSuccess) {
      setEmail("");
      setUsername("");
      setPassword("");
      setShowSuccessAlert(true);
    }
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
            id="username"
            size="small"
            label="Username"
            variant="outlined"
            margintop="1"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="email"
            size="small"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Stack sx={{ width: "100%", marginY: 1}} spacing={2} direction={"row"}>
          <FormControl sx={{minWidth: 170}} size="small">
            <InputLabel>Student Type</InputLabel>
            <Select
              id="studentType"
              value={studentType}
              label="Student Type"
              onChange={(e) => setStudentType(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value={1}>Local</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{minWidth: 170}} size="small">
            <InputLabel>Start Session</InputLabel>
            <Select
              id="startSession"
              value={startSession}
              label="Start Session"
              onChange={(e) => setStartSession(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value={1}>2020/2021</MenuItem>
              <MenuItem value={2}>2021/2022</MenuItem>
            </Select>
          </FormControl></Stack>
          <Stack sx={{ width: "100%", marginTop: 2}} spacing={2} direction={"row"}>
          <FormControl sx={{minWidth: 170}} size="small">
            <InputLabel>Muet</InputLabel>
            <Select
              id="muet"
              value={muet}
              label="Muet"
              onChange={(e) => setMuet(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value={1}>1 or 2</MenuItem>
              <MenuItem value={2}>3 or 4</MenuItem>
              <MenuItem value={3}>5 or 6</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{minWidth: 170 }} size="small">
            <InputLabel>Current Semester</InputLabel>
            <Select
              id="currentSemester"
              value={currentSemester}
              label="Current Semester"
              onChange={(e) => setCurrentSemester(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </Select>
          </FormControl>
          </Stack>
          <TextField
            size="small"
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
              disabled={isLoading}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignup}
            >
              Sign up
            </Button>

            {/* Conditional rendering of error and success alerts */}
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : showSuccessAlert ? (
              <Alert severity="success">
                Signup successful! Try login now.
              </Alert>
            ) : null}

            <div
              style={{
                margin: "15px 0", // Adjust the margin between the button and the line here
                border: "0.5px solid #ccc", // Adjust the thickness and color here
              }}
            />
            <div style={{ margin: "0px", textAlign: "center" }}>
              Already have an account? <Link to="/">Login here</Link>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
