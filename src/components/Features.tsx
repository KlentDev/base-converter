import { Box, HStack, Icon, Stack, StackProps, Text } from '@chakra-ui/react';
import { MdSettingsInputComponent, MdOutlineInfo } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';

interface FeatureProps extends StackProps {
  icon: React.ElementType;
}

function Feature(props: FeatureProps) {
  const { icon, children, ...rest } = props;
  return (
    <HStack {...rest} spacing="6" align="start">
      <Icon as={icon} boxSize={['8', '8', '12']} color="purple.500" />
      <Text textAlign="left" fontSize="md" fontWeight="bold" color="gray.500">
        {children}
      </Text>
    </HStack>
  );
}

export function Features() {
  return (
    <Box maxW="1024px" m="auto" pt="60px" pb="8" as="section">
      <Stack
        px="12"
        direction={['column', 'column', 'row']}
        spacing={['6', '6', '12']}
        justify="space-between"
      >
        <Feature icon={MdSettingsInputComponent}>
          Supports multiple bases including binary, octal, decimal, and hexadecimal.
        </Feature>
        <Feature icon={FiCheckCircle}>
          Accurate and fast number base conversions every time.
        </Feature>
        <Feature icon={MdOutlineInfo}>
          Detailed step-by-step explanations to help you understand the process.
        </Feature>
      </Stack>
    </Box>
  );
}
