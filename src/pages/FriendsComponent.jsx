import {
  Box,
  Card,
  Text,
  Avatar,
  AvatarBadge,
  HStack,
  Button,
} from "@chakra-ui/react"; // Import Chakra UI components for styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import { faHeart, faReply, faShare } from "@fortawesome/free-solid-svg-icons"; // Import solid icons from FontAwesome

import Swal from "sweetalert2"; // Import SweetAlert2 library for alerts

function FriendsComponent() {
  const click = () => {
    // Function to handle click events for under development message
    Swal.fire({
      title: "Underdevelopment!",
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <Box borderRadius="5" mr="5">
      {" "}
      {/* Container with rounded corners */}
      <Card p={2}>
        <HStack>
          {" "}
          {/* Horizontal stack for layout */}
          <h2 className="mt-2" ms-5>
            {" "}
            {/* Heading for active friends */}
            Active Friends
          </h2>{" "}
          <FontAwesomeIcon
            icon="fa-solid fa-user" // Icon for active friends
            style={{ color: "#000000" }} // Icon color
            size="lg" // Icon size
          />
        </HStack>
        <hr /> {/* Horizontal line for separation */}
        <HStack ml="5" mb="3">
          {" "}
          {/* Horizontal stack for friend details */}
          {/* Button for friend details */}
          <Button
            h="70px" // Button height
            variant="ghost" // Ghost variant for transparent background
            style={{ backgroundColor: "transparent" }} // Transparent background style
            onClick={click} // Click event handler
          >
            {/* User avatar */}
            <Avatar h="40px" w="40px" src="./asset/images/avatar.jpg">
              {" "}
              {/* Avatar with image */}
              {/* User status */}
              <AvatarBadge boxSize="1.25em" bg="green.500" />{" "}
              {/* Badge for user status */}
            </Avatar>

            {/* User name */}
            <Text ml="5" mt="5" fontWeight="bold">
              {" "}
              {/* Text for user name */}
              John Doe
            </Text>
          </Button>
        </HStack>
      </Card>
    </Box>
  );
}
export default FriendsComponent;
