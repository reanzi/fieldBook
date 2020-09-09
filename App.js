// import { StatusBar } from 'expo-status-bar';
import React from "react"
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator} from "react-navigation-tabs"
import {Ionicons} from "@expo/vector-icons"

// import firebaseKeys from "./config"

// Screens
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MessageScreen from './screens/MessageScreen'
import NotificationScreen from './screens/NotificationScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
// import OnboardingScreen from "./screens/OnboardingScreen"

// Firebase
import * as firebase from 'firebase'
// import Onboarding from "react-native-onboarding-swiper"

// config
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
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

console.ignoredYellowBox = [
  'Setting a timer'
]
let isLoading = true;
const AppContainer = createStackNavigator(
  // isLoading = false
  {
    default: createBottomTabNavigator(
        {
          Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
        }
      },
      Message: {
        screen: MessageScreen,
          navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
        }
      },
      Post: {
        screen: PostScreen,
          navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add-circle" size={54} color="#E9446A" style={{ shadowColor: "#E9446A", marginTop: -15, shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, shadowOpacity: 0.3 }} />
        }
      },
      Notification: {
        screen: NotificationScreen,
          navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
        }
      },
      Profile: {
        screen: ProfileScreen,
          navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
        }
      }
        },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if( navigation.state.key == "Post") {
              navigation.navigate("postModal")
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: false
        }
      }
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
    // initialRouteName: "postModal"
  }
)

// const OnboardStack = createStackNavigator( {
//       Onboard: OnboardingScreen
//     }
// )

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      // Onboard: OnboardStack,
      App: AppContainer,
      Auth: AuthStack
    },
    {
        initialRoutineName: "Loading"
    }
  )
)
