import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";

const UserInfo = () => {
  const user = useRecoilValue(userAtom);

  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="mb-1">{user.name}</h4>
      <h6 className="text-muted">{user.role}</h6>
    </div>
  );
};

export default UserInfo;
