import { Container, Text, Center, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Error404() {
  let navigate = useNavigate();

  const click = () => {
    navigate("/");
  };

  return (
    <Container>
      <Center h="100vh">
        <Text fontSize="7xl" fontWeight="bold">
          Error 404
        </Text>
      </Center>
    </Container>
  );
}

export default Error404;
