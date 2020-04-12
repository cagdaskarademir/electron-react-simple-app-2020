import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Col,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import axios from "axios";

const { ipcRenderer } = window.require("electron");
const notifier = window.require("node-notifier");

class UpdateForm extends Component {
  state = {
    showAlert: false,
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
  };

  componentDidMount() {
    console.log("Did Mount");

    // Listen "send-user-id" from ipcMain (main.js)
    ipcRenderer.on("updateForm:send-user-id", (event, args) => {
      console.log("Fired User Id In UpdateForm", args);
      let userId = args.userId;
      this.setState({
        id: userId,
      });

      this.loadFormByUserId(userId);
    });
  }

  loadFormByUserId = (userId) => {
    let getUserUrl = "https://reqres.in/api/users/" + userId;
    axios
      .get(getUserUrl)
      .then((response) => {
        console.log("UpdateForm Get User", response);

        var data = response.data.data;
        this.setState({
          id: userId,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveForm = () => {
    let userId = this.state.id;
    let first_name = this.state.first_name;

    let putUserUrl = "https://reqres.in/api/users/" + userId;

    axios
      .put(putUserUrl, { name: first_name })
      .then((response) => {
        console.log(response);
        this.showSuccessMessage();
        this.closeForm(3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showSuccessMessage = () => {
    notifier.notify({
      title: "Success!",
      message: "Saved Your Information Successfully.",
      sound: true,
      icon: "Terminal Icon",
      timeout: 5,
    });
  };

  closeForm = (interval) => {
    if (interval == null) {
      interval = 0;
    }
    console.log("Triggered Update Form Close");

    setTimeout(() => {
      ipcRenderer.send("updateForm:close");
    }, interval);
  };

  updateFormFields = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Update first name"
                  name="first_name"
                  value={this.state.first_name || ""}
                  onChange={this.updateFormFields}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Update last name"
                  name="last_name"
                  value={this.state.last_name || ""}
                  onChange={this.updateFormFields}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.email}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formAction"
                className="float-right"
              >
                <Col>
                  <ButtonGroup className="mb-2 text-right">
                    <Button variant="primary" onClick={() => this.saveForm()}>
                      Submit
                    </Button>
                    <Button variant="danger" onClick={() => this.closeForm()}>
                      Close
                    </Button>
                  </ButtonGroup>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UpdateForm;
