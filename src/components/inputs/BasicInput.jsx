/* eslint-disable react/prop-types */
// import { Input } from "@material-tailwind/react";

const BasicInput = ({
  label,
  setter,
  propName,
  initialState,
  type = "text",
  id,
}) => {
  const handleChangeInput = (e, setter, propName, initialState) => {
    setter({ ...initialState, [propName]: e.target.value });
  };

  return (
    <div>
      <label className="text-gray-700">{label}</label>
      <input
        className="border rounded-md border-gray-400 w-full p-1.5 focus:outline-blue-500 hover:border-gray-400 hover:bg-gray-50"
        id={id}
        type={type}
        onChange={(e) => handleChangeInput(e, setter, propName, initialState)}
      />
    </div>
  );
};

export default BasicInput;
