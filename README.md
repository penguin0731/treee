# Treev
create a tree for your directory

## install

```shell
npm i treev -g
```

## Usage

```
$ treev -h
Usage: treev [options]

Options:
  -d, --directory <directory>  specify a directory to create tree
  -i, --ignore <glob...>       ignore directories when you create tree
  -ni, --noIcons               create tree without icons
  -v, --version                output the version number
  -h, --help                   display help for command
```

### Example

ignore some files：

```
$ treev -i node_modules .git **.js

📁treev
├─📁dist
│ ├─📄commander-CXs82Ous.js
│ ├─📄glob-l0vWOJPs.js
│ └─📄index.js
├─📄.gitignore
├─📄.npmignore
├─📄README.md
├─📄package-lock.json
└─📄package.json
```



output without icons：

```
$ treev -i node_modules .git **.js -ni

treev
├─dist
│ ├─commander-CXs82Ous.js
│ ├─glob-l0vWOJPs.js
│ └─index.js
├─.gitignore
├─.npmignore
├─README.md
├─package-lock.json
└─package.json
```

