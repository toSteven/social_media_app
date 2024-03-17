import { Card, Text, Avatar, HStack, Spacer, Button } from "@chakra-ui/react"; // Import Chakra UI components for styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import { faHeart, faReply, faShare } from "@fortawesome/free-solid-svg-icons"; // Import solid icons from FontAwesome

import Swal from "sweetalert2"; // Import SweetAlert2 library for alerts

function Post({ post, name, time_stamp }) {
  const click = () => {
    // Function to handle click events for under development message
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

        {/* Text for setting under development */}
        <Text>...</Text>
      </HStack>

      {/* Timestamp */}
      <Text fontSize="xs" color="gray" ml="10" mt="-5" pl="2">
        {time_stamp}
      </Text>

      <hr />

      {/* Post content */}
      <Text className="ms-2 p-3 mb-4">{post}</Text>

      <hr />

      <HStack mt="-18px">
        <Spacer />

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
          <FontAwesomeIcon icon={faReply} />
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
          <FontAwesomeIcon icon={faShare} color="#0a0a0a" />
          <Text mt="4" ml="3" fontWeight="bold">
            share
          </Text>
        </Button>

        <Spacer />
      </HStack>
    </Card>
  );
}

export default Post;
