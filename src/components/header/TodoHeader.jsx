import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

export class TodoHeader extends Component {
  constructor(props) {
    super(props);
    // this.searchRef = createRef();
    this.state = {};
  }
  render() {
    const { handleSearch, searchRef, handleImportance, importance } =
      this.props;
    // const handleSearch = () => {
    //   console.log(this.searchRef.current.value);
    // };
    return (
      <InputGroup className="my-3">
        <Form.Control
          onChange={handleSearch}
          // ref={this.searchRef}
          ref={searchRef}
          placeholder="Searching todo"
        />
        <InputGroup.Text>
          <Form.Select onChange={handleImportance} value={importance}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="middle">Middle</option>
            <option value="low">Low</option>
          </Form.Select>
        </InputGroup.Text>
      </InputGroup>
    );
  }
}

export default TodoHeader;
