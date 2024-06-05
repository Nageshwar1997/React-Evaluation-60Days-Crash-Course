import { Button, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    token: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null);
  const toast = useToast();
  const {
    login,
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",
        data: formState,
      });
      login(formState.email, response.data.token);
      toast({
        title: "Login Successfully",
        description: "You are redirecting to Home page",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "DonLogin Failed",
        description: "Please check email & password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <form
      onSubmit={handleLogin}
      style={{
        position: "relative",
        top: "120px",
        margin: "auto",
        width: "300px",
        padding: "30px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <FormLabel>
        Email : <i style={{ color: "red" }}>bruce@wayne.com</i>
      </FormLabel>
      <Input
        onChange={handleInputChange}
        ref={emailInputRef}
        name="email"
        value={formState.email}
        type="email"
        placeholder="Enter above email"
      />
      <br />
      <br />
      <FormLabel>
        Password : <i style={{ color: "red" }}>gotham123</i>
      </FormLabel>
      <Input
        onChange={handleInputChange}
        type={showPassword ? "text" : "password"}
        name="password"
        value={formState.password}
        placeholder="Enter above password"
      />
      <Text onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide Password" : "Show Password"}
      </Text>

      <br />
      <Button
        bg={"blue.200"}
        display={"block"}
        type="submit"
        margin={"auto"}
        w={"200px"}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
