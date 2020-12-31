import React, { useState } from "react";
import { authenticationService } from "./Services/AuthenticationService";
import { Button, Container, Form, Col } from "react-bootstrap";
import TokenManagement from "./utils/TokenManagement";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //form submit event. Calls the authentication service to log in using the credentials
  const handleSubmit = (event) => {
    event.preventDefault();

    authenticationService.logIn(email, password).then((data) => {
      if (data) {
        authenticationService.UserInfo().then((data) => {
          TokenManagement.setUserName(data);
          props.history.push({ pathname: "/map", state: { userInfo: data } });
        });
      } else alert("There was an error on you login. Please try again");
    });
  };

  //layout rendering
  return (
    <Container style={{ margin: "auto", "text-align": "center" }}>
      <Col md="12">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>User: </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button as="input" type="submit" value="Submit" />
        </Form>
      </Col>
    </Container>
  );
};

export default Home;
