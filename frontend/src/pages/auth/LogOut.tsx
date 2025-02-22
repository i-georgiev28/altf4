import { useAuth } from "@/provider/authProvider";
import { useNavigate } from "react-router";

const LogOut: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    setToken(null);
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  navigate("/", { replace: true});
  return <></>;
};

export {LogOut};
