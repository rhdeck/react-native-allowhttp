# react-native-allowhttp

React-Native plugin to set allowed HTTP settings domains for your app. Modifies the Info.plist of your app. Note that changing these settings will trigger extra App Store review and might make your app insecure if you don't lock down your business logic. The use case is either permitting exotic networking (for specific domains) or allowing older, less-secure networking that is already protected by a VPN. (E.g. servers running in office environments)

# Usage

## react-native allowhttp

Allow all arbitrary network connections. This disables app transport security, so it is up to you to prevent insecure communications.

## react-native disallowhttp

Undo the above

## react-native allowlocalhttp

Allow arbitrary netwprk connections in local network. This usually means unqualified domains and those ending in ".local".

## react-native disallowlocalhttp

Disable the above

## react-native addhttpdomain [domain]

Add `domain` to a list of allowed domains in your package.json and commit to the app Info.plist

## react-native removehttpdomain [domain]

Remove `domain` from your package.json, and update Info.plist

## react-native clearhttpdomains

Remove all domains from package.json and Info.plist. (leaves localhost alone)

## react-native link

Applies saved settings from your package.json
