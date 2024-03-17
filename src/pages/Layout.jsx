import { Outlet } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import NarBar from "./NavBar";

function Layout() {
  return (
    <ChakraProvider>
      <NarBar />
      <div>
        <Outlet />
      </div>
    </ChakraProvider>
  );
}

export default Layout;
