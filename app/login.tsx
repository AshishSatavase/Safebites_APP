import {
  View,
  Text,
  Image,
  TextInputBase,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View className=" flex-1">
      <Image
        source={require("../assets/images/Login.png")}
        className="h-[400px] w-full object-cover"
      />
      <Text className=" text-center text-3xl font-bold mb-5">Login</Text>
      <View className="flex justify-center items-center ">
        <TextInput
          placeholder="EmailId"
          className="border-2 border-stone-600 w-[300px] self-center m-4 rounded-md p-3"
        />
        <TextInput
          placeholder="Password"
          className="border-2 border-stone-600 w-[300px] self-center m-4 rounded-md p-3"
        />
        <TouchableOpacity className="bg-blue-500 p-3 w-[300px] mt-2 rounded-xl">
          <Text className="text-center font-semibold text-xl ">Login</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center mt-10">Dont have an account?  <Link href={"/signup"} className="color-blue-400 underline font-medium"><Text>Register now</Text></Link> </Text>
    </View>
  );
};

export default Login;
