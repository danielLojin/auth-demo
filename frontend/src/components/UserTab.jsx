import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axiosFetch from "../axios/axiosInstance.js";
import toast from "react-hot-toast";
import userAtom from "../atoms/userAtom.js";
import allUsersAtom from "../atoms/allUsersAtom.js";
import UserSearchbar from "./UserSearchbar.jsx";
import UsersList from "./UsersList.jsx";
import Spinner from "./Spinner.jsx";
import { MDBBtn, MDBIcon, MDBInput, MDBTypography } from "mdb-react-ui-kit";
import Modal from "./Modal.jsx";

const UserTab = () => {
  const currentUser = useRecoilValue(userAtom);
  const setUsers = useSetRecoilState(allUsersAtom);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [editInputs, setEditInputs] = useState({
    name: "",
    role: "",
  });
  const [addInputs, setAddInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  });

  const resetInputs = (type) => {
    type === "edit" &&
      setEditInputs({
        name: selectedUser?.name,
        role: selectedUser?.role,
      });
    type === "add" &&
      setAddInputs({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "",
      });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (selectedUser) {
      setEditInputs({
        name: selectedUser?.name,
        role: selectedUser?.role,
      });
    }
  }, [selectedUser]);

  const handleModalToggle = (action) => {
    action === "edit" && setModalEdit(!modalEdit);
    action === "delete" && setModalDelete(!modalDelete);
    action === "add" && setModalAdd(!modalAdd);
  };

  // Fetch employees když se poprvé mounte tab "zaměstnanci", a poté když se změní currentUser nebo setUsers
  useEffect(() => {
    if (currentUser.role !== "admin") return;
    setLoading(true);
    const fetchEmployees = async () => {
      try {
        const res = await axiosFetch(`users/`, {
          method: "GET",
        });

        if (res.data.status === "success") {
          setUsers(res.data.data.employees);
        }
      } catch (error) {
        toast.error(`Něco se pokazilo: ${error.response.data.message}`, {
          style: {
            minWidth: "300px",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [currentUser, setUsers]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <MDBTypography className="text-center mb-4" variant="h1">
            Seznam zaměstnanců
          </MDBTypography>
          <UserSearchbar />
          {currentUser.role === "admin" && (
            <MDBBtn
              className="position-absolute"
              size="lg"
              floating
              style={{ backgroundColor: "#25d366", top: "65px", right: "20px" }}
              onClick={() => handleModalToggle("add")}
            >
              <MDBIcon fab icon="plus" />
            </MDBBtn>
          )}
          <UsersList
            onModalToggle={handleModalToggle}
            onUserSelect={handleUserSelect}
          />

          {/* edit modal */}
          {modalEdit && (
            <Modal
              openModal={modalEdit}
              setOpenModal={setModalEdit}
              onResetInputs={resetInputs}
              type={"edit"}
              user={selectedUser}
              editInputs={editInputs}
              onModalToggle={handleModalToggle}
            >
              <form>
                <div className="mb-3">
                  {modalEdit && (
                    <MDBInput
                      value={editInputs.name}
                      onChange={(e) =>
                        setEditInputs({ ...editInputs, name: e.target.value })
                      }
                      labelClass="col-form-label"
                      label="Jméno:"
                    />
                  )}
                </div>
                <div className="mb-3">
                  {modalEdit && (
                    <MDBInput
                      value={editInputs.role}
                      onChange={(e) =>
                        setEditInputs({ ...editInputs, role: e.target.value })
                      }
                      labelClass="col-form-label"
                      label="Role:"
                    />
                  )}
                </div>
              </form>
            </Modal>
          )}

          {/* delete modal */}
          {modalDelete && (
            <Modal
              openModal={modalDelete}
              setOpenModal={setModalDelete}
              onResetInputs={resetInputs}
              user={selectedUser}
              onModalToggle={handleModalToggle}
              type={"delete"}
            ></Modal>
          )}

          {/* add modal */}
          {modalAdd && (
            <Modal
              openModal={modalAdd}
              setOpenModal={setModalAdd}
              onModalToggle={handleModalToggle}
              onResetInputs={resetInputs}
              addInputs={addInputs}
              type={"add"}
            >
              <form>
                <div className="mb-3">
                  {modalAdd && (
                    <MDBInput
                      value={addInputs.name}
                      onChange={(e) =>
                        setAddInputs({ ...addInputs, name: e.target.value })
                      }
                      labelClass="col-form-label"
                      label="Jméno"
                    />
                  )}
                </div>
                <div className="mb-3">
                  {modalAdd && (
                    <MDBInput
                      value={addInputs.email}
                      onChange={(e) =>
                        setAddInputs({ ...addInputs, email: e.target.value })
                      }
                      labelClass="col-form-label"
                      id="typeEmail"
                      type="email"
                      label="Email"
                    />
                  )}
                </div>
                <div className="mb-3">
                  {modalAdd && (
                    <MDBInput
                      value={addInputs.password}
                      onChange={(e) =>
                        setAddInputs({
                          ...addInputs,
                          password: e.target.value,
                        })
                      }
                      labelClass="col-form-label"
                      id="typePassword"
                      type="password"
                      label="Heslo"
                    />
                  )}
                </div>
                <div className="mb-3">
                  {modalAdd && (
                    <MDBInput
                      value={addInputs.passwordConfirm}
                      onChange={(e) =>
                        setAddInputs({
                          ...addInputs,
                          passwordConfirm: e.target.value,
                        })
                      }
                      labelClass="col-form-label"
                      id="typePasswordConfirm"
                      type="password"
                      label="Heslo znovu"
                    />
                  )}
                </div>
                <div className="mb-3">
                  {modalAdd && (
                    <MDBInput
                      value={addInputs.role}
                      onChange={(e) =>
                        setAddInputs({ ...addInputs, role: e.target.value })
                      }
                      labelClass="col-form-label"
                      label="Role (user, admin)"
                    />
                  )}
                </div>
              </form>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default UserTab;
