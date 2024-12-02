import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [detectedText, setDetectedText] = useState<string | null>(null);
  const [productStatus, setProductStatus] = useState<string | null>(null);
  const[productName,setProductName]= useState<string | null>(null);
  const[productAllergies,setProductAllergies]= useState([]);

  const [userAllergies,setUserAllergies]=useState<string | null>(null);


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
      setDetectedText(mainText);
      
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

  // Function to check allergies by sending the detected text and user allergies to the scanproduct API
  const checkAllergy = async () => {
    

    setLoading(true);
    try {
      // Retrieve user allergies from AsyncStorage
      const token = await AsyncStorage.getItem("token"); // Retrieve token
      if (token) {
        const user = JSON.parse(token); // Parse token into an object
        setUserAllergies(user.allergy)
      }
      
      if (!userAllergies) {
        Alert.alert('Error', 'No allergies found in storage.');
        return;
      }

      const payload = {
        productName: "MTR Ready To Eat Paneer Butter Masala",
        userAllergies: userAllergies,
      };

      const response = await fetch("http://192.168.0.104:7000/scanproduct", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to allergy detection API');
      }

      const result = await response.json();
      console.log(result);
      setProductName(result.product);
      setProductAllergies(result.allergens);
      setProductStatus(result.status === 'safe' ? 'Safe to eat' : 'Not safe to eat');
    } catch (error) {
      console.error('Allergy detection error:', error);
      Alert.alert('Error', 'Failed to check allergies.');
    } finally {
      setLoading(false);
    }
  };

  // Function to clear the selected image
  const retry = () => {
    setSelectedImage(null);
    setDetectedText(null);
    setProductStatus(null);

  };

  return (
    <ScrollView >
      <View className='flex-1 flex items-center p-0'>

      <View style={styles.heroSection} className='w-full mb-10'>

    <Text className="text-4xl font-bold text-white ">Scan Product</Text>
      </View>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={checkAllergy}>
        <AntDesign name="camera" size={24} color="white" />
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Feather name="upload" size={24} color="white" />
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>

    {selectedImage ? (
      <>
        <Image source={{ uri: selectedImage }} style={styles.image} className='border-2 p-1' />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.scanButton]} onPress={handleOCR}>
            <MaterialIcons name="search" size={24} color="white" />
            <Text style={styles.buttonText}>Scan Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.retryButton]} onPress={retry}>
            <AntDesign name="reload1" size={24} color="white" />
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <View style={styles.imagePlaceholder} className=''>
        <Feather name="image" size={48} color="#ccc" />
        <Text style={styles.placeholderText}>No image selected</Text>
      </View>
    )}

      {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}

      {detectedText && (
        <>
          <Text style={styles.detectedText}>Detected Text: {detectedText}</Text>
          <TouchableOpacity style={[styles.button, styles.checkButton]} className='mb-10' onPress={checkAllergy}>
            <Text style={styles.buttonText}>Check Allergy</Text>
          </TouchableOpacity>
        </>
      )}
      </View>

    
      {
        productStatus &&
        <View className="w-11/12 p-4 bg-white rounded-lg shadow-lg self-center mt-8">
  {/* Product Info Section */}
  <View className="flex-row items-center">
    <Image 
      source={{ uri: selectedImage }} 
      className="w-24 h-24 rounded-lg mr-4"
    />
    <View className="flex-1">
      <Text className="text-xl font-bold text-gray-800">{productName}</Text>
      <View className="border-b border-gray-300 my-2" />
      <Text className="text-lg text-gray-600">
        Allergens: <Text className="font-medium text-gray-700">{productAllergies}</Text>
      </Text>
    </View>
  </View>

  {/* Status Section */}
  <TouchableOpacity 
    className={`w-full py-3 mt-4 rounded-lg ${productStatus == 'Not safe to eat' ? 'bg-red-500' : 'bg-green-500'}`}
  >
    <Text className="text-center text-white text-lg font-semibold">
      {productStatus}
    </Text>
  </TouchableOpacity>
</View>

      }
      
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'linear-gradient(to bottom, #E0F7FA, #FFFFFF)',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 16,
},
title: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#333',
},
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: 20,
},
button: {
  backgroundColor: '#007AFF',
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginHorizontal: 10,
},
scanButton: {
  backgroundColor: '#4CAF50',
},
retryButton: {
  backgroundColor: '#FF5252',
},
buttonText: {
  marginLeft: 8,
  color: '#FFFFFF',
  fontSize: 16,
},
image: {
  width: 300,
  height: 300,
  borderRadius: 10,
  marginBottom: 16,
},
heroSection: {
  backgroundColor: '#1E88E5',
  height: 180,
  justifyContent: 'center',
  alignItems: 'center',
},
imagePlaceholder: {
  width: 300,
  height: 300,
  borderRadius: 10,
  backgroundColor: '#F0F0F0',
  alignItems: 'center',
  justifyContent: 'center',
},
placeholderText: {
  color: '#777',
  marginTop: 10,
},
loader: {
  marginTop: 20,
},
detectedText: {
  fontSize: 18,
  marginTop: 20,
  color: '#333',
  textAlign: 'center',
},
checkButton: {
  backgroundColor: '#FF9800',
  marginTop: 20,
},
productStatus: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 20,
  textAlign: 'center',
},
});

export default Scan;