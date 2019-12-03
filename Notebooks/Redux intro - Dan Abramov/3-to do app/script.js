// Reducer
const todos = (state = [], action) => {
    console.log('REDUCER action: ', action)
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ]
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo
                }
                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
        default:
            return state
    }
}

const { createStore } = Redux
const store = createStore(todos)
const root = document.getElementById('root')

// Components
const AddToDo = ({ onAddToDo }) => (
    <div>
        <input id='to-do-input' type="text"/>
        <button onClick={onAddToDo}>+</button>
    </div>
)

const ToDoList = ({ onToggleToDo }) => {
    const list = store.getState()
    return (
        <ul>
            {list.map(item => (
                <li
                    key={item.id}
                    onClick={() => onToggleToDo(item.id)}
                    className={item.completed && 'completed' || 'item'}
                >
                    {item.text}
                </li>
            ))}
        </ul>
    )
}

const App = ({ onAddToDo, onToggleToDo }) => (
    <div>
        <h1>To do</h1>
        <AddToDo onAddToDo={onAddToDo} />
        {store.getState().length > 0 && <ToDoList onToggleToDo={onToggleToDo} />}
    </div>
)

// Logic
const addToDo = () => {
    const input = document.getElementById('to-do-input')
    if (input.value) {
        store.dispatch(
            {
                type: 'ADD_TODO',
                id: store.getState().length,
                text: input.value,
                completed: false,
            }
        )
    }
}

const toggleToDo = (id) => {
    store.dispatch(
        {
            type: 'TOGGLE_TODO',
            id,
        }
    )
}

const render = () => {
    console.log('>>> store.getState(): ', store.getState())
    ReactDOM.render(
        <App
            onAddToDo={() => addToDo()}
            onToggleToDo={id => toggleToDo(id)}
        />,
        root
    )
}

store.subscribe(render)
render()
