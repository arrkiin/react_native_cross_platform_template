# Playground for Integration of react-native and react-native-web

This repository is just a playground to fiddle with react-native and react-native-web integrated in one project. The same project is runnable on mobile devices and in the browser.

## Scripts for development and production

* yarn run web-dev: Compiles app with webpack for development with hot reload and opens in bowser
* yarn run web-prod: Compiles app with webpack for production (--mode production) and opens in browser
* yarn run android-dev: Compiles app for android with live and/or hot reload
* yarn run android-prod: Compiles app for android and package it in signed apk
* yarn patch-package: Can be used for patching 3rd party packages without the need of PRs

## Integrated modules

* react-navigation
* react-native-svg / react-native-svg-web
* glamorous-native
* mobx
* mobx-react
* mobx-persistent

## Integrated patches for following modules

Some modules must be patched because of error logs in the browser or problems with the functionalities. Patches can be found in the patches directory. They will be integrated after doing a yarn install. For more information of the behaviour please look into the corresponding project.

* react-navigation
* glamorous-native
* react-native-svg-web
