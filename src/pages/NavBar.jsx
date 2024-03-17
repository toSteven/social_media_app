import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import firebaseApp from "./FirebaseConfig";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

library.add(fas);

function NavBar() {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const logout = () => {
    Swal.fire({
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
          navigate("/login");
        });
      }
    });
  };

  const click = () => {
    Swal.fire({
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
        style={{
          width: "100%",
          zIndex: 1000,
          position: "sticky",
        }}
      >
        <div className="container-fluid">
          <h1 className="navbar-brand text-white">DevTalk</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
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
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={click}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-message"
                    style={{ color: "#fafafa" }}
                  />
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={click}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    style={{ color: "#fafafa" }}
                  />
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#" onClick={click}>
                  <FontAwesomeIcon
                    icon={["fas", "circle-info"]}
                    style={{ color: "#f5f5f5" }}
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={click}>
                  <FontAwesomeIcon
                    icon={["fas", "gear"]}
                    style={{ color: "#ffffff" }}
                  />
                </a>
              </li>
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

export default NavBar;
