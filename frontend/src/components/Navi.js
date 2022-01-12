import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * This component uses react-bootstrap librarys Navbar to render a responsive navigation bar for the application.
 * @returns {Navbar} Navigation bar with responsive behaviour.
 */

const Navi = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      className="Navi"
      variant="dark"
      sticky="top"
      expand="md"
      expanded={expanded}
    >
      <Navbar.Brand as={Link} to="/">
        Opi Englantia!
      </Navbar.Brand>
      <Navbar.Toggle
        className="Toggle"
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(expanded ? false : "expanded")}
      />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Container className="Links">
          <Nav className="col justify-content-center">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Koti
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/settings"
              onClick={() => setExpanded(false)}
            >
              Asetukset
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>
              Info
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navi;
