import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  //   console.log(authState);

  const handleLogout = () => {
    logout();
  };
  return (
    <Flex
      as={"nav"}
      bg={"blue.500"}
      color={"white"}
      justify={"space-between"}
      p={4}
    >
      {authState.isAuthenticated ? (
        <>
          <Box>{authState?.email}</Box>
          <Box>
            <Link to="/">Home</Link>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </Box>
        </>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </Flex>
  );
};

export default Navbar;
