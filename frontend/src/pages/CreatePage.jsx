import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react'
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from '../components/ui/toaster';

const CreatePage = () => {

  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct } = useProductStore(); 

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        description: message,
        type: "error",
      });
    } else{
      toaster.create({
        description: message,
        type: "success"
      });
    }
    setNewProduct({ //resets the state / fields
      name: "",
      price: "",
      image: "",
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack 
        spaceY={8}
      >
        <Heading as={"h1"} size={"4x1"} textAlign={"center"} mb={8} fontSize={"30px"}>
          Create New Product
        </Heading>

        <Box 
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spaceY={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>

          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
