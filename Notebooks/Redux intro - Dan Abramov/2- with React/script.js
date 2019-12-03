// Reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const { createStore } = Redux
const store = createStore(counter) // Create store with the provided reducer
const root = document.getElementById('root')

const Counter = ({ value, onIncrement, onDecrement }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
    </div>
)


const storeDispatch = type => {
    store.dispatch({ type })
}

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onDecrement={() => storeDispatch('DECREMENT')}
            onIncrement={() => storeDispatch('INCREMENT')}
        />,
        root
    )
}

store.subscribe(render)
render()