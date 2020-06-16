# React Notes

## Conditional rendering

Syntax:

```js
function Notification({ text, status }) {
  return (
    <div>
      {
        {
          info: <Info text={text} />,
          warning: <Warning text={text} />,
          error: <Error text={text} />,
        }[status]
      }
    </div>
  );
}
```

[Read more](https://www.robinwieruch.de/conditional-rendering-react#multiple-conditional-renderings-in-react)
