import {Box, Button, FormControl, Input} from 'native-base'
import React, {ReactNode, useState} from 'react'
import {Keyboard} from 'react-native'

interface IAddTodoProps {
  children?: ReactNode
  handleAdd: (description: string) => void
}

export const AddTodo: React.FC<IAddTodoProps> = ({handleAdd}) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const addTodo = () => {
    if (!value) {
      setError('Enter A Task')
      return
    }

    handleAdd(value)
    setValue('')
    setError('')
    Keyboard.dismiss()
  }
  return (
    <Box width="100%" paddingX={5}>
      <FormControl mb="3" isInvalid={!!error}>
        <FormControl.Label _text={{color: 'white'}}>
          Enter Description
        </FormControl.Label>
        <Input
          placeholder="Enter Todo"
          color="white"
          fontSize="md"
          value={value}
          onChangeText={setValue}
        />
        <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      </FormControl>

      <Button
        _text={{fontWeight: 'semibold', fontSize: 'lg'}}
        bg="primary.700"
        onPress={addTodo}>
        Add Todo
      </Button>
    </Box>
  )
}
