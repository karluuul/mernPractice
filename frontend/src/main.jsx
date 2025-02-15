import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";  // Import ThemeProvider from next-themes

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class">  {/* Wrap the app with ThemeProvider */}
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
