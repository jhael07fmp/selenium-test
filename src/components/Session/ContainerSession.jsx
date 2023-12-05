/* eslint-disable react/prop-types */
const ContainerSession = (props) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-600">
      {props.children}
    </div>
  );
};

export default ContainerSession;
