# react-native-sethttpdomain

React-Native plugin to set allowed HTTP domains for your app.

# Usage

## react-native addhttpdomain [domain]

Add `domain` to a list of allowed domains in your package.json and commit to the app Info.plist

## react-native removehttpdomain [domain]

Remove `domain` from your package.json, and update Info.plist

## react-native clearhttpdomains

Remove all domains from package.json and Info.plist. (leaves localhost alone)

## react-native link

Applies saved settings from your package.json
