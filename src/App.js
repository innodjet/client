import React from "react";
import "./App.css";
import Nav from "./page-sections/nav/Nav";
import Footer from "./page-sections/footer/Footer";
import Content from "./page-sections/content/Content";

function App() {
  return (
    <div className="App">
      <Nav />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
