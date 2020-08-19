import React, { Component } from "react";
import { YellowBox } from "react-native";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "../Colors";
export default class TodoModal extends Component {
  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }
  state = {
    newTodo: "",
  };
  triggeralarm() {
    console.log("alarm triggred");
  }
  addTodo = () => {
    let list = this.props.list;
    if (!list.todos.some((todo) => todo.title === this.state.newTodo)) {
      list.todos.push({ title: this.state.newTodo, completed: false });
      this.props.updateList(list);
    }

    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };
  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };
  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);
    this.props.updateList(list);
  };
  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? colors.gray : colors.black,
            },
          ]}
        >
          {todo.title}
        </Text>
        <TouchableOpacity
          onPress={() => this.deleteTodo()}
          style={styles.alarm}
        >
          <AntDesign
            name="delete"
            // style={{ justifyContent: "flex-end", left: 150 }}
            size={16}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const CompletedCount = list.todos.filter((todo) => todo.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="null">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>
          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {CompletedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>
          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(item) => item.title}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  alarm: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
});
