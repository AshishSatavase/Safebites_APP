import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@react-navigation/native'
import { colorScheme } from 'nativewind'
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {
  return (
   
      <Stack>
        <Stack.Screen name='index' />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='login' options={{ headerShown: false }} />
        <Stack.Screen name='signup'  />

      </Stack>
    
  )
}

export default RootLayout
