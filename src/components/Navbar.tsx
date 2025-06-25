import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="h-16 w-full flex items-center shadow-sm bg-black">
      <img src="/logo.png" alt="logo" className="w-50 pl-2 cursor-pointer" onClick={() => navigate("/")}/>
    </nav>
  );
};

export default Navbar;