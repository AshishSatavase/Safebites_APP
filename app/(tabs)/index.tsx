import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Shield, Zap, Microscope } from 'lucide-react-native';
import * as Network from 'expo-network';




export default function Index() {
  const [ipv4,setIpv4]=useState("");
  const getIp=async()=>{
    console.log("Jel");
    try {
      // Fetch the IP Address
      const ipAddress = await Network.getIpAddressAsync();
      console.log("IP Address:", ipAddress);  // Logs the IP Address
    } catch (error) {
      console.error("Error fetching IP address:", error);  // Error handling
    }
  }
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Welcome to SafeBites</Text>
        <Text style={styles.heroSubtitle}>Detect Allergens with Confidence</Text>
      </View>

      {/* Interactive Allergy Detection Feature */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detect Allergens Instantly</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter product name or scan barcode"
            style={styles.input}
          />
          <TouchableOpacity style={styles.detectButton} onPress={getIp}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Key Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose SafeBites?</Text>
        <View style={styles.featureGrid}>
          {[
            { Icon: Shield, title: 'High Accuracy', description: 'AI-powered allergen detection.' },
            { Icon: Zap, title: 'Instant Results', description: 'Results in seconds, not minutes.' },
            { Icon: Microscope, title: 'Comprehensive Database', description: '170+ allergens covered.' },
          ].map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <feature.Icon size={48} color="#1E88E5" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <Text style={styles.stepText}>1. Scan the product or enter the product name</Text>
          <Text style={styles.stepText}>2. Analyze the ingredients</Text>
          <Text style={styles.stepText}>3. Receive instant allergen results</Text>
          <Text style={styles.stepText}>4. Get detailed allergen information</Text>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ready to Eat with Confidence?</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.buttonText}>Get Started for Free</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2023 SafeBites. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  heroSection: {
    backgroundColor: '#1E88E5',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: { fontSize: 32, fontWeight: 'bold', color: 'white' },
  heroSubtitle: { fontSize: 18, color: 'white', marginTop: 5 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  detectButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureCard: {
    alignItems: 'center',
    width: '30%',
  },
  featureTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 5, color: '#34495E' },
  featureDescription: { textAlign: 'center', fontSize: 14, color: '#6C757D' },
  stepsContainer: { backgroundColor: '#F8F9FA', padding: 15, borderRadius: 8 },
  stepText: { fontSize: 16, marginVertical: 5 },
  ctaButton: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  footer: { padding: 20, backgroundColor: '#F1F5F9', alignItems: 'center' },
  footerText: { color: '#6C757D' },
});