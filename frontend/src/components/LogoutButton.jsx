import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import toast from "react-hot-toast";

const LogoutButton = ({ onUserLogout }) => {
  const handleLogout = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/users/logout",
      });

      if (res.data.status === "success") {
        onUserLogout();
        toast.success("Úspěšně odhlášen!");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          minWidth: "300px",
        },
      });
    }
  };
  return (
    <MDBBtn onClick={handleLogout} rounded className="mx-2" color="danger">
      Odhlásit se
    </MDBBtn>
  );
};

export default LogoutButton;
