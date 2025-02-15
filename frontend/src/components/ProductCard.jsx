import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  useDisclosure,
  VStack,
  Button
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from "react";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "./ui/drawer.jsx"


const ProductCard = ({ product }) => {

    const [open, setOpen] = React.useState(false);
    const [updatedProduct, setUpdatedProduct] = React.useState(product);

    const {deleteProduct, updateProduct} = useProductStore();

    const handleDeleteProduct = async (productId) =>{
        const {success,message} = await deleteProduct(productId);
        toaster.create({
            description: message,
            type: success ? "success" : "error",
        })
    }

    const handleUpdateProduct = async (productId, updatedProduct) =>{
      const {success, message} = await updateProduct(productId, updatedProduct);
      if(!success){
        toaster.create({
          description: message,
          type: "error"
        })
      } else {
        toaster.create({
          description: "Product updated.",
          type: "success"
        })
      }
    }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h="200px"
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="bold" mb={2}>
          <span>$</span>{product.price}
        </Text>

        <HStack>
          <DrawerRoot open={open} onOpenChange={(e)=> setOpen(e.open)}>
            <DrawerBackdrop />
            
            <DrawerTrigger asChild>
              <IconButton aria-label="Edit" variant="ghost" >
                <FaRegEdit />
              </IconButton>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader fontSize={22} textAlign={"center"}>Update Product</DrawerHeader>
              <DrawerBody>
                {product ? (
                  <>
                    <Input placeholder="Product Name" value={updatedProduct.name} mb={4} onChange={(e)=> setUpdatedProduct({ ...updatedProduct, name: e.target.value })}/>
                    <Input placeholder="Price" type="number" value={updatedProduct.price} mb={4} onChange={(e)=> setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                    <Input placeholder="Image URL" value={updatedProduct.image} mb={4} onChange={(e)=> setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
                    <DrawerTrigger asChild>
                      <Button w="full" onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>
                        Save Changes
                      </Button>
                    </DrawerTrigger>
                  </>
                ) : (
                  <p>No product selected</p>
                )}
              </DrawerBody> 
            </DrawerContent>
        </DrawerRoot>
          
          <IconButton aria-label="Delete" variant="ghost" onClick={()=> handleDeleteProduct(product._id)} >
            <MdDelete />
          </IconButton>

        </HStack>
      </Box>

      
    </Box>
  );
};

export default ProductCard;
