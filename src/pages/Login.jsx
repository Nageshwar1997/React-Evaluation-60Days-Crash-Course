import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const toast = useToast();
  const emailRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: formState,
      });
      console.log(resp.data);
      login(formState.email, resp.data.token);
      toast({
        title: "User LoggedIn Successfully....",
        description: "We are redirecting to the home page.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setError("Invalid Email Or Password");
    }
    // console.log(formState);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <Box border={"1px solid black"} m="auto" mt={10} p={5} width="40%">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormLabel color={"darkblue"}>Email</FormLabel>
          <Input
            ref={emailRef}
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email"
          />
          <p>
            please use this email id :-{" "}
            <strong style={{ color: "red" }}>eve.holt@reqres.in</strong>
          </p>
          <FormLabel color={"darkblue"}>Password</FormLabel>
          <Input
            type="text"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Enter Your Password"
          />
          <p>
            Please use thid password :-{" "}
            <strong style={{ color: "red" }}>cityslicka</strong>
          </p>

          <Button
            display={"block"}
            margin="auto"
            w={"200px"}
            mt={2}
            type="Login"
          >
            <Link to="/">Submit</Link>
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
