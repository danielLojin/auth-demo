import { atom } from "recoil";

const allUsersAtom = atom({
  key: "allUsersAtom",
  default: [],
});

export default allUsersAtom;
