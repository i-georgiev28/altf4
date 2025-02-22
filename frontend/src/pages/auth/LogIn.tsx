import { useAuth } from "@/provider/authProvider";
import { useNavigate } from "react-router";

interface LogInProps{
  email: string;
  password: string;
}

const LogIn = ({email, password}: LogInProps) => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  console.log(email);
  console.log(password);
  const handleLogin = () => {
    setToken("0");
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogin();
  }, 3 * 1000);

  navigate("/", { replace: true});
  return <></>;
};

export {LogIn};