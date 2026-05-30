---
name: ktx
description: "A collection of Kotlin extensions for Android development that makes working with Android APIs more idiomatic, concise, and pleasant. Maintained by the Android team at Google."
url: https://github.com/android/ktx
stars: 7800
forks: 620
language: Kotlin
tags: ["android", "kotlin", "extensions", "mobile", "google"]
featured: false
publishedAt: 2024-09-10
---

## Android KTX

Android KTX is a set of Kotlin extensions that wraps Android framework APIs to be more concise and idiomatic to use from Kotlin. It doesn't add new functionality — it makes existing APIs nicer to use.

### Why it matters

Android's Java APIs predate Kotlin's modern language features. KTX bridges that gap with extension functions, lambdas, named parameters, and default arguments that make Android development feel natural in Kotlin.

### Key Modules

- **core-ktx** — Core Android framework extensions (Context, Resources, SharedPreferences)
- **fragment-ktx** — Fragment management with Kotlin DSL
- **navigation-ktx** — Type-safe navigation
- **collection-ktx** — ArrayMap, LongSparseArray, and other collection helpers
- **palette-ktx** — Palette color extraction
- **sqlite-ktx** — SQLite database operations

### Example

```kotlin
// Before KTX
sharedPreferences.edit().putString("key", "value").apply()

// With KTX
sharedPreferences.edit { putString("key", "value") }
```

### Language & Stack

Kotlin · Apache 2.0 License · Maintained by Google
