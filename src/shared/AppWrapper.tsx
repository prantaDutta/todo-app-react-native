import React, {ReactNode} from 'react'
import {RealmContext} from '../lib/realm'
import {HomeScreen} from '../screens/HomeScreen'

interface IAppWrapperProps {
  children?: ReactNode
}

export const AppWrapper: React.FC<IAppWrapperProps> = () => {
  const {RealmProvider} = RealmContext
  return (
    <RealmProvider>
      <HomeScreen />
    </RealmProvider>
  )
}
