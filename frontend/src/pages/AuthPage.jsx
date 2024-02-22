import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
} from "mdb-react-ui-kit";
import SigninCard from "../components/SigninCard.jsx";
import SigninButton from "../components/SigninButton.jsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosFetch from "../axios/axiosInstance.js";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.js";

const AuthPage = () => {
  const [loginRegisterActive, setLoginRegisterActive] = useState("login");
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const [registerInputs, setRegisterInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const setUser = useSetRecoilState(userAtom);

  const handleUserAuth = (u) => {
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const handleLoginRegisterClick = (state) => {
    state === "login"
      ? setLoginRegisterActive("login")
      : setLoginRegisterActive("register");
  };

  useEffect(() => {
    loginRegisterActive === "register"
      ? setLoginInputs({ email: "", password: "" })
      : setRegisterInputs({
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
  }, [loginRegisterActive]);

  const handleLoginRegisterSubmit = async (e, action) => {
    e.preventDefault();
    try {
      const res = await axiosFetch(`users/${action}`, {
        method: "POST",
        data: action === "login" ? { ...loginInputs } : { ...registerInputs },
      });

      if (res.data.status === "success") {
        toast.success(
          `Úspěšně ${action === "login" ? "přihlášeno" : "registrováno"}!`
        );
        const { user } = res.data.data;

        handleUserAuth(user);
      }
    } catch (error) {
      toast.error(
        `Nepodařilo se ${action === "login" ? "přihlásit" : "registrovat"}: ${
          error.response.data.message
        }`,
        {
          style: {
            minWidth: "300px",
          },
        }
      );
    }
  };

  return (
    <MDBContainer
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column justify-content-center"
    >
      <MDBRow className="" style={{ marginTop: "-300px" }}>
        <MDBCol
          className="p-5 shadow-6 rounded-7"
          style={{ margin: "0 auto", maxWidth: "450px" }}
        >
          <>
            <MDBTabs pills justify className="mb-3">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleLoginRegisterClick("login")}
                  active={loginRegisterActive === "login"}
                >
                  Přihlášení
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleLoginRegisterClick("register")}
                  active={loginRegisterActive === "register"}
                >
                  Registrace
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent className="mt-5">
              {loginRegisterActive === "login" ? (
                <SigninCard
                  open={true}
                  onLoginRegisterHandle={handleLoginRegisterSubmit}
                  action={"login"}
                >
                  <MDBInput
                    value={loginInputs.email}
                    onChange={(e) =>
                      setLoginInputs({ ...loginInputs, email: e.target.value })
                    }
                    className="mb-4"
                    type="email"
                    id="form7Example1"
                    label="Emailová adresa"
                    required
                  />
                  <MDBInput
                    value={loginInputs.password}
                    onChange={(e) =>
                      setLoginInputs({
                        ...loginInputs,
                        password: e.target.value,
                      })
                    }
                    className="mb-4"
                    type="password"
                    id="form7Example2"
                    label="Heslo"
                    required
                  />
                  <SigninButton>Přihlásit</SigninButton>
                </SigninCard>
              ) : (
                <SigninCard
                  open={true}
                  onLoginRegisterHandle={handleLoginRegisterSubmit}
                  action={"signup"}
                >
                  <MDBInput
                    value={registerInputs.name}
                    onChange={(e) =>
                      setRegisterInputs({
                        ...registerInputs,
                        name: e.target.value,
                      })
                    }
                    className="mb-4"
                    id="form8Example1"
                    label="Jméno"
                    required
                  />
                  <MDBInput
                    value={registerInputs.email}
                    onChange={(e) =>
                      setRegisterInputs({
                        ...registerInputs,
                        email: e.target.value,
                      })
                    }
                    className="mb-4"
                    type="email"
                    id="form8Example3"
                    label="Emailová adresa"
                    required
                  />
                  <MDBInput
                    value={registerInputs.password}
                    onChange={(e) =>
                      setRegisterInputs({
                        ...registerInputs,
                        password: e.target.value,
                      })
                    }
                    className="mb-4"
                    type="password"
                    id="form8Example4"
                    label="Heslo"
                    required
                  />
                  <MDBInput
                    value={registerInputs.passwordConfirm}
                    onChange={(e) =>
                      setRegisterInputs({
                        ...registerInputs,
                        passwordConfirm: e.target.value,
                      })
                    }
                    className="mb-4"
                    type="password"
                    id="form8Example5"
                    label="Potvrzení hesla"
                    required
                  />
                  <SigninButton>Registrovat</SigninButton>
                </SigninCard>
              )}
            </MDBTabsContent>
          </>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AuthPage;
