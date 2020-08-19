import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { YellowBox } from "react-native";

import { StyleSheet } from "react-native";
import colors from "./Colors";
import LoginScreen from "./LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./Signup";
import Home from "./Home";
import firebase from "firebase";
import "@firebase/firestore";

const Stack = createStackNavigator();

var firebaseConfig = {
  apiKey: "YourFirebaseApiKey",
  authDomain: "todoapp-xxxx.firebaseapp.com",
  databaseURL: "https://todoapp-xxxx.firebaseio.com",
  projectId: "todoapp-xxxx",
  storageBucket: "todoapp-xxxx.appspot.com",
  messagingSenderId: "yourSenderId",
  appId: "1:yourSenderId:web:yourAppId",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {
  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
