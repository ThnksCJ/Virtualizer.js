## Virtualizer.js (PoC)

## Overview

This project is a simple proof of concept for a JavaScript Virtual Machine (VM) 
that can execute a basic set of instructions.

## Features

- **Memory Management**: Variables are stored in a simple memory structure.
- **Stack Operations**: Implements a stack to handle arithmetic calculations and function calls.
- **Instruction Set**: Supports a basic set of instructions including:
    - Memory Operations: Mov, Pop, Push
    - Comparison Operations: Gt (Greater Than), Lt (Less Than), Eq (Equal)
    - Arithmetic Operations: Add, Sub, Mul, Div, Mod, And, Or, Xor
    - System Operations: Goto, Jump, Print

## Simple Rundown

### Jump Instructions & Goto Instructions

- Instructions:
    - `JumpInstNode` - Used exclusively for if statements to jump to a specific instruction index based on a comparison
    - `GotoInstNode` - Jump to a specific instruction index

For example, consider the following code (apart of an if statement):

```assembly
jump 6, 11
```

This instruction will jump to instruction index `6`, otherwise it will jump to instruction index `11`.
The index is zero-based, so the first instruction is at index `0`. The index you specify is the
instruction index you want to jump to (not the line number). This will execute the instruction
that is at the specified index and continue executing the instructions sequentially from there.

The only time the instruction index is not incremented is when a `GotoInstNode` instruction is executed.
This instruction will jump to the specified instruction index and continue executing the instructions
sequentially from there.

### Memory Operations

- Instructions:
    - `MovInstNode` - Move a value into a variable in memory
    - `PopInstNode` - Pop a value from the stack and store it in a variable in memory
    - `PushInstNode` - Push a value onto the stack

For example:

```assembly
mov x 10
mov y 5
```

This code will move the value `10` into the variable `x` and the value `5` into the variable `y`.

### Arithmetic Operations

The arithmetic operations are used to perform arithmetic calculations on the stack. Let's consider the following code:

```assembly
push 10
push x
add
pop x
```

This code will push the value `10` onto the stack, push the value of the variable `x` onto the stack,
add the two values together, and then pop the result off the stack and store it in the variable `x`.

### Comparison Operations

The comparison operations are used to compare two values on the stack. Let’s take a simple example:

```assembly
push x
push y
gt
```

This code will push the value of the variable `x` onto the stack, push the value of the variable `y` onto the stack,
and then compare the two values (`gt`). If the value of `x` is greater than the value of `y`, the result will be `true`,
otherwise the result will be `false`.

## Example Program

The following example program demonstrates the functionality of the virtual machine:

### TypeScript Instructions
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

### Low-Level Instructions

```assembly
mov x 10
mov y 5

; If x > y
push x
push y
gt
jump 6, 11
; End if

; Start true block
push 10
push x
add
pop x
goto 15
; End true block

; Start false block
push 5
push x
sub
pop x
; End false block

print x
```