import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

import img from '../../assets/images/contact-img.png'

export class TodoForm extends Component {



  render() {
    const { todo, handleTodo, submit, selected, nameRef, validated } =
      this.props;
    // const submit = (e) => {
    //   e.preventDefault();
    //   console.log(e.target);
    //   console.log(e.target.name);
    //   console.log(e.target.date.value);
    //   console.log(e.target.importance);
    // };
    return (
      <Form
        validated={validated}
        noValidate
        onSubmit={submit}
        className="w-50 m-auto"
      >
        <img src={img} alt="img" style={{width: '200px', display: 'block', margin: '0 auto'}} />
        <Form.Group className="mb-3" controlId="name">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
            Name
            </InputGroup.Text>
            <Form.Control
              aria-label="Name"
              aria-describedby="inputGroup-sizing-default"
              
              ref={nameRef}
              onChange={handleTodo}
              value={todo.name}
              required
              type="text"
            />
          </InputGroup>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please fill !
          </Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="date">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
            Teel:
            </InputGroup.Text>
            <Form.Control
              aria-label="phone"
              aria-describedby="inputGroup-sizing-default"
              
              onChange={handleTodo}
              value={todo.date}
              required
              type="tel"
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="categories">
          <Form.Label>Categories</Form.Label>
          <Form.Select onChange={handleTodo} value={todo.categories}>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="Work">Work</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="w-100">
          {selected === null ? "Add" : "Save"} contact
        </Button>
      </Form>
    );
  }
}

export default TodoForm