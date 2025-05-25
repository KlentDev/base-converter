import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { CalculationsModal } from "./Calculations";

export function Converter() {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("");
  const [toBase, setToBase] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const baseMap: Record<string, number> = {
    binary: 2,
    octal: 8,
    decimal: 10,
    hexadecimal: 16,
  };

  const placeholderMap: Record<string, string> = {
    binary: "e.g. 1010",
    octal: "e.g. 17",
    decimal: "e.g. 123",
    hexadecimal: "e.g. 1A3F",
  };

  const validateInput = (value: string, base: string): boolean => {
    const patterns: Record<string, RegExp> = {
      binary: /^[01]+$/,
      octal: /^[0-7]+$/,
      decimal: /^[0-9]+$/,
      hexadecimal: /^[0-9a-fA-F]+$/,
    };
    return patterns[base].test(value);
  };

  const handleConvert = () => {
    if (!fromBase || !toBase) {
      setError("Please select both conversion bases.");
      setResult("");
      return;
    }

    const isValid = validateInput(inputValue, fromBase);
    if (!isValid) {
      setError(`Invalid ${fromBase} number`);
      setResult("");
      return;
    }

    setError("");
    const parsed = parseInt(inputValue, baseMap[fromBase]);
    const converted = parsed.toString(baseMap[toBase]).toUpperCase();
    setResult(converted);
  };

  const handleResetInput = () => {
    setInputValue("");
    setResult("");
    setError("");
    setFromBase("");
    setToBase("");
  };

  const swapBases = () => {
    const temp = fromBase;
    setFromBase(toBase);
    setToBase(temp);
  };

  return (
    <Box mx="6" as="section">
      <Box
        maxW="994px"
        margin="auto"
        mt="-40"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="0 8px 20px rgba(0,0,0,0.08)"
        textAlign="center"
      >
        <Flex direction={["column", "column", "row"]}>
          <Box
            bg="purple.500"
            p={["28px", "40px", "60px"]}
            flex="1"
            color="white"
          >
            <Heading fontSize="2xl" fontWeight="semibold" mb="6" letterSpacing="wide">
              Convert Now
            </Heading>

            <InputGroup mb="5" rounded="md" overflow="hidden" boxShadow="sm">
              <Input
                type="text"
                placeholder={
                  fromBase
                    ? `Enter a ${fromBase} number (${placeholderMap[fromBase]})`
                    : "Enter a number"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                bg="white"
                color="gray.900"
                fontWeight="medium"
                _placeholder={{ color: "gray.400" }}
                py="6"
                px="4"
                borderRadius="md"
              />
              {inputValue && (
                <InputRightElement>
                  <Icon
                    as={CloseIcon}
                    color="gray.400"
                    boxSize={4}
                    cursor="pointer"
                    onClick={handleResetInput}
                    _hover={{ color: "gray.600", transform: "scale(1.2)" }}
                    transition="all 0.2s ease"
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {error && (
              <Text fontSize="sm" color="red.300" mb="4" fontWeight="medium" letterSpacing="wide">
                ⚠ {error}
              </Text>
            )}


            <Select
              value={fromBase}
              onChange={(e) => setFromBase(e.target.value)}
              mb={4}
              bg="white"
              color={fromBase ? "black" : "gray.500"}
              rounded="md"
              shadow="sm"
            >
              <option value="" disabled hidden>
                Select source base
              </option>
              {Object.keys(baseMap).map((key) => (
                <option key={key} value={key}>
                  {key[0].toUpperCase() + key.slice(1)}
                </option>
              ))}
            </Select>

            <Flex justify="center" mb={4}>
              <Button
                onClick={swapBases}
                rounded="full"
                colorScheme="purple"
                variant="ghost"
                size="sm"
                px={4}
                py={2}
                leftIcon={<RepeatIcon boxSize={5} />}
                _hover={{ transform: "scale(1.1)", bg: "purple.700" }}
                transition="all 0.2s ease"
              >
                Swap
              </Button>
            </Flex>


            <Select
              value={toBase}
              onChange={(e) => setToBase(e.target.value)}
              mb={6}
              bg="white"
              color={toBase ? "black" : "gray.500"}
              rounded="md"
              shadow="sm"
            >
              <option value="" disabled hidden>
                Select target base
              </option>
              {Object.keys(baseMap).map((key) => (
                <option key={key} value={key}>
                  {key[0].toUpperCase() + key.slice(1)}
                </option>
              ))}
            </Select>

            <Flex justify="center">
              <Button
                colorScheme="whiteAlpha"
                bg="white"
                color="purple.700"
                fontWeight="semibold"
                px="8"
                py="5"
                fontSize="lg"
                rounded="md"
                _hover={{ bg: "whiteAlpha.900", transform: "scale(1.05)" }}
                transition="all 0.2s ease"
                onClick={handleConvert}
              >
                Convert Now
              </Button>
            </Flex>
          </Box>

          <Box
            p={["32px", "32px", "60px"]}
            fontSize="lg"
            bg="white"
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="gray.800"
            roundedRight="xl"
          >
            <Box textAlign="center" maxW="280px" mx="auto">
              <Text fontSize="xl" fontWeight="semibold" mb="3" letterSpacing="wider">
                Result:
              </Text>
              <Text fontSize="1xl" color="purple.600" mb="6" fontWeight="sm" minH="48px" lineHeight="1.2" letterSpacing="wide">
                {result || "Your result will appear here"}
              </Text>

              {result && (
                <Button
                  leftIcon={<ViewIcon />}
                  onClick={onOpen}
                  colorScheme="purple"
                  variant="outline"
                  size="md"
                  fontWeight="medium"
                  px="6"
                  py="4"
                  rounded="md"
                  _hover={{ bg: "purple.50" }}
                  transition="all 0.15s ease"
                >
                  View Calculation
                </Button>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>

      <CalculationsModal
        isOpen={isOpen}
        onClose={onClose}
        inputValue={inputValue}
        fromBase={fromBase}
        toBase={toBase}
        result={result}
      />
    </Box>
  );
}
