import { useState, useEffect } from "react"; // Import React hooks for managing state and side effects
import { Link, useNavigate } from "react-router-dom"; // Import navigation utilities from React Router

import {
  Link as ChakraLink,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Container,
  Box,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react"; // Import Chakra UI components for styling

import firebaseApp from "../FirebaseConfig"; // Import Firebase configuration
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth"; // Import Firebase authentication utilities

import Swal from "sweetalert2"; // Import SweetAlert2 library for alerts

function Register() {
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password

  const [passwordError, setPasswordError] = useState(""); // State for password error message

  let navigate = useNavigate(); // Get navigation function from React Router

  const auth = getAuth(firebaseApp); // Initialize Firebase authentication

  useEffect(() => {
    // Effect hook to check authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName) {
          setName(user.displayName); // Set name from user profile if available
        }
        navigate("/"); // Navigate to home page if user is logged in
        setTimeout(() => {
          window.location.reload(); // Reload the page after navigation
        }, 250);
      }
    });
  }, [auth, navigate]); // Dependency array with auth and navigate

  const handleRegistration = () => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      password.length >= 8
    ) {
      // Check if all fields are filled and passwords match
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;

          // Update user profile with name
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            setName(name); // Set name in state
            navigate("/"); // Navigate to home page after successful registration
          });
        }
      );

      // Show success message after registration
      Swal.fire({
        title: "Registration successful!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } else {
      // Show error message if registration fails
      Swal.fire({
        title: "Registration failed!",
        text: "Please check your input fields and try again",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      setPasswordError("Password must be at least 8 characters long."); // Set password error message
    }
  };

  return (
    <div className="mt-5 p-5">
      <Container maxW="450px">
        <Card>
          <Text className="display-4 text-center mt-2">DevTalk</Text>
          <hr />
          <CardBody>
            {/* Input for Name */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </FormControl>

            {/* Input for Email */}
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

            {/* Input for Password */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length < 8) {
                    setPasswordError(
                      "Password must be at least 8 characters long."
                    );
                  } else {
                    setPasswordError("");
                  }
                }}
                value={password}
                isInvalid={passwordError !== ""}
              />
              {passwordError && (
                <Text color="red.500" fontSize="sm">
                  {passwordError}
                </Text>
              )}
            </FormControl>

            {/* Input for Confirm Password */}
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
            </FormControl>

            <Text fontSize="xs" mt="3">
              By signing up, you agree to the{" "}
              <span style={{ color: "#1E90FF" }}> Terms of Service</span> and{" "}
              <span style={{ color: "#1E90FF" }}>Privacy Policy</span>
            </Text>

            <hr />

            <div className="text-center">
              {/* Buton for Create account */}
              <Button mt={5} colorScheme="twitter" onClick={handleRegistration}>
                Create account
              </Button>
            </div>

            <div className="text-center my-3">
              {/* Login Link */}
              <Link to="/login">
                <ChakraLink>Already have an account? Login here.</ChakraLink>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
