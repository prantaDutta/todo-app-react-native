import {Button, FormControl, Input, View} from 'native-base'
import React, {ReactNode, useState} from 'react'

interface ICreateUserProps {
  children?: ReactNode
  addUser: (name: string) => void
}

export const CreateUser: React.FC<ICreateUserProps> = ({addUser}) => {
  const [name, setName] = useState('')
  return (
    <View width="100%" paddingX={5}>
      <FormControl mb="3">
        <FormControl.Label _text={{color: 'white'}}>
          Enter Your Name
        </FormControl.Label>
        <Input
          placeholder="Enter Name"
          color="white"
          fontSize="md"
          value={name}
          onChangeText={setName}
        />
        {/* <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage> */}
      </FormControl>

      <Button
        _text={{fontWeight: 'semibold', fontSize: 'lg'}}
        bg="primary.700"
        onPress={() => {
          addUser(name)
        }}>
        Enter
      </Button>
    </View>
  )
}
