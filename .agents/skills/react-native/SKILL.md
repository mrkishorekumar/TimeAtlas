---
name: React Native Development
description: Use this skill for React Native components, hooks, performance, platform-specific behavior, animations, lists, and native functionality.
---
# React Native Development Skill

## Purpose

Use this skill for React Native components, hooks, performance, platform-specific behavior, animations, lists, and native functionality.

---

## Components

Prefer functional components.

Example:

```tsx
type Props = {
  title: string;
};

export function TimeCard({ title }: Props) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
```

Keep components focused.

If a component becomes large, identify whether logic should move into:

* Custom hooks
* Child components
* Services
* Utilities

---

## Hooks

Use hooks for reusable stateful behavior.

Examples:

```text
useTimeZone.ts
useTheme.ts
useNetworkStatus.ts
```

Do not create hooks merely to wrap one trivial line of code.

---

## Performance

Avoid premature optimization.

First identify the actual performance problem.

For large lists, prefer:

```tsx
<FlatList />
```

instead of:

```tsx
items.map(...)
```

Use:

* `FlatList`
* `SectionList`
* virtualization
* memoization

when actually beneficial.

---

## Platform Differences

Use:

```ts
Platform.OS
```

or platform-specific files when behavior genuinely differs.

Examples:

```text
Component.android.tsx
Component.ios.tsx
```

Do not duplicate entire components unnecessarily.

---

## Safe Areas

Account for:

* Status bar
* Notches
* Home indicators
* Navigation bars

Use the project's existing safe-area solution consistently.

Do not implement multiple competing safe-area systems.

---

## Keyboard

Forms and text inputs must handle the keyboard correctly.

Consider:

* KeyboardAvoidingView
* ScrollView
* keyboard dismissal
* Android behavior
* iOS behavior

Do not allow the keyboard to permanently cover important controls.

---

## Images

Optimize images appropriately.

Avoid unnecessarily loading huge assets.

Use appropriate image sizing and caching strategies.

---

## Animations

Prefer smooth, platform-appropriate animations.

Avoid expensive JavaScript-driven animations when a native/UI-thread solution is appropriate and already supported by the project's dependencies.

Do not introduce an animation library unless needed.

---

## Native Modules

Before adding a native module:

1. Check Expo compatibility.
2. Check whether Expo already provides the functionality.
3. Determine whether Expo Go supports it.
4. Determine whether a development build is required.

Never assume a native package works inside Expo Go.

---

## Completion Checklist

For React Native changes:

* Android considered.
* iOS considered.
* Accessibility considered.
* Performance considered.
* No unnecessary dependency introduced.
* TypeScript types are correct.
