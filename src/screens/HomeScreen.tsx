import {Box, Center, Text} from 'native-base'
import React, {ReactNode, useCallback, useMemo} from 'react'
import {CreateUser} from '../components/CreateUser'
import {TaskManager} from '../components/TaskManager'
import {RealmContext} from '../lib/realm'
import {User} from '../models/User'
import {reactReRender} from '../util/functions'

interface IHomeScreenProps {
  children?: ReactNode
}

const {useQuery, useRealm} = RealmContext

export const HomeScreen: React.FC<IHomeScreenProps> = ({}) => {
  const userDB = useQuery(User)
  const realm = useRealm()

  const currentUser = useMemo(() => userDB.filtered('auth = true')[0], [userDB])

  const addUser = useCallback(
    (name: string) => {
      if (!name) return
      // if existing user not found
      const existingUser = userDB.filtered('name = $0', name)[0]
      if (!existingUser) {
        realm.write(() => {
          realm.create(User.schema.name, User.generate(name, true))
        })
      } else {
        realm.write(() => {
          existingUser.auth = true
        })
      }

      reactReRender()
    },
    [realm, userDB],
  )

  // realm.write(() => realm.deleteAll())

  return (
    <Box flex={1} bg="gray.700">
      <Center>
        <Text color="white" fontWeight="bold" py={2} fontSize="2xl">
          Todo App
        </Text>

        {currentUser ? (
          <TaskManager currentUser={currentUser} />
        ) : (
          <CreateUser addUser={addUser} />
        )}
      </Center>
    </Box>
  )
}
