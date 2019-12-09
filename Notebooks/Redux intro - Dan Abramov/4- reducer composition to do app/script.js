// Reducers

// Single todo reducer
const todo = (state, action) => {
    // state here refers to each individual todo item
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false,
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }
            return {
                ...state,
                completed: !state.completed
            }
        default:
            return state
    }
}

// Todos list reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(item => todo(item, action))
        default:
            return state
    }
}

// Visibility filter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

// Combination of the three reducers
/* const todoApp = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
} */
// The above function can be substituted with the Redux combiner method
const { combineReducers } = Redux
const todoApp = combineReducers({
    todos,
    visibilityFilter
})



const { createStore } = Redux
const store = createStore(todoApp)
const root = document.getElementById('root')
let todoInput

// Components
const AddToDo = ({ onAddToDo }) => (
    <div>
        <input ref={node => {todoInput = node}} type="text"/>
        <button onClick={onAddToDo}>Add to do</button>
    </div>
)

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed)
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed)
    }
}

const ToDoList = ({ todos, filter, onToggleToDo }) => {
    const visibleTodos = getVisibleTodos(todos, filter)
    return (
        <ul>
            {visibleTodos.map(item => (
                <li
                    key={item.id}
                    onClick={() => onToggleToDo(item.id)}
                    className={item.completed && 'completed' || 'active'}
                >
                    {item.text}
                </li>
            ))}
        </ul>
    )
}

const Filter = ({ onFilter, currentFilter }) => {
    const filters = [
        {
            type: 'SHOW_ALL',
            text: 'Show all',
        },
        {
            type: 'SHOW_ACTIVE',
            text: 'Show active',
        },
        {
            type: 'SHOW_COMPLETED',
            text: 'Show completed',
        },
    ]

    return (
        <div className='filter'>
            <h2>Filter</h2>
            <div className='filter-buttons'>
                {filters.map((filter, i) => (
                    <button
                        key={i}
                        disabled={filter.type === currentFilter}
                        onClick={() => onFilter(filter.type)}
                    >
                        {filter.text}
                    </button>
                ))}
            </div>
        </div>
    )
}

const App = ({ todos, visibilityFilter ,onAddToDo, onToggleToDo, onFilter }) => (
    <div className='wrapper'>
        <div>
            <h1>To do</h1>
            <AddToDo onAddToDo={onAddToDo} />
            {todos.length > 0 && <ToDoList todos={todos} filter={visibilityFilter} onToggleToDo={onToggleToDo} />}
        </div>
        <Filter onFilter={onFilter} currentFilter={visibilityFilter}/>
    </div>
)

// Logic
const addToDo = () => {
    if (todoInput.value) {
        store.dispatch(
            {
                type: 'ADD_TODO',
                id: store.getState().todos.length,
                text: todoInput.value,
                completed: false,
            }
        )
    }
    todoInput.value = ''
}

const toggleToDo = (id) => {
    store.dispatch(
        {
            type: 'TOGGLE_TODO',
            id,
        }
    )
}

const filterTodos = filter => {
    store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
    })
}

const render = () => {
    console.log('>>> store.getState(): ', store.getState())
    ReactDOM.render(
        <App
            {...store.getState()}
            // todos={store.getState().todos}
            // visibilityFilter={store.getState().visibilityFilter}
            onAddToDo={() => addToDo()}
            onToggleToDo={id => toggleToDo(id)}
            onFilter={filter => filterTodos(filter)}
        />,
        root
    )
}

store.subscribe(render)
render()
