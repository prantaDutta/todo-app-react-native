import {Realm} from '@realm/react'
import {User} from './User'

export class Task extends Realm.Object {
  id!: Realm.BSON.ObjectId
  description!: string
  isComplete!: boolean
  createdAt!: Date
  assignee!: Realm.Results<User>

  static generate(description: string) {
    return {
      id: new Realm.BSON.ObjectId(),
      description,
      isComplete: false,
      // assignee: [
      //   {
      //     name: assignee.name,
      //   },
      // ],
      createdAt: new Date(),
    }
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      description: 'string',
      isComplete: {type: 'bool', default: false},
      createdAt: 'date',
      assignee: {
        type: 'linkingObjects',
        objectType: 'User',
        property: 'tasks',
      },
    },
  }
}
