import Navbar from "./components/Navbar";
import './style.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import  { Home, Contact } from "./pages";

const App = () => {
  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
