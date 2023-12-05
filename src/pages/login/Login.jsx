import SessionCard from "../../components/Session/SessionCard";
import ContainerSession from "../../components/Session/ContainerSession";
import { useLogin } from "./hooks/useLogin";
import { InputGroup } from "../../components/inputs/InputGroup";
import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { inputs, handleSubmit } = useLogin();
  const { activeUser } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser) navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  return (
    <ContainerSession>
      <SessionCard
        title={"Login"}
        formButtonTitle={"Login"}
        titleInfoBellowButton={"If you don't have an account Sign up here"}
        path="/register"
        onSubmit={handleSubmit}
      >
        <InputGroup inputs={inputs} />
      </SessionCard>
    </ContainerSession>
  );
};

export default Login;
