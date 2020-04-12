import React, { Component } from "react";

import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Jumbotron,
  Table,
} from "react-bootstrap";
const notifier = window.require("node-notifier");
const { ipcRenderer } = window.require("electron");

class App extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    axios
      .get("https://reqres.in/api/users?page=1&delay=2")
      .then((response) => {
        this.setState({
          items: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showUpdateForm = (id) => {
    ipcRenderer.send("updateForm:show", id);
  };

  deleteItem = (userId) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      let putUserUrl = "https://reqres.in/api/users/" + userId;
      axios
        .delete(putUserUrl)
        .then(() => {
          this.showSuccessDeletedMessage();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  showSuccessDeletedMessage = () => {
    notifier.notify({
      title: "Success!",
      message: "Saved Your Information Successfully.",
      sound: true,
      icon: "Terminal Icon",
      timeout: 5,
    });
  };

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Hi,</h1>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        width={128}
                        height={128}
                        className="mr-3"
                        src={item.avatar}
                        alt={
                          item.first_name + " " + item.last_name + "'s Avatar"
                        }
                      />
                    </td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>
                      <ButtonGroup size="lg" className="mb-2">
                        <Button onClick={() => this.showUpdateForm(item.id)}>
                          Update
                        </Button>
                        <Button
                          onClick={(e) => {
                            this.deleteItem(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
