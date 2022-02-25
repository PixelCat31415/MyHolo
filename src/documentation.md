# MyHolo Core API Documentation

---

## File.js

Do cool things regarding files. Relative paths starts from `myholo/`.

### import

import in `myholo/src/core/File.js`

```js
const fio = require("./core/File");
// path from the .js file to File.js
```

### API

- `fio.checkExist(path)`
- `fio.readText(path)`
- `fio.readObj(path)`
- `fio.writeText(path, data)`
- `fio.writeObj(path, obj)`
- `fio.getAllFiles(path)`

#### `fio.checkExist(path)`

check if file `path` exists.

- **parameters**
  - `path`: path to the desired file
- **return value**: bool, true if the file exists

#### `fio.readText(path)`

read from a file, return as text.

- **paramaters**
  - `path`: path to the desired file
- **return value**: string, contents of the file

#### `fio.readObj(path)`

read from a (json format) file, return as object

- **paramaters**
  - `path`: path to the desired file
- **return value**: JS object, contents of the file

#### `fio.writeText(path, data)`

write (replace) data to a file. creates one if not presented.

- **parameters**
  - `path`: path to the desired file
  - `data`: data to write
- **return value**: N/A

#### `fio.writeObj(path, obj)`

write (replace) object to a (json) file. creates one if not presented.

- **parameters**
  - `path`: path to the desired file
  - `obj`: object to write
- **return value**: N/A

#### `fio.getAllFiles(path)`

get file list of a directory

- **parameters**
  - `path`: path to the desired directory
- **return value**: array of string, all files/directories in the directory

---
