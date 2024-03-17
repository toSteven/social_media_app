import { useState, useEffect } from "react"; // Import React hooks for managing state and side effects
import "./Style.css"; // Import CSS file for styling
import Post from "./Post"; // Import Post component
import FriendsComponent from "./FriendsComponent"; // Import FriendsComponent
import { useNavigate, useLocation } from "react-router-dom"; // Import navigation hooks
import {
  Button, // Import Button component from Chakra UI
  Card, // Import Card component from Chakra UI
  Text, // Import Text component from Chakra UI
  Box, // Import Box component from Chakra UI
  FormControl, // Import FormControl component from Chakra UI
  Input, // Import Input component from Chakra UI
  HStack, // Import HStack component from Chakra UI
  Avatar, // Import Avatar component from Chakra UI
  AvatarBadge, // Import AvatarBadge component from Chakra UI
  Spacer, // Import Spacer component from Chakra UI
  Flex,
} from "@chakra-ui/react"; // Import Chakra UI components for UI elements
import firebaseApp from "./FirebaseConfig"; // Import Firebase configuration
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication utilities
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
  onSnapshot,
} from "firebase/firestore"; // Import Firestore utilities
import Swal from "sweetalert2"; // Import SweetAlert2 library for alerts
import { library } from "@fortawesome/fontawesome-svg-core"; // Import Font Awesome library core
import { fas } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome solid icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome icon component

library.add(fas); // Add Font Awesome solid icons to the library

function useQuery() {
  return new URLSearchParams(useLocation().search); // Custom hook to get query parameters from URL
}

function Home() {
  let navigate = useNavigate(); // Get navigation function from routing hooks
  const auth = getAuth(firebaseApp); // Get Firebase authentication instance
  const db = getFirestore(firebaseApp); // Get Firestore instance

  const query = useQuery(); // Get query parameters from URL
  const name = query.get("name"); // Get the 'name' parameter from the query

  const [userProfile, setUserProfile] = useState({ name: name, email: "" }); // State for user profile
  const [post, setPost] = useState(""); // State for new post input
  const [posts, setPosts] = useState([]); // State for posts
  const [buttonLoading, setButtonLoading] = useState(false); // State for button loading status

  useEffect(() => {
    // Effect hook to check authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, update user profile state
        setUserProfile({
          email: user.email,
          name: user.displayName,
        });
      } else {
        // If user is not authenticated, navigate to login page
        navigate("/login");
      }
    });

    // Subscribe to Firestore collection to get posts
    onSnapshot(collection(db, "database"), (snapshot) => {
      setPosts(snapshot.docs.map((data) => data.data()));
    });
  }, []);

  // Function to create a new post
  const createPost = () => {
    setButtonLoading(true); // Set button loading state to true
    if (post !== "") {
      // Check if the post content is not empty
      const postData = {
        post: post,
        email: userProfile.email,
        name: userProfile.name,
        time_stamp: Timestamp.now(),
      };

      // Add new post to Firestore
      addDoc(collection(db, "database"), postData).then(() => {
        setPost(""); // Clear post input
        setButtonLoading(false); // Set button loading state to false
      });
    } else {
      // Show alert if post content is empty
      alert("empty!").then(() => {
        setButtonLoading(false); // Set button loading state to false
      });
    }
  };

  // Function to handle button click event (under development)
  const click = () => {
    Swal.fire({
      title: "Underdevelopment!",
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <>
      {/* Main container */}
      <Box w="100vw" h="100vh" className="main-container">
        {/* Row */}
        <div className="row mt-3">
          {/* Profile Section */}
          <div className="col-lg-3">
            <Box mx="5">
              {/* Profile Card */}
              <Card p={3}>
                <div className="text-center">
                  {/* User avatar*/}
                  <Avatar mt="2" src="./asset/images/avatar.jpg">
                    {/* Avatar status */}
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>

                  {/* User name */}
                  <Text fontWeight="bold" mt="3">
                    {userProfile.name}
                  </Text>
                </div>
                <hr />
                <Card p="3">
                  {/* User details */}
                  <Text fontWeight="bold">Email: {userProfile.email}</Text>
                  <Text fontWeight="bold">Title: Software Engineer</Text>
                  <Text fontWeight="bold">Up Votes: 0</Text>
                </Card>
              </Card>
            </Box>
          </div>

          <div className="col-lg-6">
            {/* Main Section */}
            <Box w="100%">
              {/* Input Section */}
              <Card p="5">
                <FormControl>
                  <HStack direction="row" spacing={5}>
                    {/* User avatar */}
                    <Avatar mt="3">
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>

                    {/* Post input */}
                    <Input
                      mt="3"
                      disabled={buttonLoading}
                      type="text"
                      onChange={(e) => {
                        setPost(e.target.value);
                      }}
                      value={post}
                      placeholder="What's on your mind?"
                    />
                  </HStack>
                </FormControl>

                <HStack color="#1DA1F2">
                  {/* Space text */}
                  <Text className="ms-5 ps-3"></Text>

                  {/* Button for file upload */}
                  <Button onClick={click}>
                    <FontAwesomeIcon
                      icon="fa-solid fa-file"
                      style={{ color: "#e63314" }}
                      size="xl"
                    />
                  </Button>

                  {/* Button for media upload */}
                  <Button onClick={click}>
                    <FontAwesomeIcon
                      icon="fa-solid fa-photo-film"
                      style={{ color: "#63E6BE" }}
                      size="xl"
                    />
                  </Button>

                  {/* Button for status upload */}
                  <Button onClick={click}>
                    <FontAwesomeIcon
                      icon={["fas", "smile"]}
                      style={{ color: "#FFD43B" }}
                      size="xl"
                    />
                  </Button>

                  <Spacer />

                  {/* Button for post */}
                  <Button
                    isLoading={buttonLoading}
                    w="100px"
                    colorScheme="telegram"
                    size="sm"
                    onClick={createPost}
                  >
                    Post
                  </Button>
                </HStack>
              </Card>

              {/* Post Section */}
              <Box>
                {/* Render posts */}
                {posts.map((postRecord, index) => (
                  <Post
                    key={index}
                    post={postRecord.post}
                    name={postRecord.name}
                    time_stamp={postRecord.time_stamp
                      .toDate()
                      .toLocaleTimeString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  />
                ))}
              </Box>
            </Box>
          </div>

          <div className="col-lg-3">
            {/* Friends Component */}
            <FriendsComponent />
          </div>
        </div>
      </Box>
    </>
  );
}

export default Home;
