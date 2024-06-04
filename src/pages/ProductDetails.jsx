/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const fetchProduct = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`,
      });
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Product Added to Cart",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  return (
    <Box>
      {product ? (
        <Box
          textTransform="capitalize"
          border={"1px solid black"}
          p={4}
          position={"relative"}
          top={"120px"}
        >
          <Flex gap={10}>
            <Box>
              <Image src={product.image} alt={product.title} />
            </Box>
            <Box>
              <Heading as={"h1"} fontSize={"2xl"}>
                {product.title}
              </Heading>
              <Text>
                Brand : <strong>{product.brand}</strong>
              </Text>
              <Text>
                Category : <strong>{product.category}</strong>
              </Text>
              <Text>
                Price : <strong>₹ {product.price}.00</strong>
              </Text>
              <Button onClick={handleAddToCart} w={"150px"} h={10} mt={4}>
                Add To Cart
              </Button>
            </Box>
          </Flex>
        </Box>
      ) : (
        <h1>No Product Found</h1>
      )}
    </Box>
  );
};

export default ProductDetails;
