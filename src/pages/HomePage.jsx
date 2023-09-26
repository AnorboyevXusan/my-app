import React, { Component, createRef } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { v4 } from "uuid";

import TodoForm from "../components/form/TodoForm";
import TodoHeader from "../components/header/TodoHeader";
import Footer from "../components/footer/Footer";
import TodoCard from "../components/card/TodoCard";
import { ToastContainer, toast } from "react-toastify";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
    this.nameRef = createRef();
    this.state = {
      activeTab: "family",
      todos: JSON.parse(localStorage.getItem("todos")) || [
        {
          name: "Playing football",
          phone: "+9989",
          categories: "Family",
          id: 0,
        },
        {
          name: "Reading book",
          phone: "+9989",
          categories: "Friends",
          id: 1,
        },
        {
          name: "Doing homework",
          phone: "+9989",
          categories: "Work",
          id: 2,
        },
      ],
      todo: {
        name: "",
        phone: "",
        categories: "Family",
      },
      selected: null,
      search: "",
      categories: "family",
      validated: false,
    };
  }
  render() {
    const { activeTab, todos, todo, selected, search, categories, validated } =
      this.state;
    const handleSearch = () => {
      this.setState({
        search: this.searchRef.current.value.trim().toLowerCase(),
      });
    };
    const changeTab = (key) => {
      this.setState({ activeTab: key });
    };
    const handleTodo = (e) => {
      // console.log(e.target.id);
      // console.log(e.target.value);
      this.setState({ todo: { ...todo, [e.target.id]: e.target.value } });
    };
    const submit = (e) => {
      e.preventDefault();
      if (e.target.checkValidity()) {
        let newTodos;
        let newTodo = { ...todo, id: v4() };
        if (selected === null) {
          newTodos = [...todos, newTodo];
          toast.success("Added successfully", { autoClose: 2000 });
        } else {
          newTodos = todos.map((todo) => {
            if (todo.id === selected) {
              return newTodo;
            }
            return todo;
          });
          toast.info("Edited successfully");
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.nameRef.current.focus();
        this.setState({
          todos: newTodos,
          todo: {
            name: "",
            phone: "",
            categories: "family",
          },
          selected: null,
          validated: false,
        });
      } else {
        this.setState({ validated: true });
      }
    };
    const categoriesTodo = (id) => {
      let newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.categories = true;
        }
        return todo;
      });
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const deleteTodo = (id) => {
      let newTodos = todos.filter((todo) => todo.id !== id);
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const editTodo = (id) => {
      const todo = todos.find((todo) => todo.id === id);
      this.setState({ todo, selected: id });
    };
    const handleCategories = (e) => {
      this.setState({ categories: e.target.value });
    };
    let familyTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(search)
    );
    if (categories!== "family") {
      familyTodos = familyTodos.filter((todo) => todo.categories === categories);
    }
    const categoriesTodos = familyTodos.filter((todo) => todo.categories);
    const undoneTodos = familyTodos.filter((todo) => !todo.categories);
    return (
      <Container style={{background: '#000'}}>
        <ToastContainer />
        <TodoForm
          validated={validated}
          nameRef={this.nameRef}
          selected={selected}
          todo={todo}
          handleTodo={handleTodo}
          submit={submit}
        />
        <TodoHeader
          categories={categories}
          handleCategories={handleCategories}
          searchRef={this.searchRef}
          handleSearch={handleSearch}
        />
        <Tabs
          activeKey={activeTab}
          onSelect={changeTab}
          className="mb-3"
          variant="pills"
          fill
        >
          <Tab eventKey="family" title={`family (${familyTodos.length})`}>
            {familyTodos.map((todo, i) => (
              <TodoCard
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                categoriesTodo={categoriesTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          <Tab eventKey="friends" title={`friends (${categoriesTodos.length})`}>
            {categoriesTodos.map((todo, i) => (
              <TodoCard
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          <Tab eventKey="work" title={`work (${undoneTodos.length})`}>
            {undoneTodos.map((todo, i) => (
              <TodoCard
                editTodo={editTodo}
                categoriesTodo={categoriesTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
        </Tabs>
        <Footer />
      </Container>
    );
  }
}

export default HomePage;
