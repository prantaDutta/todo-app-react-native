import {Center, Pressable, Text, View} from 'native-base'
import React, {ReactNode} from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import {Task} from '../models/Task'

interface ISingleTaskProps {
  children?: ReactNode
  task: Task & Realm.Object
  toggleTodo: (task: Task & Realm.Object) => void
  handleDelete: (task: Task & Realm.Object) => void
  index: number
}

export const SingleTask: React.FC<ISingleTaskProps> = ({
  task,
  toggleTodo,
  handleDelete,
  index,
}) => {
  return (
    <Center
      padding="3"
      bg="#155e75"
      margin={1}
      justifyContent="space-between"
      flexDirection="row">
      <Pressable onPress={() => toggleTodo(task)}>
        <Text
          style={task.isComplete ? styles.taskStyle : null}
          color="white"
          fontSize="md"
          fontWeight="semibold">
          {`${index + 1}`}. {task.description}
        </Text>
      </Pressable>
      <View flexDirection="row" alignItems="center">
        <Icon
          name="delete"
          size={25}
          color="white"
          onPress={() => handleDelete(task)}
        />
      </View>
    </Center>
  )
}

const styles = StyleSheet.create({
  taskStyle: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
})
