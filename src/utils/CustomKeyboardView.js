import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
export default function CustomKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
}
