/* eslint-disable react/prop-types */
import { Input } from "@material-tailwind/react";

const BasicInput = ({ label, setter, propName, initialState, type = "text" }) => {
  const handleChangeInput = (e, setter, propName, initialState) => {
    setter({ ...initialState, [propName]: e.target.value });
  };

  console.log(initialState);
  return (
    <Input
      type={type}
      label={label}
      color="blue"
      crossOrigin={"true"}
      onChange={(e) => handleChangeInput(e, setter, propName, initialState)}
    />
  );
};

export default BasicInput;
