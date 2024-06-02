import { Alert, AlertIcon, Box, Select, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let resp = await axios.get(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products`
        );
        setProducts(resp.data);
        setLoading(false);
      } catch (error) {
        setLoading("Failed to Fetch Products");
        setError(true);
      }
    };

    fetchProducts();
  }, []);
  return (
    <Box p="4">
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <Box p={4}>
          <Select placeholder="Sort by Price">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
              </Select>
              <Select placeholder="Filter by Category"></Select>
        </Box>
      )}
    </Box>
  );
};

export default Home;
