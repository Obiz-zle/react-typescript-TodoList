import { Droppable } from "react-beautiful-dnd";
import { Actions, Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css"

interface PropsType{
    todos:Todo[];
    // setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    dispatch: React.Dispatch<Actions>
    completed: Todo[];
    setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>
}


const TodoList:React.FC<PropsType> = ({ todos, dispatch, completed, setCompleted }: PropsType) => {
  return ( 
    // <div className="todos">

    //   {todos.map(todo =>(
    //     <SingleTodo 
    //                 todo={todo} 
    //                 key={todo.id}
    //                 todos={todos}
    //                 // setTodos={setTodos}
    //                 dispatch={dispatch}
    //     />
    //   ))}
    // </div>
    <div className="container">

      <Droppable droppableId="TodosList">
        {
          ((provided, snapshot) => (

                <div className={`todos ${snapshot.isDraggingOver? "dragactive" : "" }`} ref={provided.innerRef} {...provided.droppableProps}>
                    <span className="todos__heading">Active Tasks</span>
                    {
                      todos.map((todo, index) => <SingleTodo 
                                                    todo={todo}
                                                    index={index}
                                                    key={todo.id}
                                                    todos={todos}
                                                    dispatch={dispatch}/>)
                      }
                      {provided.placeholder}
                </div>
          ))
        }

      </Droppable>

      <Droppable droppableId="TodosRemove">
        {
          ((provided,snapshot) => (

                <div className={`todos remove ${snapshot.isDraggingOver? "dragcomplete" : "" }`} ref={provided.innerRef} {...provided.droppableProps}>
                    <span className="todos__heading">Completed Tasks</span>
                    {
                      completed.map((todo, index) => <SingleTodo 
                                                        todo={todo} 
                                                        index={index}
                                                        key={todo.id}
                                                        todos={completed}
                                                        setTodos={setCompleted}/>)
                      }
                      {provided.placeholder}
                </div>
          ))
        }

      </Droppable>

    </div>
  );
}

export default TodoList;
