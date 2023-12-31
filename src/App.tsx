

import { useReducer, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo, TodoReducer } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  
  const [todo, setTodo] = useState<string>("");

  //const [todos, setTodos] = useState<Todo[]>([]);

  const [todosState, dispatch] = useReducer(TodoReducer, []);

  //console.log(todo, todos)

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if(todo){
      //setTodos([...todos, {id:Date.now(), todo:todo, isDone:false}]);
      dispatch({type:"add", payload: todo});
      setTodo("");
    }
  };
  
  //console.log(todo);

  function onDragEnd(result:DropResult){
    //console.log(result);
    const { source, destination } = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,
        active = todosState, 
        complete = completedTodos;

    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index, 1);
    }
    else{
      add = complete[source.index];
      complete.splice(source.index, 1);

    }
    if(destination.droppableId === "TodosList"){
      active.splice(destination.index, 0, add);
    }
    else{
      complete.splice(destination.index, 0, add);
    }


    setCompletedTodos(complete);
    dispatch({type:"reset", payload: active});

  }

  return (
    

    <DragDropContext onDragEnd={onDragEnd}>
        <div className='App'>
          <span className='heading'>Taskify</span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          {/* <TodoList todos={todosState} setTodos={setTodos} dispatch={dispatch} /> */}
          <TodoList todos={todosState}  dispatch={dispatch} completed={completedTodos} setCompleted={setCompletedTodos} />
        </div>
    </DragDropContext>

    
  )
}

export default App;
