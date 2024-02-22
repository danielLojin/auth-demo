import { MDBTabsPane } from "mdb-react-ui-kit";

const SigninCard = ({ children, open, onLoginRegisterHandle, action }) => {
  return (
    <MDBTabsPane open={open}>
      <form onSubmit={(e) => onLoginRegisterHandle(e, action)}>{children}</form>
    </MDBTabsPane>
  );
};

export default SigninCard;
