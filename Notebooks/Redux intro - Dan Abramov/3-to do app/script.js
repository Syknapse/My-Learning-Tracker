// Reducer
const todos = (state = [], action) => {
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

const ToDoList = ({}) => {
    const list = store.getState()
    return (
        <ul>
            {list.map((item, i) => <li key={i}>{item.text}</li>)}
        </ul>
    )
}

const App = ({ onAddToDo }) => (
    <div>
        <h1>To do</h1>
        <AddToDo onAddToDo={onAddToDo} />
        {store.getState().length > 0 && <ToDoList />}
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

const render = () => {
    console.log('>>> store.getState(): ', store.getState())
    ReactDOM.render(
        <App
            onAddToDo={() => addToDo()}
        />,
        root
    )
}

store.subscribe(render)
render()
