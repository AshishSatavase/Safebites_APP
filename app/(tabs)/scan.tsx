import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import "../../global.css"

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to open the camera and take a photo
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Camera access is required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Function to open the gallery and select an image
  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Gallery access is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
<View className="flex-1 bg-blue-100  items-center justify-center">
        <Text className="text-2xl font-bold mb-6">Scan Product</Text>

      {/* Buttons to open camera or gallery */}
      <View className="flex-row justify-around w-full mb-6">
        <TouchableOpacity
          className="bg-blue-500 py-4 px-6 rounded-lg"
          onPress={openCamera}
        >
          <Text className="text-white text-lg font-semibold">Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 py-4 px-6 rounded-lg"
          onPress={openGallery}
        >
          <Text className="text-white text-lg font-semibold">
            Upload from Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display the selected image */}
      {selectedImage && (
        <>
          <Image
            source={{ uri: selectedImage }}
            className="w-72 h-72 rounded-lg mb-4"
          />
          <TouchableOpacity className="bg-green-500 py-4 px-6 rounded-lg">
            <Text className="text-white text-lg font-semibold">
              Check Allergy
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Scan;
