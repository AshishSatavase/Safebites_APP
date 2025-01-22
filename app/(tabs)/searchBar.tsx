import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Feather icon library
import products from "../../db/products"; // Import the product array
import AsyncStorage from "@react-native-async-storage/async-storage"; // For user allergies

const SearchBarWithEfficientArray = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [productStatus, setProductStatus] = useState<string | null>(null);
  const [productAllergies, setProductAllergies] = useState<string | null>(null);

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const filterProducts = useCallback(
    (text: string) => {
      if (text.trim() === "") {
        setFilteredData([]);
      } else {
        const filtered = products.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered.slice(0, 5)); // Limit results to 5
      }
    },
    []
  );

  const debouncedSearch = useMemo(
    () => debounce(filterProducts, 300),
    [filterProducts]
  );

  const handleSearch = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const checkAllergy = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      let userAllergies = null;

      if (token) {
        const user = JSON.parse(token);
        userAllergies = user.allergy;
      }

      if (!userAllergies) {
        Alert.alert("Error", "No allergies found in storage.");
        return;
      }

      const payload = {
        productName: selectedProduct.name,
        userAllergies: userAllergies,
      };

      const response = await fetch("http://192.168.200.151:7000/scanproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to allergy detection API");
      }

      const result = await response.json();
      console.log(result)
      setProductAllergies(result.allergens);
      setProductStatus(result.status === "safe" ? "Safe to eat" : "Not safe to eat");
    } catch (error) {
      console.error("Allergy detection error:", error);
      Alert.alert("Error", "Failed to check allergies.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for products..."
          placeholderTextColor="#ccc"
          value={query}
          onChangeText={handleSearch}
        />
        <Icon name="search" style={styles.icon} color="gray" size={24} />
      </View>

      {/* FlatList for filtered products */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setSelectedProduct(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Selected product and allergy checker */}
      {selectedProduct && (
        <View style={styles.selectedContainer}>
          <TouchableOpacity
          className="bg-blue-600"
            style={styles.checkButton}
            onPress={checkAllergy}
            disabled={loading}
          >
            <Text style={styles.checkButtonText}>
              {loading ? "Checking..." : "Check Allergy"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Loading animation */}
      {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}

      {/* Allergy check results */}
      {productStatus && (
        <View style={styles.resultContainer}>
           <Text style={styles.resultText}>
            <Text className="font-bold text-xl">
            Name:
            </Text>
            {" "+selectedProduct.name}
            
          </Text>
          
          <Text style={styles.resultText}>
          <Text className="font-bold text-xl">
            Status:
            </Text>
            {" "}
            <Text style={{ color: productStatus === "Safe to eat" ? "green" : "red" }}>
              {productStatus}
            </Text>
          </Text>
          <Text style={styles.resultText}>
            <Text className="font-bold text-xl">
            Allergens:
            </Text>
             {" "+productAllergies || "None"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  selectedContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedText: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkButton: {
   
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkButtonText: {
    color: "white",
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default SearchBarWithEfficientArray;
