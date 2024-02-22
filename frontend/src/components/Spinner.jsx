import { MDBSpinner } from "mdb-react-ui-kit";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <MDBSpinner color="primary" style={{ width: "2.5rem", height: "2.5rem" }}>
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Spinner;
