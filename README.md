# Fanavard Kid Nums (Hybrid Mobile Development)

The project is written by [**React Native**](https://facebook.github.io/react-native/docs/getting-started.html), 
a javascript framework based on [Node.js](https://nodejs.org/en/download/) that generates native apps.

Because the size of the project is more than **300gb** you have to run it by **npm**.

But don't worry, you will not download 300gb! (Dependecies are zipped)

> Unfortunately, Apple only lets me develop for iOS on a Mac.
Although it was only tested and developed for android, it may works on iOS too.

# Requirements

+ Android Development Requirements (SDK, AVD, NDK, Haxm, etc)

+ [Node.js](https://nodejs.org/en/download/)

+ [Git](https://git-scm.com/downloads) (If you have the source it's not necessary)

# Installation

##### If you don't have the source:

1. Open Git Bash

2. Change the current working directory to the location where you want the cloned directory to be made.

3. `git clone https://github.com/2rajpx/fanavard-kid-nums.git`

##### Dependencies installation

1. `cd fanavard-kid-nums`

2. `npm install`

It may take some time, please be patient.

# Configuration
If you use android sdk `24.0.0`, you don't need any configurations.

But if your emulator runs based on a different api (like `23.0.0`) go to `/andoroid/app/build.gradle` and change it like bellow:

+ `compileSdkVersion: 23`

+ `buildToolsVersion: 23.0.0`

+ `compile "com.android.support:appcompat-v7:23.0.0"`

# Setup
Open your android emulator.

1. `react-native run-android`
You will see a **red screen**. It's OK!

2. `react-native start`

3. After notice `React packager ready` press `Reload` button in your emulator

4. Congratulations!

# Libraries

+ [React Native](https://facebook.github.io/react-native/docs/getting-started.html)

+ [Native Base](http://nativebase.io) : A UI framework for React Native

+ [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

# About Me

**Name:** Tooraj Pourisa Khaitibi

**Email:** 2rajpx@gmail.com
