# To run the program in xcode: 

* navigate to react_native
* run the following:

```
$ react-native upgrade
```
```
$ npm install 
```
```
$ react-native link
```
Kill any active metro bundler:
```
$ kill $(lsof -t -i:8081)
```
Reset watchman:
```
$ watchman watch-del-all
```
* double tap on the Xcode project
* build

# Hot relaoding
* Save your file
* Pres cmd+r to reload javascript

# Worst case to run(if dependacnies are messed up)
1. npm install in directory
2. Make React a target dependency in the XCode Project. 
3. For MaterialFonts error, run 'react-native link react-native-vector-icons'

You possibly might have to also do the following : 
Add third-party and RNVectorIcons as target dependencies.
```
$ cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
$ cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh 
&& cd ../../../../*
```

# Setting Up Google Sign-in

### Grabbing the necessary files

* Login to the Studysmart team drive and go to the 'Important' folder
* Grab the `config.js` file and put it into the project's root directory

### Adding the API_KEY

* Go into `ios` folder and open up `SS.xcworkspace` 
* Drag `GoogleService-Info.plist` file from team drive and put it under 'SS' folder in the XCode Project Navigator
* Click on SS in the XCode Project Navigator 
* Go to 'Info', click on 'URL Types', and in the 'URL Schemes Box' enter in the `REVERSED_CLIENT_ID` from the `GoogleService-Info.plist` file that we grabbed earlier
* Run the following inside the `ios` directory

```bash
# Running these commands gives us the necessary frameworks for google sign-in

# If you don't have cocoa pods installed, run the following command:
$ sudo gem install cocoapods

# Otherwise just this command should work.
# Make sure you are in the Studysmart_react_native/ios/ directory !!!
$ pod install 
   
```

Now you should be able to run the project on XCode cleanly. Make sure you use SS.xcworkspace from now on instead of SS.xcodeproj because we are using cocoa pods.

#### Gitignore (Important)
Please add `/config.js` and `/ios/GoogleService-Info.plist`, to your .gitignore so that we don't accidentally push our API_KEYs onto Github

Also, before you push, go into SS.xcworkspace and go to SS --> Info --> URL types and replace the URL Scheme with ENTER_API_KEY_HERE
