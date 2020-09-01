export default Name // Default export
export { variable1, variable2 } // Named exports
export { variable1 as newName1, variable2 as newName2} // Export under a different name

export { variable1 as default } // Export a specific variable as default
// Re-export: import to a new file and immediately export
export { default } from './file.js' // Re-export default
export { default as Name } from './file.js' // Re-export named default
export { variable1, variable2 } from './file.js' // Re-export named
