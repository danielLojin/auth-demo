import { MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";
import { useRecoilState } from "recoil";
import navbarAtom from "../atoms/navbarAtom.js";

const Navbar = () => {
  const [basicActive, setBasicActive] = useRecoilState(navbarAtom);

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <MDBTabs
        pills
        className="mb-md-4 mb-2 ml-0 d-flex flex-column justify-content-center text-center w-100"
        style={{ marginLeft: "0px" }}
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("zamestnanci")}
            active={basicActive === "zamestnanci"}
            className="mb-0"
          >
            zaměstnanci
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("nocontent")}
            active={basicActive === "nocontent"}
            className="mb-0"
          >
            No Content
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
    </>
  );
};

export default Navbar;
