import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { YellowBox } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import colors from "./Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import firebase from "firebase";
import "@firebase/firestore";
import Fire from "./Fire";

class Home extends Component {
  state = {
    addTodoVisible: false,
    lists: [],
    loading: true,
  };

  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);

    test = new Fire();
    test.getLists((lists) => {
      this.setState({ lists }, () => {
        this.setState({ loading: false });
      });
    });
  }

  componentWillUnmount() {
    test.detach();
  }

  toggleAddTodoModel() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  logOut() {
    try {
      firebase.auth().signOut();
      console.log("Loggout");
      this.props.navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    test.addList({ name: list.name, color: list.color, todos: [] });
  };

  updateList = (list) => {
    test.updateList(list);
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModel}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModel()}
            addList={this.addList}
          />
        </Modal>
        <View>
          <TouchableOpacity style={styles.logOut} onPress={() => this.logOut()}>
            <FontAwesome name="sign-out" size={24} color={colors.red} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Welcome{" "}
            <Text style={{ fontWeight: "bold", color: colors.blue }}>
              {this.props.route.params.displayName}
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModel()}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
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
    fontSize: 30,
    fontWeight: "300",
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
  logOut: {
    position: "absolute",
    top: -50,
    left: 150,
  },
});

export default Home;
