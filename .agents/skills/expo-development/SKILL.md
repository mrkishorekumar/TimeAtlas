---
name: Expo Development
description: Use this skill when working on Expo configuration, Expo packages, SDK upgrades, builds, development servers, Expo Go, or development builds.
---
# Expo Development Skill

## Purpose

Use this skill when working on Expo configuration, Expo packages, SDK upgrades, builds, development servers, Expo Go, or development builds.

## Project Version

TimeAtlas uses:

* Expo SDK 57
* pnpm
* React Native compatible with Expo SDK 57

Do not upgrade Expo SDK without explicit approval.

---

## Package Installation

For Expo packages:

```bash
pnpm exec expo install <package>
```

For normal JavaScript packages:

```bash
pnpm add <package>
```

For development-only packages:

```bash
pnpm add -D <package>
```

---

## Dependency Validation

After dependency changes:

```bash
pnpm exec expo install --check
```

If Expo reports incompatible versions:

```bash
pnpm exec expo install --fix
```

Do not manually choose package versions when Expo can determine the compatible version.

---

## Starting Development

Preferred:

```bash
pnpm exec expo start
```

Useful options:

```bash
pnpm exec expo start --android
pnpm exec expo start --ios
pnpm exec expo start --clear
```

Use `--clear` when Metro cache issues are suspected.

---

## Expo Go

Expo Go must support the project's Expo SDK.

If Expo Go reports:

```text
Project is incompatible with this version of Expo Go
```

check:

1. Project Expo SDK version.
2. Installed Expo Go version.
3. Whether the installed Expo Go supports that SDK.
4. Whether a development build is required.

Do not immediately downgrade the project.

---

## Development Builds

Use a development build when:

* A native package is required.
* Expo Go does not contain the required native module.
* Custom native configuration is required.
* The project needs native functionality unavailable in Expo Go.

Typical workflow:

```bash
pnpm exec expo install expo-dev-client
```

Then configure the development build according to the current Expo project setup.

---

## Expo Configuration

Before changing:

```text
app.json
app.config.js
app.config.ts
```

understand whether the project uses static or dynamic Expo configuration.

Do not convert configuration formats unnecessarily.

---

## Native Changes

Do not manually modify:

```text
android/
ios/
```

unless the project is configured to use native directories and the change is required.

Prefer Expo config plugins and supported Expo configuration where possible.

---

## Troubleshooting

When Expo behaves unexpectedly:

```bash
pnpm exec expo doctor
```

Then:

```bash
pnpm exec expo install --check
```

If Metro appears corrupted:

```bash
pnpm exec expo start --clear
```

Do not delete lockfiles or node_modules as the first troubleshooting step.

If reinstalling dependencies becomes necessary:

```bash
rm -rf node_modules
pnpm install
```

Do not delete `pnpm-lock.yaml` unless there is a specific reason.

---

## Completion Checklist

Before completing Expo-related work:

* Expo SDK remains compatible.
* Dependencies are compatible.
* TypeScript passes where applicable.
* No unnecessary Expo upgrades were introduced.
* Android and iOS impact was considered.
