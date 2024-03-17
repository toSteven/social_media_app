import { useState, useEffect } from "react"; // Import React hooks for managing state and side effects

import {
  Link as ChakraLink,
  Button,
  Input,
  FormControl,
  FormLabel,
  Container,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react"; // Import Chakra UI components for styling

import { Link, useNavigate } from "react-router-dom"; // Import navigation utilities from React Router

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"; // Import Firebase authentication utilities

import firebaseApp from "../FirebaseConfig"; // Import Firebase configuration

import Swal from "sweetalert2"; // Import SweetAlert2 library for alerts

function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  let navigate = useNavigate(); // Get navigation function from React Router

  useEffect(() => {
    // Effect hook to check authentication state
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, navigate to home page
        navigate("/");
      }
    });
  }, []);

  // Function to handle login
  const handleLogin = () => {
    if (email !== "" && password !== "") {
      // Check if email and password are not empty
      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // If login is successful, navigate to home page
          navigate("/");
        })
        .catch((error) => {
          // If login fails, show error message
          Swal.fire({
            title: "Invalid email or password",
            text: "Please try again",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        });
    } else {
      // If email or password is empty, show error message
      Swal.fire({
        title: "Missing Fields!",
        text: "Please try again",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // Function to handle click event (under development)
  const click = () => {
    Swal.fire({
      title: "Underdevelopment!",
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <div className="min-vh-100 mt-5 p-5">
      <Container maxW="500px" mt="20">
        {/* Login Form */}
        <Card mt="-3">
          <CardBody>
            <Text className="display-4 text-center">DevTalk</Text>
            <hr />
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </FormControl>

            <div className="text-center mt-3">
              {/* Forgot Password Button */}
              <Button
                variant="ghost"
                style={{ backgroundColor: "transparent" }}
                onClick={click}
              >
                {" "}
                <Text>Forgot Password?</Text>
              </Button>
            </div>

            <div className="text-center">
              {/* Login Button */}
              <Button mt={5} colorScheme="twitter" onClick={handleLogin}>
                Login
              </Button>
            </div>

            <div className="text-center mt-3">
              {/* Register Link */}
              <Link to="/register">
                <ChakraLink>Don't have an account? Register here</ChakraLink>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
