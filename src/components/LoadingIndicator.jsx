import { Flex, Heading, Spinner } from "@chakra-ui/react";

const LoadingIndicator = () => {
  return (
    <Flex justify={"center"} align={"center"} mt={"120px"} direction={"column"} gap={5}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Heading as={"h1"}>Loading.....</Heading>
    </Flex>
  );
};

export default LoadingIndicator;
