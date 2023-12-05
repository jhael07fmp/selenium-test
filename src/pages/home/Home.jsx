import Navbar from "../../components/navbar/Navbar";
import "./index.css";
import { Greet } from "./components/Greet";
import { useHome } from "./hooks/useHome";

const Home = () => {
  const { greet, time } = useHome();

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="home__container">
        {/* this component greets the user */}
        <Greet greet={greet} time={time} />

        {/* Image with selenium */}
        <div className="w-11/12 mx-auto mt-4  flex justify-center">
          <img src="https://res.cloudinary.com/damien1/blog/selenium_logo.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
