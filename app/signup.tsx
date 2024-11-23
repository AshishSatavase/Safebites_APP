import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome

const SignUp: React.FC = () => {
  const [selectedAllergy, setSelectedAllergy] = useState<string>("");
  const [dietPreference, setDietPreference] = useState<"veg" | "nonveg">("veg");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Image Picker Function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={require("../assets/images/Signup.png")}
        className="h-[300px] w-full object-cover"
      />
      <Text className="text-center text-3xl font-bold mb-5 color-blue-600 mt-5">Signup!!</Text>

      {/* Form Section */}
      <View className="flex justify-center items-center gap-6">
        {/* Username Input */}
        <View className="flex flex-row items-center border-2 rounded-2xl w-[300px] pl-2">
          <FontAwesome name="user-o" size={20} className="mx-2" />
          <TextInput placeholder="Enter Username" className="flex-1 p-3" />
        </View>

        {/* Password Input */}
        <View className="flex flex-row items-center border-2 rounded-2xl w-[300px] pl-2">
          <FontAwesome name="lock" size={20} className="mx-2" />
          <TextInput
            placeholder="Enter Password"
            secureTextEntry
            className="flex-1 p-3"
          />
        </View>

        {/* Confirm Password Input */}
        <View className="flex flex-row items-center border-2 rounded-2xl w-[300px] pl-2">
          <FontAwesome name="lock" size={20} className="mx-2" />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            className="flex-1 p-3"
          />
        </View>

        {/* Allergies Picker */}
        <Picker
          selectedValue={selectedAllergy}
          onValueChange={(itemValue) => setSelectedAllergy(itemValue)}
          style={{ height: 70, width: 300 }}
        >
          <Picker.Item label="Select Your Allergy" value="" />
          <Picker.Item label="Dairy" value="dairy" />
          <Picker.Item label="Shellfish" value="shellfish" />
          <Picker.Item label="Peanuts" value="peanuts" />
          <Picker.Item label="Tree Nuts" value="tree_nuts" />
          <Picker.Item label="Egg" value="egg" />
        </Picker>

        {/* Diet Preference Radio Buttons */}
        <View className="flex-row justify-around w-[300px] my-4">
          {/* Veg Radio Button */}
          <View className="flex-row items-center">
            <RadioButton
              value="veg"
              status={dietPreference === "veg" ? "checked" : "unchecked"}
              onPress={() => setDietPreference("veg")}
              color="green"
            />
            <Text className=" font-medium">Veg</Text>
          </View>

          {/* Non-Veg Radio Button */}
          <View className="flex-row items-center">
            <RadioButton
              value="nonveg"
              status={dietPreference === "nonveg" ? "checked" : "unchecked"}
              onPress={() => setDietPreference("nonveg")}
              color="maroon"
            />
            <Text className=" font-medium">Non-Veg</Text>
          </View>
        </View>

        {/* Profile Photo Upload */}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-gray-300 p-3 w-[300px] rounded-md mb-4"
        >
          <Text className="text-center">
            {profileImage ? "Change Profile Photo" : "Upload Profile Photo"}
          </Text>
        </TouchableOpacity>
        {profileImage && (
          <Image
            source={{ uri: profileImage }}
            className="h-20 w-20 rounded-full mb-4"
          />
        )}

        {/* Sign-Up Button */}
        <TouchableOpacity className="bg-blue-500 p-3 w-[300px] rounded-xl mb-32">
          <Text className="text-center font-semibold text-xl text-white ">
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;
