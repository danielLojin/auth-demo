import { MDBBtn, MDBListGroupItem } from "mdb-react-ui-kit";

const UserListItem = ({ user, onModalToggle, onUserSelect }) => {
  return (
    <>
      <MDBListGroupItem
        noBorders
        className="d-flex justify-content-between hover-shadow rounded-5 mb-3 p-3"
      >
        <div>
          <h5>{user.name}</h5>
          <p className="text-muted mb-0">{user.role}</p>
          <p className="text-muted mb-0">další info...</p>
        </div>
        <div className="d-flex flex-column justify-content-end gap-2">
          <MDBBtn
            className="me-1"
            color="warning"
            onClick={() => {
              onModalToggle("edit");
              onUserSelect(user);
            }}
          >
            Upravit
          </MDBBtn>
          <MDBBtn
            className="me-1"
            color="danger"
            onClick={() => {
              onModalToggle("delete");
              onUserSelect(user);
            }}
          >
            Smazat
          </MDBBtn>
        </div>
      </MDBListGroupItem>
    </>
  );
};

export default UserListItem;
