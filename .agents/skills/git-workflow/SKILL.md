---
name: Git Workflow
description: Use this skill when working with Git, reviewing changes, preparing commits, or inspecting project history.
---
# Git Workflow Skill

## Purpose

Use this skill when working with Git, reviewing changes, preparing commits, or inspecting project history.

---

# General Rules

Keep changes focused.

Do not modify unrelated files.

Do not create commits unless explicitly requested.

---

# Before Changes

Inspect the current state:

```bash
git status
```

Understand existing modifications before editing files.

Never overwrite user changes without permission.

---

# After Changes

Review:

```bash
git status
```

and:

```bash
git diff
```

Check that only expected files changed.

---

# Commits

Only create a commit when explicitly requested.

Use clear commit messages.

Examples:

```text
feat: add timezone selection
fix: resolve timezone loading issue
refactor: simplify time formatting
chore: update Expo dependencies
```

---

# Dangerous Commands

Never run destructive commands without explicit approval:

```bash
git reset --hard
git clean -fd
git checkout -- .
```

These can destroy user work.

---

# Pull Requests

When preparing a PR, summarize:

* What changed
* Why it changed
* Important implementation details
* Testing performed
* Known limitations

Keep the PR focused.
