import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";

export class TodoCard extends Component {
  render() {
    const colors = {
      high: "danger",
      middle: "warning",
      low: "secondary",
    };
    const { name, date, importance, done, id, doneTodo, deleteTodo, editTodo } =
      this.props;
    return (
      <Alert
        variant={colors[importance]}
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <time>{date}</time> <span>{name}</span>
        </div>
        <div>
          <Button
            onClick={() => editTodo(id)}
            className="me-3"
            variant="primary"
          >
            Edit
          </Button>
          {done ? (
            <Button onClick={() => deleteTodo(id)} variant="danger">
              Delete
            </Button>
          ) : (
            <Button onClick={() => doneTodo(id)} variant="success">
              Done
            </Button>
          )}
        </div>
      </Alert>
    );
  }
}

export default TodoCard;
