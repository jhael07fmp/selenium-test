import { FiLogOut } from "react-icons/fi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { removeActiveUser } = useLocalStorage();

  const navigate = useNavigate();

  const handleClick = () => {
    removeActiveUser();
    navigate("/");
  };

  return (
    <div className="bg-blue-500 w-full p-3 flex justify-between items-center">
      <h2 className="font-semibold text-white border-gray-300 border p-2 rounded-md">
        TESTING APP
      </h2>

      <button className="flex gap-2 text-white items-center mr-4" onClick={handleClick}>
        <FiLogOut className="text-xl" />
        <h3 className="text-white text-sm">Logout</h3>
      </button>
    </div>
  );
};

export default Navbar;
