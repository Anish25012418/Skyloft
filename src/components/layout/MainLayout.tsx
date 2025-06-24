import Navbar from "../Navbar.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <main className="flex-1">
        <Outlet/>
      </main>
    </div>
  );
};

export default MainLayout;