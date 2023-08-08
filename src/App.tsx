

import { useReducer, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo, TodoReducer } from './model';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  
  const [todo, setTodo] = useState<string>("");

  //const [todos, setTodos] = useState<Todo[]>([]);

  const [todosState, dispatch] = useReducer(TodoReducer, []);

  //console.log(todo, todos)

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if(todo){
      //setTodos([...todos, {id:Date.now(), todo:todo, isDone:false}]);
      dispatch({type:"add", payload: todo});
      setTodo("");
    }
  };
  
  //console.log(todo);

  return (
    <>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        {/* <TodoList todos={todosState} setTodos={setTodos} dispatch={dispatch} /> */}
        <TodoList todos={todosState}  dispatch={dispatch} />
      </div>
    </>
  )
}

export default App;
