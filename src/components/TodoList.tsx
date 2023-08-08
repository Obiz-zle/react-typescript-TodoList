import { Actions, Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css"

interface PropsType{
    todos:Todo[];
    // setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    dispatch: React.Dispatch<Actions>
}


const TodoList:React.FC<PropsType> = ({ todos, dispatch }: PropsType) => {
  return ( 
    <div className="todos">

      {todos.map(todo =>(
        <SingleTodo 
                    todo={todo} 
                    key={todo.id}
                    todos={todos}
                    // setTodos={setTodos}
                    dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default TodoList;
