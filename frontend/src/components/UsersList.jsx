import { MDBListGroup } from "mdb-react-ui-kit";
import UserListItem from "./UserListItem.jsx";
import { useRecoilValue } from "recoil";
import allUsersAtom from "../atoms/allUsersAtom.js";
import searchAtom from "../atoms/searchAtom.js";

const UsersList = ({ onUserSelect, onModalToggle }) => {
  const users = useRecoilValue(allUsersAtom);
  const search = useRecoilValue(searchAtom);

  return (
    <>
      <MDBListGroup className="">
        {users
          .filter((user) =>
            search.toLowerCase() === ""
              ? user
              : user.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              onModalToggle={onModalToggle}
              onUserSelect={onUserSelect}
            />
          ))}
      </MDBListGroup>
    </>
  );
};

export default UsersList;
