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
const display = document.querySelector('#display')
const increment = document.querySelector('#increment')
const decrement = document.querySelector('#decrement')

const render = () => {
    display.innerText = store.getState()
}

store.subscribe(render)
render()

increment.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' })
    console.log('store.getState(): ', store.getState())
})

decrement.addEventListener('click', () => {
    store.dispatch({ type: 'DECREMENT' })
    console.log('store.getState(): ', store.getState())
})
// continue from vid 8 with a new app using React