# Arrays

## Reducer

Iterate over one array adding its elements as a property of the objects in another array

```js
const array1 = ['monkey', 'chicken', 'dodo', 'dado']
const array2 = [
    { params: { country: 'hu', locale: 'en' } },
    { params: { country: 'hu', locale: 'hu' } },
    { params: { country: 'en', locale: 'en' } },
    { params: { country: 'es', locale: 'es' } },
    { params: { country: 'es', locale: 'ca' } },
  ]
const paths = array1.reduce((acc, cur) => {
    return acc.concat(
      array2.map(path => ({
        params: {
          ...path.params,
          id: cur,
        },
      }))
    )
  }, [])
  
  console.log('>>>>>>>>>> paths: ', paths)
  /* [
    {params: {country: "hu", locale: "en", id: "monkey"}},
    {params: {country: "hu", locale: "hu", id: "monkey"}},
    {params: {country: "en", locale: "en", id: "monkey"}},
    ...
  ] */
  ```
