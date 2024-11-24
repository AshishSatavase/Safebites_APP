import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import "../../global.css";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Profile = () => {
  // Sample user data (replace with dynamic data)
  const [user, setUserData] = useState<{ name: string;age:string; allergy: string; dietPreference: string } | null>(null);

  // Fetch user data from AsyncStorage
  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Retrieve token
      if (token) {
        const user = JSON.parse(token); // Parse token into an object
        setUserData(user); // Set the user data state
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Token removed successfully");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };
const logout=()=>{
  removeToken();
  router.navigate("/login");
}
  // Fetch data when the component mounts
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>

      {user?(
        <>
        <View className="h-full flex flex-col items-center bg-white ">
        {/* Top Section */}
        <View className="h-[250px] w-full flex justify-center items-center">
          <Image
            source={require("../../assets/images/Login.png")} // Replace with actual path
            className="h-[120px] w-[120px] object-cover border-2 border-stone-800 rounded-full"
          />
          <Text className="text-blue-600 font-semibold text-4xl mt-3">{user.name}</Text>
        </View>
  
        {/* User Details Section */}
        <View className="items-start p-10  gap-5 w-full ">
          {/* Age */}
          <View className='w-full'>

          <Text className="text-2xl text-blue-600 font-bold mb-5 text-center  w-full">User Details</Text>
          </View>


          <View>
          <Text className="text-2xl text-gray-800 mb-2"><Text className="font-semibold">Age:</Text> {user.age}</Text>
          <View className='w-[350px] h-1 border-b-2 border-stone-300 shadow-md'></View>
          </View>
  
          {/* Dietary Preferences */}
          <View>
          <Text className="text-2xl text-gray-800 mb-2">
            <Text className="font-semibold">Dietary Preferences:</Text>   {user.dietPreference}
          </Text>
          <View className='w-[350px] h-1 border-b-2 border-stone-300 shadow-md'></View>
          </View>

  
          {/* Allergies */}
          <View>
          <Text className="text-2xl text-gray-800 mb-2">
            <Text className="font-semibold">Allergies:</Text> {user.allergy}
          </Text>
          <View className='w-[350px] h-1 border-b-2 border-stone-300 shadow-md'></View>
          </View>
              
        </View>

        <TouchableOpacity className='bg-red-500 p-4 w-[350px] rounded-xl flex-row justify-center items-center' onPress={logout}>
          <SimpleLineIcons name='logout' className=" mr-5" size={25} ></SimpleLineIcons>
          <Text className='text-white text-center font-semibold text-3xl'>Logout</Text>
        </TouchableOpacity>
      </View>
  
        </>):(<Text>Loading</Text>)
        
      }
    </View>
    
  );
};

export default Profile;
