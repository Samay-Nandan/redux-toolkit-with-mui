import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTodo, getTodos } from "../store/action/todo";
import moment from "moment";
import Button from "@mui/material/Button";
import "../App.css";
import { CircularProgress, Card } from "@mui/material";

const ListTodos = ({ setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch({ type: "DECREMENT", payload: 1 })
    dispatch(deleteTodo(id))
  }

  return (
    <div>
      <h2> You have { todosState.todosLength } tasks </h2>
      {
        todosState.getTodosStatus === "pending" && <CircularProgress />
      }
      {
        todosState.todos.map((todo) => (
          <Card key={todo._id}
                variant="outlined"
                sx={{
                  padding: "0.7rem",
                  marginBottom: "2rem",
                }}
          >
            <h3>{todo.task}</h3>
            <p>Added: { moment(todo.date).fromNow() }</p>
            <Button variant="outlined"
                    size="small"
                    onClick={() => setTodo({ ...todo })}
                    sx={{
                      fontFamily: "'Abel', 'sansSerif'",
                    }} 
            > Update </Button>
            <Button variant="contained"
                    color="secondary"
                    size="small"
                    sx={{
                      marginLeft: "0.7rem",
                      fontFamily: "'Abel', 'sansSerif'",
                    }}
                    onClick={() => handleDelete(todo._id)}
            > Delete </Button>
          </Card>
      ))}
    </div>
  );
};

export default ListTodos;
