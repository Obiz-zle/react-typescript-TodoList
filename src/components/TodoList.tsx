import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css"

interface PropsType{
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}


const TodoList:React.FC<PropsType> = ({ todos, setTodos }: PropsType) => {
  return (
    <div className="todos">

      {todos.map(todo =>(
        <SingleTodo 
                    todo={todo} 
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
        />
      ))}
    </div>
  );
}

export default TodoList;