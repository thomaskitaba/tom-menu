import {
  Nav,
  Navbar,
  Container,
  Button,
  Image,
  Dropdown,
  NavDropdown,
  Col,
  Row,
} from "react-bootstrap";

export default function Navigation() {
  return (
    <header>
      <Container>
        <Navbar variant="light" expand="md">
          <Navbar.Brand className="pt-3">
            <a href="/">
              <Image
                src="/logo-ipsum.png"
                alt="Grouparoo Logo"
                width={150}
                height={80}
              />
            </a>
            <span className="d-none">Company</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mt-2">
              <NavDropdown
                className="pr-2 py-2 align-text-top"
                title="Events"
                id="basic-nav-dropdown"
              >
                <Container className="eventsNav pt-0 mt-0">
                  <Row>
                    <Col xs="12" md="6" className="text-left">
                      <Dropdown.Header>
                        <span role="img" aria-label="catering" className="pr-1">🍽️</span>
                        {"  "}
                        Catering
                      </Dropdown.Header>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          Corporate
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          Private
                        </a>
                      </Dropdown.Item>

                      <Dropdown.Divider />
                      <Dropdown.Header>
                        <span role="img" aria-label="classes" className="pr-1">👨‍🏫</span>
                        {"  "}
                        Classes
                      </Dropdown.Header>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          Barista 101
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          History of Coffee
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          Intro to Cafe Snobbery
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Divider className="d-md-none" />
                    </Col>

                    <Col xs="12" md="6" className="text-left">
                      <Dropdown.Header>
                        <span role="img" aria-label="rentals" className="pr-1">🏢</span>
                        {"  "}
                        Rentals
                      </Dropdown.Header>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          Fireside Room
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          Roasting Room
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>
                        <span role="img" aria-label="seasonal" className="pr-1">🌞</span>
                        {"  "}
                        Seasonal
                      </Dropdown.Header>
                      <Dropdown.Item href="/">
                        <a className="nav-link" role="button">
                          Coldbrew Night
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <a className="nav-link text-wrap" role="button">
                          Campfire Coffee Class
                        </a>
                      </Dropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </NavDropdown>

              <Nav.Link href="/menu">
                <a className="nav-link" role="button">
                  Menu
                </a>
              </Nav.Link>
              <Nav.Link href="/pricing">
                <a className="nav-link" role="button">
                  Pricing
                </a>
              </Nav.Link>
              <Nav.Link href="/blog">
                <a className="nav-link" role="button">
                  Blog
                </a>
              </Nav.Link>
              <Nav.Link href="/community">
                <a className="nav-link d-md-none d-lg-block" role="button">
                  Community
                </a>
              </Nav.Link>
            </Nav>
            <a
              href="https://github.com/grouparoo/grouparoo"
              target="_blank"
              rel="noreferrer"
              className="col-sm-12 d-md-none d-lg-inline-block col-lg-1 p-0 mx-lg-1 mx-0 mt-2"
            >
              <Button variant="outline-dark" size="sm" className="w-100">
                ⭐ Star
              </Button>
            </a>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
}
