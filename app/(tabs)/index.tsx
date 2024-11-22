import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Index = () => {
  const router=useRouter();
  const onLogin=()=>{
    router.navigate("./login");    
  }
  return (
    <View className='flex justify-center items-center flex-1'>
      <Text className='text-center'>index of tab</Text>
      <TouchableOpacity className='bg-fuchsia-400 w-[70px] p-3 text-center'>
        <Text className='w-full text-center' onPress={onLogin}>Helo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Index;