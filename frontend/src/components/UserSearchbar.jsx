import { MDBInput } from "mdb-react-ui-kit";
import { useRecoilState } from "recoil";
import searchAtom from "../atoms/searchAtom.js";

const UserSearchbar = () => {
  const [search, setSearch] = useRecoilState(searchAtom);

  return (
    <div className="mx-auto w-50 mb-4">
      <MDBInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        label="Jméno uživatele"
        id="controlledValue"
        type="text"
      />
    </div>
  );
};

export default UserSearchbar;
