// import { StatusBar } from 'expo-status-bar';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

// Firebase
import * as firebase from 'firebase'

// config
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDU6flc-8cY0Y120KZ6lYd6VDt-PT1Zsig",
  authDomain: "noticeap.firebaseapp.com",
  databaseURL: "https://noticeap.firebaseio.com",
  projectId: "noticeap",
  storageBucket: "noticeap.appspot.com",
  messagingSenderId: "1048357689823",
  appId: "1:1048357689823:web:797dab2362eaa71912cc6a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRoutineName: 'Loading'
    }
  )
)

/* Initial dependences
"dependencies": {
  "expo": "~38.0.8",
  "expo-status-bar": "^1.0.2",
  "react": "~16.11.0",
  "react-dom": "~16.11.0",
  "react-native": "https://github.com/expo/react-native/archive/sdk-38.0.2.tar.gz",
  "react-native-web": "~0.11.7"
},
*/


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}