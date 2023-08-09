import { Actions, Todo } from "../model";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import "./styles.css"
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

type PropsType = {
    todo:Todo,
    todos:Todo[],
    setTodos?:React.Dispatch<React.SetStateAction<Todo[]>>,
    dispatch?: React.Dispatch<Actions>,
    index:number
}

const SingleTodo = ({ index, todo, todos, dispatch, setTodos }: PropsType) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        inputRef.current?.focus();
    },[edit])


    const handleDone = (id:number) => {
        if(setTodos) {setTodos(todos.map(todo => todo.id === id?{...todo, isDone:!todo.isDone} : todo));}
        if(dispatch) {dispatch({type:"done", payload:id})}
    }

    const handleDelete = (id:number) => {
        if(setTodos) {setTodos(todos.filter(todo => todo.id !== id));}
        if(dispatch) {dispatch({type:"remove", payload:id});}
    }

    const handleEdit = (e:React.FormEvent, id:number) =>{
        e.preventDefault();
        if(setTodos) {setTodos(todos.map(todo => todo.id===id?{...todo, todo:editTodo} : todo ));}
        if(dispatch) {dispatch({type:"edit", payload:{id:id, modified:editTodo}});}
        setEdit(false);
    }



  return (


    <Draggable draggableId={todo.id.toString()} index={index}>

        {
            ((provided, snapshot) => (

                    <form 
                            className={`todos__single ${snapshot.isDragging? "drag" : "" }`}
                            onSubmit={(e) => handleEdit(e, todo.id)} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>

                        { 
                            edit ? 
                            
                            (<input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todos__single--text"/>)
                            :
                            ( 
                                todo.isDone ? 
                                (<s className="todos__single--text">{todo.todo}</s>) 
                                :
                                (<span className="todos__single--text">{todo.todo}</span> )
                                )
                            }

                        <div>
                            <span className="icon" onClick={() => {
                                if(!edit && !todo.isDone){setEdit(!edit)}
                            }}> 
                            <AiFillEdit /> 
                            </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}> <AiFillDelete /> </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}> <MdDone /> </span>
                        </div>


                    </form>
            ))
        }


    </Draggable>
  );
}

export default SingleTodo;
