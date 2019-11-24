# [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)

## The 3 principles of Redux

+ The single immutable state tree.
+ State can only be changed by dispatching an **action**. An action is an object.
+ The **reducer**: is a **pure** function that takes the **previous state** of the app and the **action** being dispatched and returns the **next state**.

## Reducer example

```JS
function counter(state, action) {
    if (typeof state === 'undefined') return 0 // Whatever the initial state is

    if (action.type === 'INCREMENT') {
        return state + 1
    } else if (action.type === 'DECREMENT') {
        return state - 1
    } else {
        return state // If it's not a valid action, return the same state
    }
}
```

Refactored for clarity and ES6

```JS
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
```
## Store methods

+ getState(): gets the current state
+ dispatch(): runs an action
+ subscribe(): The store will run the provided callback function any time an action has been dispatched.
Example: `store.subscribe(render)`will fire `render()` any time an action is dispatched.
