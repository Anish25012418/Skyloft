import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import HomePage from "./pages/HomePage.tsx";
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  )
}

export default App
