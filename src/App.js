import React from 'react';
import Routes from "./routes";
import GlobalStyles from "./globalStyle";
import { AuthProvider } from "./contexts/auth";

function App() {

  return (
    <AuthProvider>
      <>
        <GlobalStyles /> 
        <Routes />
      </>
    </AuthProvider>
  );
}

export default App;
