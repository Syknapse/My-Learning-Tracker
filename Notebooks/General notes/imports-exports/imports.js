import Name from './name.js' // Import default
import { variable1, variable2 } from './file.js' // Named imports
import { variable1 as newName1, variable2 as newName2 } from './file.js' // Import under a different name
import * as Name from './file.js' // Import all
import { default as Name, variable2 } from './file.js' // Import default and named
// Dynamic import, can be used in the code
const path = './file.js'
import(path)
// Example
if (condition) {
    import(path).then(obj => console.log(obj))
}






console.log(Name)
console.log({ variable1, variable2 })
console.log({ newName1, newName2 })