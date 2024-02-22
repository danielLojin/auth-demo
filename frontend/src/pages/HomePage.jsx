import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import LogoutButton from "../components/LogoutButton.jsx";
import UserInfo from "../components/UserInfo.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import MainContent from "../components/MainContent.jsx";
import userAtom from "../atoms/userAtom.js";
import allUsersAtom from "../atoms/allUsersAtom.js";
import navbarAtom from "../atoms/navbarAtom.js";
import { useSetRecoilState } from "recoil";

const HomePage = () => {
  const setUser = useSetRecoilState(userAtom);
  const setAllUsers = useSetRecoilState(allUsersAtom);
  const setNavbar = useSetRecoilState(navbarAtom);

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAllUsers([]);
    setNavbar("zamestnanci");
  };

  return (
    <MDBContainer style={{ minHeight: "100vh" }} className="d-flex flex-column">
      <MDBRow className="pb-5" style={{ gap: "20px", marginTop: "130px" }}>
        {/* Sidebar */}
        <MDBCol
          md={3}
          xl={2}
          className="py-4 shadow-6 rounded-5 align-self-start sticky-md-top"
        >
          <Sidebar>
            <UserInfo />
            <Navbar />
            <LogoutButton onUserLogout={handleUserLogout} />
          </Sidebar>
        </MDBCol>

        {/* Main content */}
        <MDBCol md={8} xl={9} className="p-3 shadow-6 rounded-5">
          <MainContent />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default HomePage;
