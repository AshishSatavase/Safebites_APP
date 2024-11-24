import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [detectedText, setDetectedText] = useState<string | null>(null);

  const ocrUrl = 'https://jaided.ai/api/ocr';  // Your OCR API endpoint
  const ocrHeaders = {
    username: 'ashishsatavase',  // Replace with your actual username
    apikey: 'ONrv0k8b4eqMon938xkWaqHTalNFo6ou'  // Replace with your actual API key
  };

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

  // Function to send the image to the OCR API
  
const handleOCR = async () => {
  if (!selectedImage) {
    Alert.alert('Error', 'No image selected.');
    return;
  }
  setLoading(true);
  try {
    let formData = new FormData();

    // Convert the image URI to a Blob
    const response = await fetch(selectedImage);
    const blob = await response.blob();
    
    // Append the image Blob to the FormData
    formData.append('file', {
      uri: selectedImage,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    // Replace 'ocr_url' with your actual OCR API URL
    const ocrResponse = await fetch(ocrUrl, {
      method: 'POST',
     headers:ocrHeaders,
      body: formData,
    });

    if (!ocrResponse.ok) {
      throw new Error('Failed to connect to OCR API');
    }

    const result = await ocrResponse.json();
    console.log(result);
    // Process the response to extract the largest bounding box
    let maxArea = 0;
    let mainText = '';
    let mainBBox = null;

    result.result.forEach(item => {
      const bbox = item.bbox;
      const text = item.text;
      const [x1, y1] = bbox[0];
      const [x2, y2] = bbox[2];

      const area = (x2 - x1) * (y2 - y1);

      if (area > maxArea) {
        maxArea = area;
        mainText = text;
        mainBBox = bbox;
      }
    });

    // Fuzzy matching (if you have product names available in the frontend)
    if (mainText) {
      // Example product names array
      

      console.log(`Detected Text: ${mainText}`);
      
    } else {
      Alert.alert('Message', 'No prominent text detected.');
    }
  } catch (error) {
    console.error('OCR error:', error);
    Alert.alert('Error', 'Failed to process image.');
  }finally{
    setLoading(false);
  }
};

  // Function to clear the selected image
  const retry = () => {
    setSelectedImage(null);
    setDetectedText(null);
  };

  return (
    <View className="flex-1 bg-blue-100 items-center justify-center">
      <Text className="text-2xl font-bold mb-6">Scan Product</Text>

      <View className="flex-row justify-around w-full mb-6">
        <TouchableOpacity className="bg-blue-500 py-4 px-6 rounded-lg" onPress={openCamera}>
          <Text className="text-white text-lg font-semibold">Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 py-4 px-6 rounded-lg" onPress={openGallery}>
          <Text className="text-white text-lg font-semibold">Upload from Gallery</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} className="w-72 h-72 rounded-lg mb-4" />
          <View className="flex-row justify-around w-full">
            <TouchableOpacity className="bg-green-500 py-4 px-6 rounded-lg" onPress={handleOCR}>
              <Text className="text-white text-lg font-semibold">Check Allergy</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 py-4 px-6 rounded-lg" onPress={retry}>
              <Text className="text-white text-lg font-semibold">Retry</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {detectedText && (
        <Text className="text-lg mt-4 font-semibold">{`Detected Text: ${detectedText}`}</Text>
      )}
    </View>
  );
};

export default Scan;
