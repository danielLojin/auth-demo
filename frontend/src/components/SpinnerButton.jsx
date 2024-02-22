import { MDBSpinner, MDBBtn } from "mdb-react-ui-kit";

const SpinnerButton = ({ color }) => {
  return (
    <MDBBtn disabled color={color}>
      <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
      Loading...
    </MDBBtn>
  );
};

export default SpinnerButton;
