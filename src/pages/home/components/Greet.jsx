/* eslint-disable react/prop-types */
export const Greet = ({ greet, time }) => (
  <h1 className="text-2xl flex gap-2 items-center ">
    {time ? "Good Afternoon" : "Good Morning"}
    <span className="home_greeting">{greet}</span>
  </h1>
);
