import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Chats,{OpenMenu} from './Screens/Chats';
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



export default function App() {
	const Stack = createNativeStackNavigator();
	const chatRef = useRef(null);
	let [fontsLoaded] = useFonts({
		Manrope_200ExtraLight,
		Manrope_300Light,
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_600SemiBold,
		Manrope_700Bold,
		Manrope_800ExtraBold,
	});
	const doSome=()=>{
		chatRef.current.openMenu()
	}

	if (!fontsLoaded) {
		// return <AppLoading />;
	} else {
		return (
			<NavigationContainer>
				<Stack.Navigator
				// screenOptions={{

				// }}
				>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ headerShown: false, title: 'Home', headerTitleAlign: 'center', headerStyle: { height: 500, backgroundColor: '#24786D', }, headerTitleStyle: { color: colors.silver_hover, fontSize: 24, fontWeight: 'bold' } }}
					/>
					<Stack.Screen
						name="Chats"
						component={Chats}
						
						options={{myProps : "Hello",
							headerRight: () => (
								<Ionicons name="ellipsis-vertical" size={25} color="white" onPress={doSome}/>
							),
							headerTintColor: 'white', title: 'AI Buddy', headerTitleAlign: 'center', headerStyle: { elevation: 5, fontWeight: '800', height: 500, backgroundColor: '#121414', }, headerTitleStyle: { color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: 'Manrope_800ExtraBold' }
						}}
						initialParams={{chatRef}}
					/>
				</Stack.Navigator>

			</NavigationContainer>
		);
	}
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
