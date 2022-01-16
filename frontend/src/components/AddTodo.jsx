import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../store/action/todo";
import { Button, Alert, CircularProgress } from "@mui/material";
import "../App.css";

const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if( todo._id ){
      dispatch( updateTodo(todo) );
    } else {
      const oldTodosLength = todosState.todos.length;
      dispatch( addTodo({ ...todo, date: new Date() }) )
      if( oldTodosLength + 1 === todosState.todos.length )
         dispatch({ type: "INCREMENT", payload: 1 })
    }

    setTodo({
      task: "",
      isComplete: false,
    });
  };

  return (
      <form onSubmit={handleSubmit}>
        <input type="text"
               placeholder="Enter a task"
               value={todo.task}
               onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />
        <br />
        <Button type="submit"
                variant="contained"
                size="small"
                sx={{
                  margin: "0.9rem 0rem",
                  fontFamily: "'Abel', 'sansSerif'",
                }}
        >
        {
          ( todosState.addTodoStatus === "pending" || todosState.updateTodoStatus === "pending" ) ? (
            <CircularProgress size={24} color="secondary" />
          ) : ( todo._id ? "Update Task" : "Add Task" )
        }
        </Button>
        {
          todosState.addTodoStatus === "rejected" && <Alert severity="error">{todosState.addTodoError}</Alert>
        }
        {
          todosState.addTodoStatus === "success" && <Alert severity="success">Task Added...</Alert>
        }
        {
          todosState.updateTodoStatus === "rejected" && <Alert severity="error">{todosState.updateTodoError}</Alert>
        }
        {
          todosState.updateTodoStatus === "success" && <Alert severity="success">Task Updated...</Alert>
        }
        {
          todosState.deleteTodoStatus === "rejected" && <Alert severity="error">{todosState.deleteTodoError}</Alert>
        }
        {
          todosState.deleteTodoStatus === "success" && <Alert severity="warning">A todo was deleted...</Alert>
        }
      </form>
  );
};

export default AddTodo;
