import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignUp = () => {
  return (
    <View>
        <Image
        source={require("../assets/images/Signup.png")}
        className="h-[400px] w-full object-cover"
      />
      <Text className='text-center text-3xl font-bold mb-10'>Sign Up</Text>
      <View className='flex justify-center items-center'>
        <TextInput placeholder='Enter Name' className='w-[300px] p-3 border-2 border-stone-500 '/>
        <Link href={'./(tabs)'}>tabs</Link>
      </View>
    </View>
  )
}

export default SignUp