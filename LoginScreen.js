import React from "react";
import firebase from "firebase";
import { YellowBox } from "react-native";

import "@firebase/firestore";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default class LoginScreen extends React.Component {
  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }
  state = {
    email: "",
    password: "",
    displayName: "",
    uid: "",
  };

  signIn = () => {
    const { email, password } = this.state;
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.setState({
            displayName: result.user.displayName,
            uid: result.user.uid,
          });
          console.log("successful sign in!");
          this.props.navigation.navigate("Home", {
            displayName: this.state.displayName,
            uid: this.state.uid,
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      alert(error);
    }
  };
  render() {
    console.log(this.state.displayName);
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Login</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#767676"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#767676"
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: "#484848" }]}
          onPress={() => this.signIn()}
        >
          <Text style={[styles.loginText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn]}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text style={[styles.loginText, { color: "#fff" }]}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00A699",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 32,
    color: "black",
    marginBottom: 40,
  },
  inputText: {
    backgroundColor: "#e8e8e8",
    marginVertical: 8,
    width: "100%",
    padding: 20,
    borderRadius: 8,
    color: "black",
    fontSize: 16,
  },
  loginBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
    borderRadius: 8,
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
