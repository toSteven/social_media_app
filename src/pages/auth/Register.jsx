import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
} from "@chakra-ui/react";

import firebaseApp from "../FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import Swal from "sweetalert2";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  let navigate = useNavigate();

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName) {
          setName(user.displayName);
        }
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 250);
      }
    });
  }, [auth, navigate]);

  const handleRegistration = () => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      password.length >= 8
    ) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            setName(name);
            navigate("/");
          });
        }
      );

      Swal.fire({
        title: "Registration successful!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } else {
      Swal.fire({
        title: "Registration failed!",
        text: "Please check your input fields and try again",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      setPasswordError("Password must be at least 8 characters long.");
    }
  };

  return (
    <div className="mt-5 p-5">
      <Container maxW="450px">
        <Card>
          <Text className="display-4 text-center mt-2">DevTalk</Text>
          <hr />
          <CardBody>
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
              <Button mt={5} colorScheme="twitter" onClick={handleRegistration}>
                Create account
              </Button>
            </div>

            <div className="text-center my-3">
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
