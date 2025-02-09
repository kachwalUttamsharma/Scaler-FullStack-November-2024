## JavaScript Naming Conventions

### Variable Naming Conventions

- **Use descriptive names** Variable names should clearly indicate what they hold and their purpose in the code.

  ```
  // Bad Practice
  let a = 'codedamn';
  let y = 2015;

  // Good Practice
  let platformName = 'codedamn';
  let yearFounded = 2015;
  ```

- **Employ camel casing** JavaScript commonly uses camel casing for variable names. The first letter is lowercase, and the first letter of each subsequent word is uppercase.

  ```
  // Correct
  let numberOfUsers = 5000;

  // Incorrect
  let number_of_users = 5000;
  let NumberOfUsers = 5000;
  ```

- **Start with lowercase** Begin variable names with a lowercase letter. Uppercase letters are generally reserved for constructor functions.

  ```
  // Correct
  let firstName = 'John';

  // Incorrect
  let FirstName = 'John';
  ```

- **Avoid special characters/numbers at the beginning** Variable names should start with a letter, underscore (\_), or dollar sign ($). However, it's best to avoid using underscores or dollar signs unless necessary.

  ```
  // Incorrect
  let 1name = 'John';
  let $name = 'John';
  let _name = 'John';

  // Correct
  let name = 'John';
  ```

- **Be case-sensitive** JavaScript distinguishes between lowercase and uppercase letters in variable names.

  ```
  var DogName = 'Scooby-Doo';
  var dogName = 'Droopy';
  var DOGNAME = 'Odie';

  console.log(DogName); // "Scooby-Doo"
  console.log(dogName); // "Droopy"
  console.log(DOGNAME); // "Odie"
  ```

- **Use 'is' or 'has' prefixes for booleans** Boolean variables should be prefixed with "is" or "has" to clearly indicate their purpose.

  ```
  // bad
  var bark = false;

  // good
  var isBark = false;

  // bad
  var owner = true;

  // good
  var hasOwner = true;
  ```

- **Keep variable names short** Aim for variable names that are between 3 and 10 characters long.

### Function Naming Conventions

Function names are just as important as variable names when it comes to writing clean, readable, and maintainable code. Here's a breakdown of best practices:

- **Use Descriptive Names:** Function names should clearly convey what the function _does_. A good function name acts as a mini-description, making it easier to understand the code's intent at a glance.

  ```
  // Bad
  function process() { ... } // What does it process?

  // Good
  function calculateTotalAmount() { ... } // Clear and specific
  function getUserProfile() { ... }      // Clear and specific
  ```

- **Use Camel Casing:** Just like variables, functions in JavaScript generally follow camel case. The first word is lowercase, and each subsequent word starts with a capital letter.

  ```
  // Correct
  function calculateArea() { ... }
  function displayErrorMessage() { ... }

  // Incorrect
  function calculate_area() { ... }
  function CalculateArea() { ... } // Typically used for constructor functions/classes
  ```

- **Start with a Verb (Most of the Time):** Function names often start with a verb, particularly for functions that perform actions. This makes it obvious that the function _does_ something.

  ```
  // Common verb prefixes:
  // calculate, get, set, fetch, create, update, delete, is, has

  function calculateTax() { ... }
  function getData() { ... }
  function setUserName(name) { ... }
  function isValidEmail(email) { ... } // Boolean check, using "is"
  ```

- **Boolean Functions: Use `is`, `has`, or `should` Prefixes:** Functions that return a boolean (true/false) value should clearly indicate that they are making a check or determining a state.

  ```
  function isValidUser(user) { ... }
  function hasPermission(user, permission) { ... }
  function shouldUpdateUI() { ... }
  ```

- **Avoid Abbreviations (Generally):** While there can be exceptions, avoid abbreviations that might not be immediately clear to others (or to your future self!). Prioritize clarity.

  ```
  // Avoid (unless the abbreviation is extremely well-known in your context)
  function calcTot(price, tax) { ... }  // Confusing

  // Better
  function calculateTotal(price, tax) { ... }
  ```

- **Consider Context:** The best function names are often influenced by the context in which they're used. If a function is part of an object or class, the object/class name can provide some context, allowing the function name to be slightly shorter (but still clear).

  ```
  const user = {
    name: "Alice",
    getProfile: function() { ... }  // In the context of a 'user', 'getProfile' is clear
  };
  ```

- **Keep it Concise (But Not _Too_ Concise):** Strive for a balance between descriptive and reasonably short. Extremely long function names can become unwieldy.

  ```
  // Too short:
  function x() { ... }

  // Possibly too long (depending on context):
  function calculateTheTotalAmountIncludingSalesTaxAndShippingCosts() { ... }

  // A good balance:
  function calculateTotalWithTaxAndShipping() { ... }
  ```

- **Arrow Functions:** Arrow functions often have shorter, more concise names, especially when they're used as callbacks or inline functions. The surrounding code often provides context. If an arrow function is complex or performs a significant task, it still needs a clear name.

  ```
  // Simple callback:
  numbers.map(num => num * 2); // The context makes it clear what's happening

  // More complex arrow function:
  const calculateDiscountedPrice = (price, discount) => price * (1 - discount);
  ```

### BEM Naming Convention for CSS Classes

BEM (Block, Element, Modifier) is a naming convention for CSS classes that enhances code readability and scalability.

- **Block**: Represents the outermost parent element of a component.
- **Element**: Represents the children inside of the component.
- **Modifier**: Signifies a variation of either a block or an element.

The naming structure follows this pattern: `block-name__elem-name_mod-name_mod-val`.

- Names use lowercase Latin letters.
- Words are separated by hyphens (-).
- Element names are separated from the block name by double underscores (\_\_).
- Modifier names are separated from the block or element name by a single underscore (\_).
- Modifier values are separated from the modifier name by a single underscore (\_).

```
<div class="menu">
  ...
  <span class="menu__item"></span>
</div>

.menu { color: red; }
.menu__item { color: red; }

```
