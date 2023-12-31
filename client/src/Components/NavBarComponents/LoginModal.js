import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ChangePasswordModal from "./ChangePasswordModal";
import "../../css/modal.css";
import { useNavigate } from "react-router-dom";

function LoginModal({ setCurrentUser, currentUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("formBasicEmail").value;
    const password = document.getElementById("formBasicPassword").value;
    const data = {
      email: email,
      password: password,
    };

    fetch("https://group-gamble-d231ef097ad5.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (resp.status === 401) {
          setLoginError(true);
          document.getElementById("formBasicPassword").value = "";
          return Promise.reject("Incorrect Password");
        }
        return resp.json();
      })
      .then((data) => {
        setCurrentUser(data);
        navigate(`/${data.name}/weekly-bets`);
        setShowLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick() {
    setShowLogin(false);
    setShowChangePassword(true);
  }

  return (
    <>
      <Button id="login" onClick={() => setShowLogin(true)}>
        Login
      </Button>
      <Modal centered show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Body>
          <Form id="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" autoFocus />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" />
              {loginError ? (
                <span id="login-error">Incorrect email or password</span>
              ) : null}
            </Form.Group>
            <div id="change-password">
              <span onClick={handleClick}>Change Password?</span>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Login</Button>
        </Modal.Footer>
      </Modal>
      {showChangePassword ? (
        <ChangePasswordModal
          showChangePassword={showChangePassword}
          setShowChangePassword={setShowChangePassword}
          setShowLogin={setShowLogin}
          showLogin={showLogin}
        />
      ) : null}
    </>
  );
}

export default LoginModal;
