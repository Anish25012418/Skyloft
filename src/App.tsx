import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import HomePage from "./pages/HomePage.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";
import FlightsPage from "./pages/FlightsPage.tsx";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/flights" element={<FlightsPage/>}/>
          </Route>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  )
}

export default App
