import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalFooter,
  Button,
  Box,
  VStack,
  Icon,
  Divider,
  Code,
} from "@chakra-ui/react";
import { InfoOutlineIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  inputValue: string;
  fromBase: string;
  toBase: string;
  result: string;
}

export function CalculationsModal({
  isOpen,
  onClose,
  inputValue,
  fromBase,
  toBase,
  result,
}: Props) {
  const baseMap: Record<string, number> = {
    binary: 2,
    octal: 8,
    decimal: 10,
    hexadecimal: 16,
  };

  const decimalValue = parseInt(inputValue, baseMap[fromBase]);

  const steps = [
    {
      title: `Step 1: Identify Input`,
      explanation: (
        <>
          You entered the number{" "}
          <Code color="green.600" fontWeight="bold">{inputValue}</Code> in{" "}
          <Code color="green.600" fontWeight="bold">{fromBase}</Code> (base{" "}
          <Code color="green.600" fontWeight="bold">{baseMap[fromBase]}</Code>).
        </>
      ),
    },
    {
      title: `Step 2: Convert to Decimal (Base 10)`,
      explanation: (
        <>
          Convert each digit of{" "}
          <Code color="green.600" fontWeight="bold">{inputValue}</Code> from base{" "}
          <Code color="green.600" fontWeight="bold">{baseMap[fromBase]}</Code> to decimal. The result is{" "}
          <Code color="green.600" fontWeight="bold">{decimalValue}</Code>.
          <br />
          {fromBase === "binary" && (
            <>
              For example, in base 2, the calculation is:
              <Box
                as="pre"
                bg="gray.50"
                p={2}
                rounded="md"
                mt={1}
                fontSize="sm"
                overflowX="auto"
              >
                {`(${inputValue})₂ = ${inputValue
                  .split("")
                  .reverse()
                  .map(
                    (digit, i) => `${digit} × 2^${i}`
                  )
                  .join(" + ")} = ${decimalValue}`}
              </Box>
            </>
          )}
        </>
      ),
    },
    {
      title: `Step 3: Convert Decimal to ${toBase.charAt(0).toUpperCase() + toBase.slice(1)}`,
      explanation: (
        <>
          Convert the decimal value{" "}
          <Code color="green.600" fontWeight="bold">{decimalValue}</Code> to base{" "}
          <Code color="green.600" fontWeight="bold">{baseMap[toBase]}</Code> (
          <Code color="green.600" fontWeight="bold">{toBase}</Code>).
          <br />
          Result: <Code color="green.600" fontWeight="bold">{result}</Code>.
          <br />
          This is done by dividing the decimal number by{" "}
          <Code color="green.600" fontWeight="bold">{baseMap[toBase]}</Code> repeatedly and recording the remainders.
        </>
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent
        borderRadius="2xl"
        p={4}
        bgGradient="linear(to-br, white, purple.50)"
        boxShadow="lg"
        maxW="4xl"
      >
        <ModalHeader
          fontSize="2xl"
          fontWeight="bold"
          color="purple.600"
          textAlign="center"
        >
          <Icon as={InfoOutlineIcon} mr={2} />
          Conversion Steps
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <VStack align="start" spacing={6} mt={2}>
            {steps.map(({ title, explanation }, idx) => (
              <Box
                key={idx}
                p={4}
                w="full"
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                borderLeft="6px solid"
                borderColor="purple.400"
              >
                <Text fontWeight="bold" mb={2} color="purple.600" fontSize="lg">
                  {title}
                </Text>
                <Text fontWeight="medium" color="gray.700" whiteSpace="pre-wrap">
                  {explanation}
                </Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>

        <Divider my={4} borderColor="purple.100" />

        <ModalFooter justifyContent="center">
          <Button
            onClick={onClose}
            colorScheme="purple"
            px={6}
            py={2}
            fontWeight="semibold"
            borderRadius="full"
            _hover={{ bg: "purple.500" }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
