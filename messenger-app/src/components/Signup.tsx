import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";

const defaultState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
}
const SignUp = () => {
  const [inputs, setInputs] = useState(defaultState);

  const { loading, signup, error, success } = useSignup();

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success("User registered, you will be redirected to login page shortly");
      setTimeout(() => {
        setInputs(defaultState);
        navigate("/login");
      }, 3000);
    }
  }, [success, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, username, password } = inputs;
    await signup(fullName, username, password);
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up <span style={{ color: "#1976d2" }}>ChatApp</span>
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            error={inputs.password.length > 0 && inputs.password.length < 6}
            helperText={
              inputs.password.length > 0 && inputs.password.length < 6
          ? "Password must be at least 6 characters"
          : ""
            }
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || inputs.password.length < 6}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </Box>
        </form>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
        <Box mt={2}>
          <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
            Already have an account?
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;