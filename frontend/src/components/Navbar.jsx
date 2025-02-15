import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { useTheme } from 'next-themes'; 
import { LuSun } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5';

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const toggleColorMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark'); 
    };

    // const buttonBgColor = useColorModeValue("gray.100", "gray.900");

    return (
        <Container maxH={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{ base: "22px", sm: "28px" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient="to-r" gradientFrom="cyan.400" gradientTo="blue.500"
                    bgClip={"text"}
                >
                    <Link to={"/"}> Product Store</Link>
                </Text>

                <HStack spaceX={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button variant='ghost'>
                            <FaPlus fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode} variant='ghost'>
                        {theme === "light" ? <IoMoon/> : <LuSun />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
