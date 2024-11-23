import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";



export default function TabLayout() {
  const router=useRouter();
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          // Navigate to the tabs page if token exists
          router.replace("./login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
      
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="scan1" color={color} />,
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
    
  );
}
