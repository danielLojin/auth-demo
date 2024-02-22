import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import SpinnerButton from "./SpinnerButton.jsx";
import axiosFetch from "../axios/axiosInstance.js";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import allUsersAtom from "../atoms/allUsersAtom.js";
import userAtom from "../atoms/userAtom.js";
import { useState } from "react";

const Modal = ({
  openModal,
  setOpenModal,
  children,
  onResetInputs,
  type,
  user,
  onModalToggle,
  editInputs,
  addInputs,
}) => {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [users, setUsers] = useRecoilState(allUsersAtom);
  const [loading, setLoading] = useState(false);

  const displayText = (type) => {
    if (type === "edit") {
      return {
        title: "Upravit informace o uživateli",
        buttonText: "Uložit změny",
      };
    } else if (type === "delete") {
      return {
        title: "Opravdu chcete smazat uživatele?",
        buttonText: "Smazat",
      };
    } else if (type === "add") {
      return { title: "Zadejte nového uživatele", buttonText: "Vytvořit" };
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosFetch(`users/${user._id}`, {
        method: "PATCH",
        data: editInputs,
      });
      if (res.data.status === "success") {
        setUsers(
          users.map((u) => (u._id === user._id ? res.data.data.user : u))
        );

        if (currentUser._id === user._id) {
          setCurrentUser(res.data.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }

        toast.success(`Uživatel úspěšně změněn!`);
      }
    } catch (error) {
      toast.error(`Něco se pokazilo: ${error.response.data.message}`, {
        style: {
          minWidth: "300px",
        },
      });
    } finally {
      onModalToggle("edit");
      setLoading(false);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentUser._id === user._id) {
        throw new Error("Nemůžete vymazat sami sebe!");
      }

      const res = await axiosFetch(`users/${user._id}`, { method: "DELETE" });

      if (res.status === 204) {
        setUsers(users.filter((u) => u._id !== user._id));
        toast.success(`Uživatel úspěšně smazán!`);
      }
    } catch (error) {
      toast.error(`Něco se pokazilo: ${error.response?.data.message || error}`, {
        style: {
          minWidth: "300px",
        },
      });
    } finally {
      onModalToggle("delete");
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosFetch(`users/`, {
        method: "POST",
        data: addInputs,
      });

      if (res.data.status === "success") {
        setUsers([...users, res.data.data.user]);
        toast.success(`Uživatel úspěšně vytvořen!`);
      }
    } catch (error) {
      toast.error(`Něco se pokazilo: ${error.response.data.message}`, {
        style: {
          minWidth: "300px",
        },
      });
    } finally {
      onModalToggle("add");
      onResetInputs(type)
      setLoading(false);
    }
  };

  const handleEvents = (type, e) => {
    type === "edit" && handleEditUser(e);
    type === "delete" && handleDeleteUser(e);
    type === "add" && handleCreateUser(e);
  };

  return (
    <MDBModal open={openModal} setOpen={setOpenModal} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{displayText(type).title}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => {
                setOpenModal(!openModal);
                onResetInputs(type);
              }}
            ></MDBBtn>
          </MDBModalHeader>

          <MDBModalBody className={type === "delete" && "p-0"}>
            {children}
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => {
                setOpenModal(!openModal);
                onResetInputs(type);
              }}
            >
              Zavřít
            </MDBBtn>
            {loading && (
              <SpinnerButton color={type === "delete" ? "danger" : ""} />
            )}
            {!loading && (
              <MDBBtn
                onClick={(e) => handleEvents(type, e)}
                color={type === "delete" ? "danger" : ""}
              >
                {displayText(type).buttonText}
              </MDBBtn>
            )}
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default Modal;
