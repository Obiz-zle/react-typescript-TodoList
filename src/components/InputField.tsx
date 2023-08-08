
import { useRef } from "react";
import "./styles.css"
import { Actions } from "../model";


interface PropsType{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e:React.FormEvent) => void;
    //dispatch: React.Dispatch<Actions>
}

const InputField = ({todo, setTodo, handleAdd } : PropsType) => {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input" onSubmit={(e) => {handleAdd(e); inputRef.current?.blur();}}>
        <input 
               ref={inputRef}
               type="input" 
               placeholder="Enter a task" 
               className="input__box" 
               value={todo}
               onChange={(e) => setTodo(e.target.value) }/>
        <button className="input_submit" type="submit">Go</button>
    </form>
  );
}

export default InputField;
