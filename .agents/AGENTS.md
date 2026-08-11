# TimeAtlas — AI Development Rules

## Project Overview

TimeAtlas is a React Native mobile application built with Expo.

The project uses:

* React Native
* Expo SDK 57
* TypeScript
* pnpm
* Expo Router, if already configured in the project
* Android and iOS as target platforms

The goal is to build a clean, maintainable, production-quality mobile application.

---

# 1. Package Manager

This project uses **pnpm**.

Always use pnpm commands instead of npm or yarn.

### Preferred commands

```bash
pnpm install
pnpm add <package>
pnpm add -D <package>
pnpm remove <package>
pnpm exec <command>
pnpm run <script>
```

Do NOT use:

```bash
npm install
npm i
yarn add
```

unless explicitly requested.

For Expo packages, prefer:

```bash
pnpm exec expo install <package>
```

instead of:

```bash
pnpm add <package>
```

when Expo recommends a specific compatible version.

---

# 2. Expo Version

The project currently targets:

**Expo SDK 57**

Do not upgrade or downgrade the Expo SDK without explicitly discussing the impact first.

When adding Expo-related packages:

```bash
pnpm exec expo install <package>
```

After dependency changes, check compatibility:

```bash
pnpm exec expo install --check
```

If dependencies are incompatible, use:

```bash
pnpm exec expo install --fix
```

Do not blindly upgrade packages to their latest versions.

Always prioritize compatibility with Expo SDK 57.

---

# 3. React Native

Use React Native APIs and patterns compatible with the Expo SDK 57 / React Native version used by this project.

Prefer built-in React Native functionality before introducing a new dependency.

Before adding a package, consider:

1. Does React Native already provide this functionality?
2. Does Expo provide this functionality?
3. Is the dependency compatible with Expo SDK 57?
4. Does the dependency require native configuration?
5. Is the dependency actively maintained?

Avoid unnecessary dependencies.

---

# 4. TypeScript

Use TypeScript throughout the project.

Prefer explicit and meaningful types.

Avoid:

```ts
any
```

unless there is a genuine reason.

Prefer:

```ts
unknown
```

when the type is genuinely unknown.

Create reusable types instead of duplicating complex type definitions.

Keep business/domain types separate from UI component types when appropriate.

---

# 5. Code Quality

Write code that is:

* Simple
* Readable
* Maintainable
* Reusable
* Testable

Prefer small components and functions.

Avoid unnecessarily complicated abstractions.

Do not introduce a design pattern just because it is popular.

Use the simplest solution that solves the problem correctly.

---

# 6. Component Design

Prefer functional React components.

Use hooks appropriately.

Keep components focused on one responsibility.

Avoid very large components.

If a component becomes difficult to understand, consider extracting:

* Subcomponents
* Hooks
* Utility functions
* Constants
* Types

Do not prematurely split tiny components into many files.

---

# 7. UI Development

TimeAtlas should have a clean, modern mobile UI.

Prioritize:

* Consistent spacing
* Consistent typography
* Accessibility
* Responsive layouts
* Proper safe-area handling
* Keyboard handling
* Android and iOS compatibility
* Smooth animations
* Good loading states
* Good empty states
* Good error states

Avoid hardcoding platform-specific behavior unless necessary.

Use `Platform` when Android and iOS genuinely require different behavior.

---

# 8. Styling

Keep styling consistent across the application.

Prefer `StyleSheet.create()` for reusable component styles.

Avoid excessive inline styles.

Do not introduce a UI library without discussing it first.

Before adding a new styling dependency, check whether the existing project architecture already provides the required functionality.

---

# 9. Navigation

If Expo Router is present, use Expo Router conventions.

Do not introduce another navigation library unless explicitly requested.

Keep navigation logic separate from business logic.

Avoid putting complex application logic directly inside route files.

---

# 10. State Management

Prefer the simplest state management solution that meets the requirement.

Use:

* Local component state for local UI state.
* Context when state genuinely needs to be shared.
* Existing project state-management solutions if already configured.

Do not introduce Redux, Zustand, MobX, or another state-management library unless there is a clear requirement.

---

# 11. Data and API

Keep API/network logic separate from UI components.

Do not make API calls directly inside large UI components when a service/hook abstraction is more appropriate.

Handle:

* Loading
* Success
* Empty
* Error
* Retry

states explicitly.

Never hardcode secrets, API keys, tokens, or credentials in source code.

---

# 12. Environment Variables

Never commit secrets.

Use Expo-supported environment configuration when environment variables are required.

Never put private credentials into client-side code unless they are explicitly designed to be public.

---

# 13. Error Handling

Do not silently swallow errors.

Avoid:

```ts
try {
  ...
} catch {}
```

Errors should either be:

* handled meaningfully,
* logged appropriately,
* or propagated to a layer that can handle them.

User-facing errors should be understandable and actionable.

Do not expose internal stack traces or sensitive information to users.

---

# 14. Performance

Performance matters for TimeAtlas.

Avoid unnecessary:

* Re-renders
* Expensive calculations during render
* Large component trees
* Unnecessary state updates
* Repeated API requests

Use memoization only when it provides a real benefit.

Do not add `useMemo`, `useCallback`, or `memo` everywhere without a reason.

For lists, use `FlatList` or an appropriate virtualized list instead of rendering large arrays directly.

---

# 15. Accessibility

UI should be usable with accessibility technologies.

When appropriate:

* Add accessibility labels.
* Add meaningful accessibility roles.
* Ensure touch targets are large enough.
* Do not communicate important information through color alone.
* Ensure text has sufficient contrast.
* Support dynamic content where practical.

---

# 16. Platform Compatibility

Always consider both:

* Android
* iOS

When implementing a feature, check whether the behavior differs between platforms.

Do not assume Android behavior automatically matches iOS.

Do not modify native Android/iOS files unless necessary.

If native changes are required, explain why before making extensive changes.

---

# 17. Dependency Changes

Before installing a dependency:

1. Check whether Expo/RN already provides the feature.
2. Check Expo SDK 57 compatibility.
3. Check whether it requires native code.
4. Check whether it works with Expo Go.
5. Check whether a development build is required.

After installing:

```bash
pnpm exec expo install --check
```

Do not randomly upgrade unrelated dependencies.

---

# 18. File Organization

Follow the existing project structure when one exists.

Do not reorganize the entire project unless explicitly requested.

Prefer logical separation such as:

```text
src/
├── components/
├── screens/
├── hooks/
├── services/
├── utils/
├── constants/
├── types/
└── ...
```

If Expo Router is used:

```text
app/
├── _layout.tsx
├── index.tsx
└── ...
```

Do not force this exact structure if the project already uses a different valid structure.

---

# 19. Naming

Use descriptive names.

Components:

```text
UserProfile.tsx
ChatMessage.tsx
TimeZoneCard.tsx
```

Hooks:

```text
useUser.ts
useTimeZone.ts
```

Utilities:

```text
formatTime.ts
validateEmail.ts
```

Avoid unclear names such as:

```text
data.ts
helper.ts
common.ts
utils2.ts
temp.ts
```

unless their purpose is genuinely clear.

---

# 20. Comments

Prefer self-explanatory code.

Add comments when explaining:

* Why something is done
* A platform-specific workaround
* A non-obvious business rule
* A temporary workaround
* A performance decision

Do not add comments that simply restate the code.

Bad:

```ts
// Set loading to true
setLoading(true);
```

Good:

```ts
// Keep the previous result visible while refreshing to avoid UI flicker.
```

---

# 21. Changes and Refactoring

When implementing a feature:

1. Understand the existing implementation.
2. Reuse existing patterns.
3. Make the smallest reasonable change.
4. Avoid unrelated refactoring.
5. Verify the result.

Do not rewrite working code unnecessarily.

---

# 22. Debugging

When fixing a bug:

1. Reproduce or understand the error.
2. Identify the root cause.
3. Fix the root cause.
4. Avoid symptom-only fixes.
5. Check for regressions.
6. Verify the relevant platform(s).

Do not randomly change multiple files hoping the problem disappears.

---

# 23. Testing

When changing important logic:

* Add or update tests when a testing setup exists.
* Test edge cases.
* Test error states.
* Test loading states.
* Test Android/iOS differences where relevant.

At minimum, verify:

```bash
pnpm exec tsc --noEmit
```

and:

```bash
pnpm exec expo install --check
```

when appropriate.

---

# 24. Git

Keep changes focused.

Do not modify unrelated files.

Do not create commits unless explicitly requested.

Never run destructive Git commands without confirmation.

Avoid:

```bash
git reset --hard
git clean -fd
```

unless explicitly requested.

---

# 25. Before Completing a Task

Before saying a task is complete:

1. Check TypeScript errors.
2. Check Expo dependency compatibility when dependencies changed.
3. Review changed files.
4. Check for accidental debug code.
5. Check for hardcoded secrets.
6. Check Android/iOS impact.
7. Mention any remaining limitations.

Do not claim something was tested if it was not actually tested.

---

# 26. AI Behavior

When working on TimeAtlas:

* Understand existing code before modifying it.
* Prefer existing project patterns.
* Ask for clarification only when the requirement is genuinely ambiguous.
* Do not make unnecessary architectural changes.
* Do not install dependencies without a reason.
* Do not upgrade Expo automatically.
* Keep changes minimal and focused.
* Explain important architectural decisions.
* Prioritize correctness over speed.

When there are multiple valid approaches, choose the simplest maintainable approach and briefly explain why.

---

# 27. Project-Specific Priority

When rules conflict, prioritize in this order:

1. User's explicit request
2. Existing project architecture
3. This AGENTS.md
4. Relevant skill instructions
5. General best practices

Never override an explicit user requirement merely because another approach is preferred.