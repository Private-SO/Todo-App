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

export default class Signup extends React.Component {
  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }
  state = {
    email: "",
    password: "",
    displayName: "",
  };

  signUp = () => {
    const { email, password, displayName } = this.state;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log("Signup successfully");
          this.props.navigation.navigate("LoginScreen");
          return result.user.updateProfile({
            displayName: displayName,
          });
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Register</Text>
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
        <TextInput
          style={styles.inputText}
          placeholder="Display Name..."
          placeholderTextColor="#767676"
          onChangeText={(text) => this.setState({ displayName: text })}
        />
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: "#484848" }]}
          onPress={() => this.signUp()}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn]}
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        >
          <Text style={[styles.loginText, { color: "#fff" }]}>Login</Text>
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
