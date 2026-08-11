---
name: UI Development
description: Use this skill when creating or modifying TimeAtlas screens, components, layouts, typography, colors, spacing, or interactions.
---
# UI Development Skill

## Purpose

Use this skill when creating or modifying TimeAtlas screens, components, layouts, typography, colors, spacing, or interactions.

---

## Design Principles

TimeAtlas UI should feel:

* Modern
* Clean
* Minimal
* Fast
* Consistent
* Easy to understand

Prioritize usability over decorative complexity.

---

## Layout

Use consistent spacing.

Prefer a small spacing scale rather than arbitrary values everywhere.

Avoid deeply nested layouts when a simpler structure works.

---

## Typography

Use a consistent typography hierarchy.

Typical hierarchy:

* Screen title
* Section title
* Body
* Secondary text
* Caption

Do not randomly change font sizes between screens.

---

## Colors

Use centralized theme/color constants when the project has a design system.

Avoid scattering color values throughout components.

Prefer semantic names such as:

```ts
textPrimary
textSecondary
background
surface
border
error
success
```

rather than names such as:

```ts
black2
grey3
blueDark
```

---

## Buttons

Buttons should:

* Have clear labels.
* Have sufficient touch area.
* Show disabled state.
* Show loading state when necessary.
* Provide clear feedback.

Avoid overly small touch targets.

---

## Loading States

Do not leave users looking at a blank screen.

Use appropriate:

* Skeletons
* Activity indicators
* Loading labels
* Placeholder content

depending on the screen.

---

## Empty States

Every list-based screen should consider an empty state.

Example:

```text
No time zones yet
Add a location to get started.
```

Provide a useful action where appropriate.

---

## Error States

Errors should tell users:

1. What happened.
2. Whether they need to do anything.
3. How to retry if retrying is possible.

Avoid technical messages such as:

```text
TypeError: Cannot read property...
```

---

## Accessibility

Every interactive element should have an understandable purpose.

Use accessibility labels where the visible UI does not adequately describe the control.

---

## Responsive Design

Do not design only for one phone size.

Consider:

* Small Android phones
* Large Android phones
* iPhones with notches
* Different screen heights
* Landscape if the application supports it

Avoid hardcoded screen dimensions where possible.

---

## UI Completion Checklist

Before completing a UI task:

* Loading state considered.
* Empty state considered.
* Error state considered.
* Accessibility considered.
* Android/iOS layout considered.
* Small and large screens considered.
* Existing design system reused.
