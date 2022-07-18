import {NativeBaseProvider} from 'native-base'
import React from 'react'
import {AppWrapper} from './src/shared/AppWrapper'

const App = () => {
  return (
    <NativeBaseProvider>
      <AppWrapper />
    </NativeBaseProvider>
  )
}

export default App
