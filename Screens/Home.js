import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({ navigation }) {
    const allkeys = AsyncStorage.getAllKeys()
    const getAsyncItemsShow = async () => {
        
        // console.log(allkeys);
        // return (
            allkeys.map((e) => {
                console.log(e);
            })
        // )

        // return (<View onTouchEnd={() => navigation.navigate('Chats', { data: "data" })} style={styles.container_box_start}>
        //     <Text style={styles.container_box_start_button}></Text>
        // </View>)
    }
    // getAsyncItemsShow()
    let [fontsLoaded] = useFonts({
        Manrope_200ExtraLight,
        Manrope_300Light,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold,
    });
    if (!fontsLoaded) {
        // return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} colors={['#24786D', '#24786D']} style={styles.nav}>
                    <StatusBar style={{ color: '' }} />
                    <Text style={[{ fontFamily: 'Manrope_800ExtraBold' }, styles.nav_title]}>AI Buddy</Text>
                </LinearGradient>
                {/* <View style={styles.container_box}>
                    <View onTouchEnd={() => navigation.navigate('Chats', { data: "data" })} style={styles.container_box_start}>
                        <Text style={styles.container_box_start_button}>Start Chat</Text>
                    </View>
                </View> */}
                <View style={styles.container_box}>
                    {/* <ScrollView style={styles.chats_scroller} > */}
                    {getAsyncItemsShow()}
                    {/* <View style={{ height: 200 }}></View> */}
                    {/* </ScrollView> */}
                </View>
                <View onTouchEnd={() => { navigation.navigate('Chats', { data: "hello" }) }} style={{ backgroundColor: '#24786D', width: 60, height: 60, position: 'absolute', bottom: 25, right: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: '600' }}>+</Text>
                </View>
            </View>
        )
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
        alignItems: 'center',
        backgroundColor: '#24786D'
    },
    nav: {
        backgroundColor: '#24786D',
        width: "100%",
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        paddingTop: 30,
        paddingBottom: 20,
        height: 200,
    },
    nav_title: {
        fontSize: 24,
        color: 'white',
        fontWeight: '500',
        fontFamily: 'Manrope_800ExtraBold'
        // fontFamily: 'Manrope_800ExtraBold',
        // color: colors.Very_Dark_Desaturated_Violet,
        // color:"white",
    },
    container_box: {
        backgroundColor: '#121414',
        height: "65%",
        width: "100%",
        position: 'absolute',
        bottom: 0,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_box_start: {
        height: 60,
        width: "80%",
        backgroundColor: '#24786D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    container_box_start_button: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Manrope_800ExtraBold',
        color: 'white',
    }
});