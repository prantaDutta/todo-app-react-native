import {createRealmContext} from '@realm/react'
import {Task} from '../models/Task'
import {User} from '../models/User'

export const RealmContext = createRealmContext({
  schema: [User, Task],
  deleteRealmIfMigrationNeeded: true,
})
