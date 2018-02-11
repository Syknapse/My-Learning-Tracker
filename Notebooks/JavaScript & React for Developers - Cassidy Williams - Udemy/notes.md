# JavaScript and React for Developers

## DOM

Getting an element

```js
document.getElementById('id')
document.getElementsByClassName('class')
document.getElementsByTagName('html tag')
document.querySelector('css selector') // only first
document.querySelectorAll('css selector') // all
```

Creating

```js
createElement('element')
createAttribute('attribute')

// Example
let newParagraph = document.createElement('p');
newParagraph.innerText = 'This text will be added to the new paragraph';
document.body.appendChild(newParagraph);

let newAttribute = document.createAttribute('id');
newAttribute.value = 'newID'; // this will create a new id called newID
newParagraph.setAttributeNode(newAttribute); // the new paragraph will now have id='newID'
```

How to implement `getElementsByAttribute`?

```js
function getElementsByAttribute(attribute, value) {
    const allElements = document.getElementsByTagName('*');
    let matches = [];

    for (let i = 0; i < allElements.length; i++) {
        element = allElements[i];
        if (element.getAttribute(attribute) === value) {
            matches.push(element);
        }
    }
    return matches;
}
```