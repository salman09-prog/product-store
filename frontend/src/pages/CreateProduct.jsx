import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  };

  return (
    <>
      <Container size={"container.sm"}>
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Product
          </Heading>

          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />

              <Input
                placeholder="Product Price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />

              <Input
                placeholder="Product Image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />

              <Link to={"/"}>
                <Button
                  colorScheme="blue"
                  onClick={handleAddProduct}
                  w={"full"}
                >
                  Create product
                </Button>
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

export default CreateProduct;
