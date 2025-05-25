import { Box, Heading, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Define the keyframes for background animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export function Header() {
  return (
    <Box
      as="section"
      color="gray.50"
      pt={['60px', '60px', '90px']}
      pb="198px"
      px="8"
      textAlign={['left', 'left', 'center']}
      bgGradient="linear-gradient(270deg, #7f00ff,rgb(255, 28, 123),rgb(57, 162, 211),rgb(255, 36, 244))"
      bgSize="600% 600%"
      animation={`${gradientAnimation} 10s ease infinite`}
    >
      <Heading fontWeight="extrabold" fontSize={['3xl', '3xl', '5xl']}>
        Base Converter for IT Students
      </Heading>
      <Text fontWeight="medium" fontSize={['lg', 'lg', '2xl']} pt="4">
        Convert numbers between binary, octal, decimal, and hexadecimal formats with ease.
      </Text>
    </Box>
  );
}
