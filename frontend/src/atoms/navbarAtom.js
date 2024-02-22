import { atom } from "recoil";

const navbarAtom = atom({
  key: "navbarAtom",
  default: "zamestnanci",
});

export default navbarAtom;
