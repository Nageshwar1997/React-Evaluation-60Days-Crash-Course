import { Button, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    token: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null);
  const token = "r0bINJoKeRGoTham911";
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      formState.email === "bruce@wayne.com" &&
      formState.password === "gotham123"
    ) {
      setFormState({
        ...formState,
        token: token,
      });
      localStorage.setItem("loginData", JSON.stringify({ ...formState , token}));
      toast({
        title: "Login Successfully",
        description: "You are redirecting to Home page",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      login(formState.email,token);

      navigate("/");
    } else {
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
