import { Card, Text, Avatar, HStack, Spacer, Button } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faReply, faShare } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

function Post({ post, name, time_stamp }) {
  const click = () => {
    Swal.fire({
      title: "Underdevelopment!",
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <Card
      className="bg-light text-dark "
      borderEndRadius="5"
      mt="3"
      mb="3"
      p="3"
    >
      <HStack>
        {/* User avatar */}
        <Avatar mt="5" h="40px" w="40px" src="./asset/images/avatar.jpg" />

        {/* User name */}
        <Text mt="5" fontWeight="bold">
          {name}
        </Text>

        <Spacer />

        {/* ttext for setting under development */}
        <Text>...</Text>
      </HStack>

      <Text fontSize="xs" color="gray" ml="10" mt="-5" pl="2">
        {time_stamp}
      </Text>

      <hr />

      <Text className="ms-2 p-3 mb-4">{post}</Text>

      <hr />

      <HStack mt="-18px">
        {/* Button for like */}
        <Button
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
          onClick={click}
        >
          <FontAwesomeIcon icon={faHeart} color="#0a0a0a" />
          <Text mt="4" ml="3" fontWeight="bold">
            like
          </Text>
        </Button>

        {/* Button for reply */}
        <Button
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
          onClick={click}
        >
          <FontAwesomeIcon icon="fa-solid fa-message" />
          <Text mt="4" ml="3" fontWeight="bold">
            reply
          </Text>
        </Button>

        {/* Button for share */}
        <Button
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
          onClick={click}
        >
          {" "}
          <FontAwesomeIcon icon={faShare} color="#0a0a0a" />
          <Text mt="4" ml="3" fontWeight="bold">
            share
          </Text>
        </Button>
      </HStack>
    </Card>
  );
}

export default Post;
