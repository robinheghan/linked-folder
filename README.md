# Linked Folder

This is a very simple utility for symlinking folders into your source tree.

Say you have the following folder structure:

```
MyProject
- Translation
  - No
    - Main.elm
  - En
    - Main.elm
- src
```

You can execute `npx linked-folder Translation src No` to get this:

```
MyProject
- Translation
  - No
    - Main.elm
  - En
    - Main.elm
- src
  - Translation # Symlink to Translation/No
    - Main.elm
```

As you might have guessed from the example, I use this for creating language specific builds in my Elm projects, but nothing about this project requires Elm.
