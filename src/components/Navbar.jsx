import { Button, Flex, Tag } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  return (
    <Flex
      boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
      position={"fixed"}
      top={0}
      left={0}
      zIndex={10}
      bg={"white"}
      w={"100%"}
      justifyContent={"space-evenly"}
      p={4}
    >
      {authState?.isAuthenticated ? (
        <>
          {authState?.token && <Tag>{authState?.email}</Tag>}
          <Button>
            <Link to={"/"}>Home</Link>
          </Button>
          <Button>
            <Link to={"/login"} onClick={() => logout()}>
              Logout
            </Link>
          </Button>
        </>
      ) : (
        <Button>
          <Link to={"/login"}>Login</Link>
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
