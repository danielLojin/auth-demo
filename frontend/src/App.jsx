import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import userAtom from "./atoms/userAtom.js";

const App = () => {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
