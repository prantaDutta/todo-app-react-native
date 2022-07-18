import {Box, Button, FlatList, Text, View} from 'native-base'
import React, {ReactNode, useCallback, useMemo} from 'react'

import {RealmContext} from '../lib/realm'
import {Task} from '../models/Task'
import {User} from '../models/User'
import {reactReRender} from '../util/functions'
import {AddTodo} from './AddTodo'
import {SingleTask} from './SingleTask'

interface ITaskManagerProps {
  children?: ReactNode
  currentUser: User & Realm.Object
}

const {useQuery, useRealm} = RealmContext

export const TaskManager: React.FC<ITaskManagerProps> = ({currentUser}) => {
  const realm = useRealm()
  const taskDB = useQuery(Task)

  const tasks = useMemo(() => {
    const allTasks = taskDB
      .sorted('createdAt')
      .filtered('assignee.name = $0', currentUser.name)
    // console.log('assignee: ', allTasks[0]?.assignee)
    return allTasks
  }, [currentUser.name, taskDB])

  // console.log('tasks :>> ', tasks)

  const handleDelete = useCallback(
    (task: Task & Realm.Object) => {
      realm.write(() => {
        // Delete the task from the realm.
        realm.delete(task)
        // Discard the reference.
        //   task = null
      })

      reactReRender()
    },
    [realm],
  )

  const toggleTodo = useCallback(
    (task: Task & Realm.Object) => {
      realm.write(() => {
        task.isComplete = !task.isComplete
      })

      reactReRender()
    },
    [realm],
  )

  const handleAdd = useCallback(
    (description: string) => {
      realm.write(() => {
        const newTask = realm.create(
          Task.schema.name,
          Task.generate(description),
        )
        const user: any = realm
          .objects<User>(User.schema.name)
          .filtered('name = $0', currentUser.name)[0]
        user.tasks = [...user.tasks, newTask]
      })

      reactReRender()
    },
    [currentUser, realm],
  )

  return (
    <Box width="100%">
      <AddTodo handleAdd={handleAdd} />
      <Text
        color="white"
        fontWeight="semibold"
        fontSize="xl"
        underline
        my="5"
        textAlign="center">
        All Tasks by {currentUser.name}
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={task => task.id.id.toString()}
        paddingX={5}
        renderItem={({item: task, index}) => {
          return (
            <SingleTask
              task={task}
              index={index}
              handleDelete={handleDelete}
              toggleTodo={toggleTodo}
            />
          )
        }}
      />

      {tasks?.length === 0 ? (
        <Text
          fontWeight="semibold"
          color="white"
          fontSize="xl"
          textAlign="center">
          No Tasks Found
        </Text>
      ) : null}
      <View width="100%" paddingX={5} marginTop={3}>
        <Button
          _text={{fontWeight: 'semibold', fontSize: 'lg'}}
          bg="primary.700"
          onPress={() => {
            realm.write(() => {
              // realm.delete(currentUser.name)
              const user = realm
                .objects<User>(User.schema.name)
                .filtered('name = $0', currentUser.name)
              console.log('user: ', user)
              user[0].auth = false
            })

            reactReRender()
          }}>
          Cancel User
        </Button>
      </View>
    </Box>
  )
}
