import { MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import { useRecoilValue } from "recoil";
import navbarAtom from "../atoms/navbarAtom.js";
import UserTab from "./UserTab.jsx";

const MainContent = () => {
  const basicActive = useRecoilValue(navbarAtom);

  return (
    <>
      <MDBTabsContent>
        <MDBTabsPane
          className="position-relative"
          open={basicActive === "zamestnanci"}
        >
          <UserTab />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default MainContent;
