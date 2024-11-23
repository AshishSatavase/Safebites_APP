import {
  View,
  Text,
  Image,
  TextInputBase,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router=useRouter();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          // Navigate to the tabs page if token exists
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);
  return (
    <ScrollView className=" flex-1">
      <Image
        source={require("../assets/images/Login.png")}
        className="h-[400px] w-full object-cover"
      />
      <Text className=" text-center text-3xl font-bold mb-5 color-blue-600">Login</Text>


      <View className="flex justify-center items-center gap-10">
        <View className="flex flex-row items-center border-2 rounded-2xl w-[300px] pl-2">
          <FontAwesome name="user-o" size={20} className=" mx-2" />
          <TextInput placeholder="User Id" className="" />
        </View>


        <View className="flex flex-row items-center border-2 rounded-2xl w-[300px] pl-2">
          <FontAwesome name="lock" size={20} className="mx-2" />
          <TextInput placeholder="Password" className="" secureTextEntry/>
        </View>
        <TouchableOpacity className="bg-blue-500 p-3 w-[300px] rounded-xl">
          <Text className="text-center font-semibold text-xl ">Login</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center mt-10">
        Dont have an account?{" "}
        <Link href={"/signup"} className="color-blue-400 underline font-medium">
          <Text>Register now</Text>
        </Link>{" "}
      </Text>
    </ScrollView>
  );
};

export default Login;
