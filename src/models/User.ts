import {Realm} from '@realm/react'
import {Task} from './Task'

export class User extends Realm.Object {
  id!: Realm.BSON.ObjectId
  name!: string
  createdAt!: Date
  auth!: boolean
  tasks?: Realm.List<Task>

  static generate(name: string, auth: boolean) {
    return {
      id: new Realm.BSON.ObjectID(),
      name,
      auth,
      createdAt: new Date(),
    }
  }

  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      name: 'string',
      auth: 'bool',
      createdAt: 'date',
      tasks: 'Task[]',
    },
  }
}
