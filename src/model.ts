


export interface Todo{
    id:number;
    todo: string;
    isDone: boolean
}

export type Actions = { type: "add"; payload: string }  | 
                     { type: "done"; payload: number }  |
                     { type: "remove"; payload: number }|
                     { type: "reset"; payload: Todo[] }|
                     { type: "edit"; payload: { id: number, modified: string } }

                     

export function TodoReducer(state:Todo[], action:Actions){
    switch (action.type) {
        case "add":
            return [...state, { id: Date.now(), todo: action.payload, isDone: false}];
            
        case "remove":
            return state.filter(todo => todo.id !== action.payload);
            
        case "done":
            return state.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)

        case "edit":
            return state.map(todo => todo.id === action.payload.id? { ...todo, todo: action.payload.modified } : todo)

        case "reset":
            return [...action.payload]
            
        
        default:
            return state;
    }
}


