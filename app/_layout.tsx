import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import "../global.css"


const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
    console.log("Token removed successfully");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

const RootLayout = () => {
  const router=useRouter();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          // Navigate to the tabs page if token exists
          router.navigate("/login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);
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
