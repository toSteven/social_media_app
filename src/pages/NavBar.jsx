import { useNavigate } from "react-router-dom"; // Importing necessary hooks and components from React and React Router
import { useState, useEffect } from "react";

import firebaseApp from "./FirebaseConfig"; // Importing Firebase configuration for authentication
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth"; // Importing Firebase authentication functions

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesome icons for UI
import { library } from "@fortawesome/fontawesome-svg-core"; // Importing FontAwesome library for icon management
import { fas } from "@fortawesome/free-solid-svg-icons"; // Importing specific FontAwesome icon styles

import Swal from "sweetalert2"; // Importing SweetAlert2 for modal dialogs

library.add(fas); // Adding FontAwesome icons to the library

function NavBar() {
  const auth = getAuth(firebaseApp); // Initializing Firebase authentication
  const navigate = useNavigate(); // Using useNavigate hook for navigation
  const [userLoggedIn, setUserLoggedIn] = useState(false); // State for tracking user login status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true); // Update state if user is logged in
      } else {
        setUserLoggedIn(false); // Update state if user is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from auth state changes
  }, [auth]);

  const logout = () => {
    Swal.fire({
      // Show confirmation dialog using SweetAlert2
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          // Sign out user on confirmation
          navigate("/login"); // Redirect to login page after logout
        });
      }
    });
  };

  const click = () => {
    Swal.fire({
      // Placeholder function for underdevelopment message
      title: "Underdevelopment!",
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  if (!userLoggedIn) {
    return null; // Don't render the NavBar if the user is not logged in
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg nav-bar"
        style={{ width: "100%", zIndex: 1000, position: "sticky" }}
      >
        <div className="container-fluid">
          <h1 className="navbar-brand text-white">DevTalk</h1>{" "}
          {/* Navbar title */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>{" "}
            {/* Navbar toggle button icon */}
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              {/* Navbar links with FontAwesome icons */}
              <li className="nav-item">
                {/* Home */}
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={click}
                >
                  <FontAwesomeIcon
                    icon={["fas", "house"]}
                    style={{ color: "#fafafa" }}
                  />
                </a>
              </li>

              <li className="nav-item">
                {/* Messages */}
                <a className="nav-link" href="#" onClick={click}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-message"
                    style={{ color: "#fafafa" }}
                  />
                </a>
              </li>
              <li className="nav-item">
                {/* Profile */}
                <a className="nav-link" href="#" onClick={click}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    style={{ color: "#fafafa" }}
                  />
                </a>
              </li>
              <li className="nav-item">
                {/* About */}
                <a className="nav-link" href="#" onClick={click}>
                  <FontAwesomeIcon
                    icon={["fas", "circle-info"]}
                    style={{ color: "#f5f5f5" }}
                  />
                </a>
              </li>
              <li className="nav-item">
                {/* Settings */}
                <a className="nav-link" href="#" onClick={click}>
                  <FontAwesomeIcon
                    icon={["fas", "gear"]}
                    style={{ color: "#ffffff" }}
                  />
                </a>
              </li>
              {/* Logout button */}
              <li className="nav-item">
                <a className="nav-link text-white" onClick={logout}>
                  <FontAwesomeIcon
                    icon={["fas", "right-from-bracket"]}
                    style={{ color: "#ffffff" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar; // Exporting the NavBar component
