/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import ProductCard from "../components/ProductCard";

let showPopup = 0;
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 8;

  const toast = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?filter=${category}&page=${page}&limit=${limit}&sort=price&order=${sortOrder}`,
      });
      setProducts(response.data.data);
      setTotalPage(response.data.totalPages);
      setLoading(false);
      setError(false);
      showPopup++;

      if (showPopup == 1) {
        toast({
          title: "Done",
          description: "Product Fetched Successfully.",
          status: "success",
          duration: 000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      toast({
        title: "Error",
        description: "Product Fetching Failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSortByPriceChange = (e) => {
    if (e.target.value != "") {
      setSortOrder(e.target.value);
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.value != "") {
      setCategory(e.target.value);
    }
    else {
      setCategory("all");
    }
  };

  const handlePrevPageChange = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(1);
    }
  };
  const handleNextPageChange = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchProducts(sortOrder);
  }, [page, category, sortOrder]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <Box position={"relative"} top={"75px"} p={4} bg="gray.50">
      <Flex w={"100%"} justifyContent={"space-around"} mb={4}>
        <Select
          placeholder="Sort By Price"
          w={"30%"}
          bg="white"
          value={sortOrder}
          onChange={handleSortByPriceChange}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
        <Select
          w={"30%"}
          placeholder="Filter by Category"
          bg="white"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="homedecor">Homedecor</option>
        </Select>
        <HStack spacing="24px">
          <Button onClick={handlePrevPageChange}>Prev</Button>
          {Array.from({ length: totalPage }, (_, p) => p + 1).map((p) => (
            <Button key={p} onClick={() => setPage(p)}>
              {p}
            </Button>
          ))}
          <Button onClick={handleNextPageChange}>Next</Button>
        </HStack>
      </Flex>
      <SimpleGrid
        columns={{ sm: 2, md: 4 }}
        spacing="8"
        p="10"
        textAlign="center"
        rounded="lg"
        color="black"
        m={"auto"}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
