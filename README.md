## Virtualizer.js (PoC)

## Overview

This project is a simple proof of concept for a JavaScript Virtual Machine (VM) 
that can execute a basic set of instructions.

## Features

- **Memory Management**: Variables are stored in a simple memory structure.
- **Stack Operations**: Implements a stack to handle arithmetic calculations and function calls.
- **Instruction Set**: Supports a basic set of instructions including:
    - Memory Operations: Mov, Pop, Push
    - Comparison Operations: Gt, Lt, Eq
    - Arithmetic Operations: Add, Sub, Mul, Div
    - System Operations: Goto, Jump, Print

## Example Program

The following example program demonstrates the functionality of the virtual machine:

```typescript
const program = [
  new MovInstNode("x", 10),
  new MovInstNode("y", 5),

  /* If x > y */
  new PushInstNode("x"),
  new PushInstNode("y"),
  new GtInstNode(),
  new JumpInstNode(6, 11),
  /* End if */

  /* Start true block */
  new PushInstNode(null, 10),
  new PushInstNode("x"),
  new AddInstNode(),
  new PopInstNode("x"),
  new GotoInstNode(15),
  /* End true block */

  /* Start false block */
  new PushInstNode(null, 5),
  new PushInstNode("x"),
  new SubInstNode(),
  new PopInstNode("x"),
  /* End false block */

  new PrintInstNode("x")
];

const vm = new VirtualMachine();
await vm.execute(program);
```
