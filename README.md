# Parse and Assert Library

A SillyTavern extension library for parsing and asserting data types. This library provides a set of validators and assertion functions to ensure data integrity in your scripts.

## Installation

1. Open the extension settings drawer in SillyTavern and click `Install extension`.
2. Paste the following link: `https://github.com/CasualAutopsy/STLibs-Parse-and-Assert.git`.
3. Click `Install just for me` if you're a user, ~~or `Install for all users` if you're a developer~~(The developer side of things is still a WIP).

## Usage

### Users

The library provides a single slash command to assert data types that users can use OOTB without any dependant extensions.

#### `/assert` Usage

named args:

- `type`: The type of validator to use.
- `msg`: The error message to display if the value does not match.
- `boolFn`: (Optional) The closure to use for comparison.
- `regex`: (Optional) The RegEx string to match a string against.

unnamed args:

- `value`: The value to check. Optional if `boolFn` is used with 'bool_fn' `type`.

example:

```st-script
/let x "hello world" |
/let y 42 |

/assert type="string" msg="x must be a string" {{var::x}} |
// Passes and the script continues like normal |

/assert type="string" msg="y must be a string" {{var::y}} |
// Throws an error and the script stops |
```

### Developers (Work in Progress)

For developers, the library has three classes within the `globalThis` object that can be accessed: `STAssert`, `ExtAssert`, and `STParse`.

To access the typedefs for the library, import the `libs.d.ts` file into your extensions `global.d.ts` file.

#### STAssert

The `STAssert` class provides a set of core assertion methods to ensure data integrity:

- `assert(condition, msg)`: Conditional based assertion. Throws an error if `false`.
- `isString(val, msg)`: Ensures the value is a string.
- `isNumber(val, msg)`: Ensures the value is a number.
- `isBoolean(val, msg)`: Ensures the value is a boolean.
- `isArray(val, msg)`: Ensures the value is an array.
- `isStringArray(val, msg)`: Ensures the value is an array of strings. Uses the ajv package for validation.
- `isNumberArray(val, msg)`: Ensures the value is an array of numbers. Uses the ajv package for validation.
- `isBooleanArray(val, msg)`: Ensures the value is an array of booleans. Uses the ajv package for validation.
- `isObject(val, msg)`: Ensures the value is an object.
- `matchRegEx(val, regex, msg)`: Ensures the value matches the RegEx script.
- `isClosure(val, msg)`: Ensures the value is a closure.

example:

```javascript
const { STAssert } = STPALib;

async function exampleSlashHandler(args, val) {
    STAssert.isString(val, 'The value can not be a closure');

    return `Hello, ${val}!`;
}
```

#### ExtAssert

The `ExtAssert` class allows developers to create custom assertions through JSON Schemas with the ajv package.

It also provides 2 methods for creating slash commands for assertions and schema documentations.

example:

```javascript
export const YourAssert = new STPALib.ExtAssert('your-id');

const your_schema = {
    // Your JSON schema here.
};

YourAssert.addValidator(
    'your-validator',
    your_schema,
    {
        // (Optional) The options if you plain to expose it to a assert slash command.
    },
    {
        // (Optional) The options if you plain to expose it to a schema documentation slash command.
    },
);
```

#### STParse

since STscript variables are either closures or strings, the `STParse` class provides a set of parsing methods to convert strings to the correct data types.

example:

```javascript
const { STParse, STAssert } = STPALib;

async function exampleIncSlashHandler(args, val) {
    STAssert.isString(val, 'The value can not be a closure');
    
    const parsed_val = STParse.parse(val);
    STAssert.isNumber(parsed_val, 'The value must be a number');

    return String(parsed_val + 1);
}
```
