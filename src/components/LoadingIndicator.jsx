import { Box, Heading, Spinner } from "@chakra-ui/react";

const LoadingIndicator = () => {
  return (
    <Box>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Heading as={"h1"}>Loading.....</Heading>
    </Box>
  );
};

export default LoadingIndicator;
