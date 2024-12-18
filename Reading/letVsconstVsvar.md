# Thumb Rules for `let`, `const` and `var` in JavaScript

## 1. Scope

- **`let` and `const`: Block Scoped**

  - Variables declared with let or const are limited to the block in which they are defined

  ```javascript
  if (true) {
    let a = 10;
    const b = 20;
  }
  console.log(a); // Error: a is not defined
  ```

- **`var`: Function or Global Scoped**

  - When declared inside a function, `var` is scoped to the enclosing function and ignores block-level boundaries.
  - When declared outside of a function, `var` becomes globally scoped and attaches to the global object (e.g., `window` in browsers).

  ```javascript
  // Function scope
  function example() {
    if (true) {
      var c = 30;
    }
    console.log(c); // 30 (accessible within the function)
  }
  example();

  // Global scope
  var globalVar = "I'm global!";
  console.log(window.globalVar); // "I'm global!"
  ```

---

## 2. Shadowing

- **`let` and `const`: Predictable Shadowing**

  - Nested block variables can shadow outer block variables.

  ```javascript
  let x = 5;
  if (true) {
    let x = 10; // Shadows outer x
    console.log(x); // 10
  }
  console.log(x); // 5
  ```

- **`var`: Less Predictable**
  - Shadowing with `var` can unintentionally overwrite outer variables.
  ```javascript
  var y = 5;
  if (true) {
    var y = 10; // Overwrites outer y
    console.log(y); // 10
  }
  console.log(y); // 10
  ```

---

## 3. Hoisting

- **`let` and `const`: Temporal Dead Zone (TDZ)**

  - Variables are hoisted but uninitialized. Accessing them before declaration causes an error.

  ```javascript
  console.log(a); // Error: Cannot access 'a' before initialization
  let a = 5;
  ```

- **`var`: Fully Hoisted**
  - Variables are initialized to `undefined`, making them accessible before declaration.
  ```javascript
  console.log(b); // undefined
  var b = 5;
  ```

---

## 4. Re-declaration

- **`let` and `const`: No Re-declaration**

  - Throws an error when redeclaring in the same scope.

  ```javascript
  let a = 5;
  let a = 10; // Error: Identifier 'a' has already been declared
  ```

- **`var`: Allows Re-declaration**
  - Redeclaration overwrites the previous variable.
  ```javascript
  var c = 5;
  var c = 10; // No error
  console.log(c); // 10
  ```

---

## 5. Use of `const`

- **Immutable Binding**
  - Variables declared with `const` cannot be reassigned, but their contents (e.g., objects, arrays) can still be mutated.
  ```javascript
  const obj = { key: 1 };
  obj.key = 2; // Works
  obj = {}; // Error: Assignment to constant variable
  ```

---

## 6. Best Practices

1. **Prefer `const`** for variables that do not need reassignment.

   ```javascript
   const MAX_LIMIT = 100;
   ```

2. **Use `let`** for variables that need to change over time.

   ```javascript
   let counter = 0;
   counter++;
   ```

3. **Avoid `var`** in modern JavaScript.
   - Use `let` and `const` to write predictable and safer code.
