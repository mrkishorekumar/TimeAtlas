---
name: Testing
description: Use this skill when adding tests, modifying business logic, or verifying important application behavior.
---
# Testing Skill

## Purpose

Use this skill when adding tests, modifying business logic, or verifying important application behavior.

---

# General Principle

Test behavior, not implementation details.

Tests should verify what the user or application expects.

---

# TypeScript Check

For TypeScript validation:

```bash
pnpm exec tsc --noEmit
```

---

# Expo Validation

For dependency validation:

```bash
pnpm exec expo install --check
```

For Expo diagnostics:

```bash
pnpm exec expo doctor
```

---

# What to Test

Important logic should cover:

* Happy path
* Empty state
* Error state
* Invalid input
* Boundary conditions
* Loading behavior
* Retry behavior

---

# UI Testing

When UI tests exist, prioritize important user flows.

Examples:

* App launch
* Navigation
* Creating an item
* Editing an item
* Deleting an item
* Form validation
* Error recovery

Do not write tests solely to increase test count.

---

# Regression Testing

When fixing a bug:

1. Add a regression test when practical.
2. Confirm the original issue no longer occurs.
3. Confirm existing behavior still works.

---

# Test Quality

Avoid brittle tests that depend heavily on:

* Internal component implementation
* Exact DOM/component structure
* Timing assumptions
* Arbitrary delays

Prefer testing observable behavior.
