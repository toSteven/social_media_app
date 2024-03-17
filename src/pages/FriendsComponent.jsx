import {
  Box,
  Card,
  Text,
  Avatar,
  AvatarBadge,
  HStack,
  Button,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faReply, faShare } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

function FriendsComponent() {
  const click = () => {
    Swal.fire({
      title: "Underdevelopment!",
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };
  return (
    <Box borderRadius="5">
      <Card p={2}>
        <HStack>
          <h2 className="mt-2" ms-5>
            Active Friends
          </h2>{" "}
          <FontAwesomeIcon
            icon="fa-solid fa-user"
            style={{ color: "#000000" }}
            size="lg"
          />
        </HStack>

        <hr />

        <HStack ml="5" mb="3">
          {/* Button for friend details */}
          <Button
            h="70px"
            variant="ghost"
            style={{ backgroundColor: "transparent" }}
            onClick={click}
          >
            {/* User avatar */}
            <Avatar h="40px" w="40px" src="./asset/images/avatar.jpg">
              {/* User status */}
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>

            {/* User name */}
            <Text ml="5" mt="5" fontWeight="bold">
              Admin
            </Text>
          </Button>
        </HStack>
      </Card>
    </Box>
  );
}
export default FriendsComponent;
