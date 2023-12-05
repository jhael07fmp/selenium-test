/* eslint-disable react/prop-types */
import { Input } from "@material-tailwind/react";

const BasicInput = ({ label, setter, propName, initialState, type = "text", id }) => {
  const handleChangeInput = (e, setter, propName, initialState) => {
    setter({ ...initialState, [propName]: e.target.value });
  };

  return (
    <Input
      id={id}
      type={type}
      label={label}
      color="blue"
      crossOrigin={"true"}
      onChange={(e) => handleChangeInput(e, setter, propName, initialState)}
    />
  );
};

export default BasicInput;
