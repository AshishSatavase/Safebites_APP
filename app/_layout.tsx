import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@react-navigation/native'
import { colorScheme } from 'nativewind'
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {
  return (
   
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    
  )
}

export default RootLayout
