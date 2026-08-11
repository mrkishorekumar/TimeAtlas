---
name: Debugging
description: Use this skill when fixing errors, crashes, unexpected behavior, build problems, or runtime issues.
---
# Debugging Skill

## Purpose

Use this skill when fixing errors, crashes, unexpected behavior, build problems, or runtime issues.

---

# Debugging Process

Always follow this order:

## 1. Understand

Read the error carefully.

Identify:

* Error type
* File
* Line
* Stack trace
* Platform
* Whether it occurs during build or runtime

---

## 2. Reproduce

Try to identify the smallest reproducible scenario.

Do not immediately change code.

---

## 3. Identify Root Cause

Separate:

```text
Root cause
```

from:

```text
Symptom
```

Fix the root cause whenever possible.

---

## 4. Make the Smallest Fix

Avoid changing unrelated code.

Do not rewrite entire files unless necessary.

---

## 5. Verify

Run appropriate checks.

Examples:

```bash
pnpm exec tsc --noEmit
pnpm exec expo doctor
pnpm exec expo install --check
```

Run the application when possible.

---

# Expo Problems

For Expo problems, first check:

```bash
pnpm exec expo doctor
```

Then:

```bash
pnpm exec expo install --check
```

For Metro issues:

```bash
pnpm exec expo start --clear
```

---

# Dependency Problems

Check:

```bash
pnpm list <package>
```

Check Expo compatibility:

```bash
pnpm exec expo install --check
```

Do not solve dependency problems by randomly installing the latest version.

---

# Android Problems

Check:

* Android SDK
* Gradle errors
* Native module compatibility
* Device/emulator state
* Permissions
* Platform-specific code

---

# iOS Problems

Check:

* CocoaPods
* Xcode
* Native module compatibility
* iOS deployment target
* Permissions
* Platform-specific code

---

# Debug Logging

Use temporary logs when needed.

Remove unnecessary debug logs before completing the task.

Never log:

* Passwords
* Tokens
* API keys
* Personal data
* Authentication credentials

---

# Completion

Before declaring the issue fixed:

* Root cause identified.
* Fix applied.
* Relevant checks performed.
* No unrelated changes introduced.
* Remaining limitations mentioned.
