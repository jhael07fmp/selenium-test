import BasicInput from "./BasicInput";

export const InputGroup = ({ inputs }) => {
  return inputs?.map(({ initialState, label, propName, setter, type, id }, i) => (
    <div key={i}>
      <BasicInput
        initialState={initialState}
        label={label}
        propName={propName}
        setter={setter}
        type={type}
        id={id}
      />
    </div>
  ));
};
