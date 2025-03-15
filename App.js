import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy groceries', completed: false },
    { key: '2', description: 'Clean the house', completed: false },
    { key: '3', description: 'Do homework', completed: false },
  ]);

  const [taskDescription, setTaskDescription] = useState('');

  const toggleTaskCompletion = (key) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (taskDescription.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { key: `${prevTasks.length + 1}`, description: taskDescription, completed: false },
      ]);
      setTaskDescription('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.key)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={taskDescription}
          placeholder="Enter new task"
          onChangeText={setTaskDescription}
          onSubmitEditing={addTask}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskText: {
    marginLeft: 8,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  inputContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    fontSize: 18,
    width: '100%',
  },
});
