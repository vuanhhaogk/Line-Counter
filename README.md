# Line Counter

_How many code lines in my project?_

## Usage

```
$ npm install lcount -g
```

```
$ cd <your_project_path>
<your_project_path> $ lcount
<your_project_path> $ lcount -h
```

```
Usage: lcount [options]


Options:

-V, --version                output the version number
-e, --extension [extension]  File extension will be scanned. Ex: -e "js,css,html"
-i, --ignore [ignore]        File or Directory will be passed when scan. Ex: -i "node_modules,bin/build,.git"
-o, --object [object]        File or Directory will be scanned. Default is all file and directory. Ex: -o "app,public"
-h, --help                   output usage information
```

## Help & Example

I have a project structure like this:

```
/my-project
    |- .git
    |- app
        |--- controller
        |--- model
    |- public
        |- css
        |- js
        |- img
    index.js
```

**Count all file**

```
$ lcount
> File: 38 - Dir: 24 - Line: 3006
``` 

It'll return result of all file, directory in project.

**Count special extension**

```
$ lcount -e "js,css"
```

**Count special path**

```
$ lcount -o "app,public/css"
```

**Count all except...**

```
$ lcount -i ".git"
```

**Custome count**

```
$ lcount -o "app,public/css,index.js" -i ".git" -e "js,css,html"
```

## License

MIT