import ContainerSession from "../../components/Session/ContainerSession";
import SessionCard from "../../components/Session/SessionCard";
import { InputGroup } from "../../components/inputs/InputGroup";
import { useRegister } from "./hooks/useRegister";

const Register = () => {
  const { handleOnSubmit, inputs } = useRegister();

  return (
    <ContainerSession>
      <SessionCard
        formButtonTitle="Sign up"
        title="Sign up"
        titleInfoBellowButton="If you have an account login here"
        path="/"
        onSubmit={handleOnSubmit}
      >
        <InputGroup inputs={inputs} />
      </SessionCard>
    </ContainerSession>
  );
};

export default Register;
