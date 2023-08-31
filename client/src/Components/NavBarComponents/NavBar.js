import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import NewUserModal from "./NewUserModal";

function NavBar({ currentUser, setCurrentUser, week }) {
  //   const navigate = useNavigate();

  function handleLogout() {
    fetch("/api/logout", {
      method: "POST",
    });
    setCurrentUser({});
    localStorage.clear();
  }

  return (
    <>
      <Navbar>
        <Container>
          <Nav className="me-auto">
            <Nav.Link id="home">Home</Nav.Link>
            {currentUser.name !== null && currentUser.name === "dev" ? (
              <Nav.Link id="allBets">Week {week} Bets (Dev)</Nav.Link>
            ) : (
              <Nav.Link id="userBets">
                {currentUser.name
                  ? `${currentUser.name}'s Bets`
                  : "Player Bets"}
              </Nav.Link>
            )}
            <Nav.Link id="allUserBets">All Player Bets</Nav.Link>
            <Nav.Link id="pastBets">Past Bets</Nav.Link>
          </Nav>
          <Nav>
            {currentUser.name ? (
              <>
                <Navbar.Text id="welcome">
                  {" "}
                  Welcome, {currentUser.name}!
                </Navbar.Text>
              </>
            ) : (
              <LoginModal id="login" setCurrentUser={setCurrentUser} />
            )}
            {currentUser.name === "dev" ? <NewUserModal /> : null}
            {currentUser.name ? (
              <button id="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
