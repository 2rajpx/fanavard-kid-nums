# Fanavard Kid Nums
Because the size of the project is more than 300gb you have to run it by Git.
But don't worry, you will not download 300gb! (Dependecies are zipped)

# Installing

1-Open Git Bash

2-Change the current working directory to the location where you want the cloned directory to be made.

3-`git clone https://github.com/2rajpx/fanavard-kid-nums.git`

4-`cd fanavard-kid-nums`

5-`npm install`

6-open your android emulator. Recomended api is `24.0.0`
If your emulator uses a different api (like `23.0.0`) go to `/andoroid/app/build.gradle`
and change it like bellow:
```
compileSdkVersion: 23
buildToolsVersion: 23.0.0
compile "com.android.support:appcompat-v7:23.0.0"
```

7-react-native run-android
You will see a red screen. It's OK!

8-react-native start

9-After notice `React packager ready` press `Reload` button in your emulator

10-Congratulations!