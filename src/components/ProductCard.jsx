/* eslint-disable react/prop-types */
import {
  Box,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { id, category, title, image, price } = product;
  return (
    <Box
      boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
      borderRadius={"10px"}
      pb={2}
      bg={"gray.100"}
    >
      <Box w={"100%"} mb={4}>
        <Image
          m={"auto"}
          w={"85%"}
          borderRadius={"10px"}
          p={2}
          src={image}
          alt={title}
        />
      </Box>
      <Box>
        <Heading
          textTransform="capitalize"
          as="h3"
          size={{ base: "xs", sm: "sm" }}
        >
          {title}
        </Heading>
        <Text textTransform="capitalize" size={{ base: "xs", sm: "sm" }}>
          Category : <strong>{category}</strong>
        </Text>
        <Text
          textTransform="capitalize"
          as="h3"
          size={{ base: "xs", sm: "sm" }}
        >
          Price : <strong>{price}</strong>
        </Text>
        <ChakraLink as={Link} to={`/productDetails/${id}`} color="blue.500">
          <strong>Go to Product Details</strong>
        </ChakraLink>
      </Box>
    </Box>
  );
};

export default ProductCard;
