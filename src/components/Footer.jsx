import { Box, Heading } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      position={"fixed"}
      bottom={0}
      bg="gray.50"
      w={"100%"}
      h={"50px"}
      margin={"auto"}
      textAlign={"center"}
    >
      <Heading as={"h1"}>Footer</Heading>
    </Box>
  );
};

export default Footer;
