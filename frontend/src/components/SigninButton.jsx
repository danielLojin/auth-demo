import { MDBBtn } from "mdb-react-ui-kit";

const SigninButton = ({ children }) => {
  return (
    <MDBBtn type="submit" className="mb-4" block>
      {children}
    </MDBBtn>
  );
};

export default SigninButton;
