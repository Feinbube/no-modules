# no-modules

A simple script to recusively remove `node_modules` from disk.

To get a **list** of all `node_module` folders run:
```
node no-modules.js <root-folder>
```

To **delete** the `node_module` folders run:
```
node no-modules.js <root-folder> --delete
```

**CAUTION: The `--delete` option will remove files and folders from your PC!**