import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Chats, { OpenMenu } from './Screens/Chats';
import Home from './Screens/Home';
import { Ionicons } from '@expo/vector-icons'
import {
    useFonts,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from "@expo-google-fonts/dev";



export default function Menu() {
    return (
        <View style={{ backgroundColor: '#121414', width: 180, height: 210, position: 'absolute', top: -5, right: 10, zIndex: 1, borderRadius: 5 }}>
            <View style={{ color: 'white', padding: 20, paddingTop: 0 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.5, padding: 10 }} onPress={() => navigation.navigate('Home')}>Home</Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.5, padding: 10 }}>New Chat</Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.5, padding: 10 }} onPress={() => { AsyncStorage.clear(); setChats([]) }}>Clear Chat</Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.5, padding: 10 }}>Help</Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.5, padding: 10 }} onPress={() => navigation.navigate('Home')}>Exit</Text>
            </View>
        </View>
    );
}

const colors = {
    dark_navy: "#1a2a33",
    semi_dark_navy: "#1f3641",
    silver: "#a8bfc9",
    silver_hover: "#dbe8ed",
    light_blue: "#31c3bd",
    light_blue_hover: "#65e9e4",
    light_yellow: "#f2b137",
    light_yellow_hover: "#ffc860",
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark_navy,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: "auto",
        width: "100%",
        opacity: 0.98
    },
});
