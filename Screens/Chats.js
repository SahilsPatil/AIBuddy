import { AppLoading } from "expo-app-loading";
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
import { Configuration, OpenAIApi } from 'openai';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Clipboard, Vibration, PermissionsAndroid, Platform } from 'react-native';
import useState from 'react-usestateref';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import hljs from "highlight.js";
// import javascript from "highlight.js/lib/languages/javascript";
// import { WebView } from 'react-native-webview';
// import SyntaxHighlighter from "react-native-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/styles/hljs";
// import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/";
// import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
// import {Voice} from 'react-native-voice';
import Voice from "@react-native-voice/voice";
import { NativeEventEmitter } from "react-native-web";
import App from "../App";
// import SpeechToText from 'react-native-google-speech-to-text';


// Voice.onSpeechStart = this.ononSpeechStart;
// class VoiceTest extends Component{
// constructor(props){
// 	Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
// 	Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
// 	Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
// }
// onStartButtonPress(e){
// 	// const {status, expires, permission} = await Permission(
// 	// 	Permission.AUDIO_RECORDING
// 	// )
// 	try {
// 		// setTimeout(async() => {
// 			Voice.start('en-US');
// 		// }, 1000);
// 		// console.log(result);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// }


export default function Chats({navigation,route}) {
	const {chatRef} = route.params;
	const [some, setSome] = useState(null);
	const [history_h, sethistory_h] = useState("");

	// console.log(navigation.myProps)
	useEffect(() => {
		// Voice.onSpeechStart;
		// Voice.onSpeechStart = () => { Voice.isRecognizing(); console.log("Started"); }
		// Voice.onSpeechEnd = () => { console.log("End") };
		// Voice.onSpeechResults = (e) => { setSome(e.value[0]) };
		Voice.onSpeechError = onSpeechError;
		Voice.onSpeechResults = onSpeechResults;
		// Voice.onSpeechError = (e)=>{
		// 	console.error(e.error);
		// }
		return () => {
			Voice.destroy().then(Voice.removeAllListeners);
		}
	}, []);
	const eventEmitter = new NativeEventEmitter();
	const [messages, setMessages, refMessages] = useState([]);
	const [text, setText] = useState('');
	const [chats, setChats, refChats] = useState([]);
	const [showMenu, setshowMenu, refshowMenu] = useState('none');
	const [returnKeyType, setreturnKeyType, refReturnKeyType] = useState('go');
	const scroll = React.useRef();
	const textInput = React.useRef();
	const sendText = React.useRef();
	const whichChat = route.params.data
	let chatUpdate;
	let chatText;



	const onStartButtonPress = async (what) => {
		const g = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
			message: 'hii',
			buttonPositive: 'Y'
		})
		console.log(2);
		try {
			if(what == 0){
				await Voice.start('en-US');
				console.log(what);
			}
			// else{
			// 	await Voice.stop();
			// 	console.log(what);
			// }
			
		} catch (error) {
			console.log(error);
		}
		console.log(3);

		// try {
		// 	const options = {
		// 		language: 'en-US',
		// 		recognitionModel:'command_and_search',
		// 		partialResults : false,
		// 		prompt:'Speak Now',
		// 	};
		// 	const t = await SpeechToText.start(options);
		// } catch (error) {

		// }
	}
	const onSpeechResults = (r) => {
		console.log(r.value[0]);
		getOpenAIResponce(r.value[0])
	}
	const onSpeechError = (e) => {
		console.log(e);
	}

	const openMenu=()=>{
		if (refshowMenu.current == 'none') {
			setshowMenu('flex')
		}
		else{
			setshowMenu('none')
		}
		// console.log(refshowMenu);
		// AsyncStorage.getAllKeys().forEach(element => {
		// 	console.log(element);
		// });
	}
	chatRef.current = {openMenu}
	// let a = 'data';
	const saveData = async () => {
		// AsyncStorage.clear()
		try {
			// AsyncStorage.clear()
			let data = await AsyncStorage.getItem(whichChat)
			console.log(data);
			if (data != '{}') {
				if (refChats.current[0] == undefined) {
					data = await JSON.parse(data);
					// console.log(data.current);
					setChats(data.current);
					setTimeout(async () => {
						await scroll.current.scrollToEnd({ animated: true });
					}, 1000);
				}
			}
			// data = JSON.parse(data);
			// console.log(data.current);
			// console.log(refChats.current[0]);
			if (refChats.current[0] != undefined) {
				await AsyncStorage.setItem(whichChat, JSON.stringify(refChats));
			}

		} catch (error) {
			console.log(error);
		}
	}
	
	const getHistory = async()=>{
		
		let data = await AsyncStorage.getItem(whichChat)
			if (data != null) {
					data = await JSON.parse(data);
					// console.log(data.current);
					for(let i = data.current.length-5; i<=data.current.length-1;i++){
						// console.log("\""+data.current[i].send+`\"`);
						// console.log(`\"`+data.current[i].receive+`\"`);
						// history.push(data.current[i].send.replace("\n",""))
						// history.push(data.current[i].receive.replace("\n",""))
						sethistory_h(history_h+data.current[i].send+"\n");
						sethistory_h(history_h+data.current[i].receive+"\n");
					}
					// console.log(history);
			}
	}
	saveData()
	
	// console.log(history_h);
	const messagesSetter = (receive, send) => {
		setChats(prev => {
			return [...prev, { send: send, receive: receive }]
		})
	}


	const configuration = new Configuration({
		apiKey: "OPENAIKEY",
	});

	const openai = new OpenAIApi(configuration);

	// hljs.registerLanguage('javascript',javascript)
    //  console.log("History -------   "+ history_h);
	const getOpenAIResponce = async (text) => {
	getHistory()
		try {

			if (text.length === 0 || text.trim() === "") {
				console.log("empty");
			}
			else {
				messagesSetter("Typing .....", text);
				textInput.current.clear();
				textInput.current.setNativeProps({
					onSubmitEditing: {},
				});
				setreturnKeyType("none");
				scroll.current.scrollToEnd({ animated: true });
				await openai.createCompletion({
					model: "text-davinci-003",
					prompt: history_h + text,
					// context:"user: My name is rohit"
					temperature: 0.9,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0.6,
					best_of: 1,
					max_tokens: 1000,
					stop: [" Human:", " AI:"],
				}).then((response) => {
					// const hicode = hljs.highlightAuto(response.data.choices[0].text).value;
					chatUpdate = refChats;
					chatUpdate.current[chatUpdate.current.length - 1].receive = response.data.choices[0].text.replace("Human:", "").replace("Bot:", "").replace("AI:", "").replace("Computer:", "");
					// chatUpdate.current[chatUpdate.current.length - 1].receive = hicode;
					console.log(chatUpdate.current[chatUpdate.current.length - 1]);
					setChats(chatUpdate.current);
					textInput.current.setNativeProps({
						onSubmitEditing: getOpenAIResponce
					});
					setText('');
				})
				scroll.current.scrollToEnd({ animated: true });
			}
		} catch (error) {
			console.log(error);
		}

	};



	let [fontsLoaded] = useFonts({
		Manrope_200ExtraLight,
		Manrope_300Light,
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_600SemiBold,
		Manrope_700Bold,
		Manrope_800ExtraBold,
	});

	const copyText = (text) => {
		console.log(text);
		Clipboard.setString(text)
		Vibration.vibrate(100);
	}

	const showReceived = () => {
		console.log("\n\n\n\nhello");
		console.log(refChats.current);
		console.log("he\n\n\n");
		if (refChats.current == undefined) {
			console.log("un");
		}
		else{
			return (
				refChats.current.map((e) => {
					return (
						<>
							<View style={styles.chats_send} key={e.send}>
								<Text selectable={true} onLongPress={() => copyText(e.send)} ref={sendText} dataDetectorType={'all'} key={e.send} style={[{ fontFamily: 'Manrope_600SemiBold' }, styles.chats_send_text]}>{e.send}</Text>
							</View>
							{/* <SyntaxHighlighter language="python" style={darcula} highlighter={"prism" || "hljs"}>{e.receive}</SyntaxHighlighter> */}
							<View style={styles.chats_receive} key={e.receive}>
								{/* <WebView javaScriptEnabled={true} domStorageEnabled={true} startInLoadingState={true} style={[{ fontFamily: 'Manrope_700Bold',margin:10, width:"auto",height:300, backgroundColor:'transparent',fontSize:14 }, styles.chats_receive_text]} source={{ html: e.receive }}/> */}
								{/* <TouchableOpacity> */}
								<Text selectable={true} onLongPress={() => copyText(e.receive)} selectionColor="grey" dataDetectorType={'all'} key={e.receive} style={[{ fontFamily: 'Manrope_700Bold' }, styles.chats_receive_text]}>{e.receive}</Text>
								{/* </TouchableOpacity> */}
							</View>

						</>
					)
				})

			)
		}

	}


	// console.log(some);
	if (!fontsLoaded) {
		// return <AppLoading />;
	} else {
		return (
			<View style={styles.container}>
				<View style={{backgroundColor:'#121414',width:180,height:210,position:'absolute', top:-5,right:10,zIndex:1,borderRadius:5,display:refshowMenu.current}}>
					<View style={{color:'white', padding:20, paddingTop:0}}>
						<Text style={{color:'white', fontSize:16, fontWeight:'bold', letterSpacing:1.5,padding:10}} onPress={()=>navigation.navigate('Home')}>Home</Text>
						<Text style={{color:'white', fontSize:16, fontWeight:'bold', letterSpacing:1.5,padding:10}}>New Chat</Text>
						<Text style={{color:'white', fontSize:16, fontWeight:'bold', letterSpacing:1.5,padding:10}} onPress={()=>{ setChats(); AsyncStorage.mergeItem(whichChat,JSON.stringify({}));setChats(); }}>Clear Chat</Text>
						<Text style={{color:'white', fontSize:16, fontWeight:'bold', letterSpacing:1.5,padding:10}}>Help</Text>
						<Text style={{color:'white', fontSize:16, fontWeight:'bold', letterSpacing:1.5,padding:10}} onPress={()=>navigation.navigate('Home')}>Exit</Text>
					</View>
				</View>

				{/* <LinearGradient start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} colors={[colors.Light_Violet, colors.Light_Magenta]} style={styles.nav}> */}
				{/* <LinearGradient start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} colors={['#000E08', '#000E08']} style={styles.nav}>
					<StatusBar style={{color:''}}/>
					<Text style={[{ fontFamily: 'Manrope_800ExtraBold' }, styles.nav_title]}>AI Buddy</Text>
				</LinearGradient> */}
				<View style={[{ fontFamily: 'Manrope_800ExtraBold' }, styles.chats]}>
					<ScrollView style={styles.chats_scroller} ref={scroll}>
						{showReceived()}
						<View style={{ height: 200 }}></View>
					</ScrollView>
				</View>
				<View style={styles.input_send} >
					<View style={styles.input_send_input}>
						<TextInput placeholderTextColor={'#797C7B'} secureTextInput={true} ref={textInput} onSubmitEditing={()=>getOpenAIResponce(text)} pointerEvents="none" returnKeyType={'go'} style={[{ fontFamily: 'Manrope_700Bold' }, styles.input_send_input_input]} value={text} onChangeText={setText} placeholder='Type a message ...' />
						{/* <TextInput secureTextInput={true} ref={textInput} onSubmitEditing={()=>getOpenAIResponce(text)} pointerEvents="none" returnKeyType={'go'} style={[{ fontFamily: 'Manrope_700Bold' }, styles.input_send_input_input]} value={text} onChangeText={setText} placeholder='Type a message ...' /> */}
					</View>
					<View pointerEvents={'auto'} onTouchEnd={()=>getOpenAIResponce(text)} style={[styles.input_send_send, { display: `${text.length === 0 || text.trim() === "" ? 'none' : 'flex'}` }]}>
						<Text style={[{ fontFamily: 'Manrope_800ExtraBold' }, styles.input_send_input_button]}>{">"}</Text>
					</View>
					<View pointerEvents={'auto'} onTouchStart={() => onStartButtonPress(0)} onTouchEnd={() => onStartButtonPress(1)} style={[styles.input_send_listen, { display: `${text.length !== 0 || text.trim() !== "" ? 'none' : 'flex'}` }]}>
						<MaterialCommunityIcons name={'microphone'} color={'white'} size={30} style={{ verticalAlign: 'middle' }} />
					</View>
				</View>
			</View>
		);
	}
}

const colors = {
	Pale_Violet: "hsl(276, 100%, 81%)",
	Moderate_Violet: "hsl(276, 55%, 52%)",
	Desaturated_Dark_Violet: "hsl(271, 15%, 43%)",
	Grayish_Blue: "hsl(206, 6%, 79%)",
	Very_Dark_Desaturated_Violet: "hsl(271, 36%, 24%)",
	Dark_Grayish_Violet: "hsl(270, 7%, 64%)",

	Light_Magenta: "hsl(293, 100%, 63%)",
	Light_Violet: "hsl(264, 100%, 61%)",

	Light_Grayish_Violet: "hsl(270, 20%, 96%)",
	Very_Light_Magenta: "hsl(289, 100%, 72%)"
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		// marginTop:20
	},
	nav: {
		backgroundColor: '#121414',
		width: "100%",
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		verticalAlign:'middle',
		paddingTop: 30,
		paddingBottom:20

	},
	nav_title: {
		fontSize: 24,
		color: colors.Light_Grayish_Violet,
		fontFamily: 'Manrope_800ExtraBold'
		// fontFamily: 'Manrope_800ExtraBold',
		// color: colors.Very_Dark_Desaturated_Violet,
		// color:"white",
	},
	chats: {
		width: "100%",
		height: "100%",
		backgroundColor: '#121414',
		flexDirection: "column",
	},
	chats_scroller: {
		paddingTop: 35,
	},
	chats_receive: {
		flex: 1,
		padding: 15,
		// borderColor:"black",
		// borderWidth:1,
		// width:"60%",
		// maxWidth:200,
		minWidth: 10,
		maxWidth: "65%",
		marginHorizontal: 10,
		borderRadius: 20,
		borderTopStartRadius:0,
		// backgroundColor: colors.Pale_Violet,
		backgroundColor: "#212727",
		marginBottom: 20
	},
	chats_receive_text: {
		color: '#FFFFFF',
		fontSize: 16,
		// fontWeight: '800',
	},
	chats_send: {
		padding: 15,
		// borderColor:"black",
		// borderWidth:1,
		width: "65%",
		marginHorizontal: 10,
		borderRadius: 20,
		borderTopEndRadius:0,
		backgroundColor: "#20A090",
		marginBottom: 20,
		alignSelf: 'flex-end'
	},
	chats_send_text: {
		fontSize: 16,
		color:'#FFFFFF'
	},
	input_send: {
		position: 'absolute',
		width: '95%',
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingHorizontal:30,
		// paddingVertical:20,
		backgroundColor: '#192222',
		borderRadius: 12,
		marginVertical: 20,
		shadowColor: "black",
		shadowOffset: 0.5,
		shadowOpacity: 1,
	},
	input_send_input_input: {
		fontSize: 16,
		paddingHorizontal: 25,
		paddingVertical: 20,
		width: "100%",
		maxWidth: 310,
		color:'#FFFFFF',
	},
	input_send_send: {
		backgroundColor: '#20A090',
		height: 55,
		width: 55,
		borderRadius: 100,
		marginRight: 8,
		outline: 'none',
	},
	input_send_listen: {
		backgroundColor: '#20A090',
		height: 55,
		width: 55,
		borderRadius: 100,
		marginRight: 8,
		outline: 'none',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input_send_input_button: {
		fontSize: 38,
		// fontWeight: '900',
		color: 'white',
		alignSelf: 'center',
	},
});




// import { AppLoading } from "expo-app-loading";
// import {
// 	useFonts,
// 	Manrope_200ExtraLight,
// 	Manrope_300Light,
// 	Manrope_400Regular,
// 	Manrope_500Medium,
// 	Manrope_600SemiBold,
// 	Manrope_700Bold,
// 	Manrope_800ExtraBold,
// } from "@expo-google-fonts/dev";
// import { Configuration, OpenAIApi } from 'openai';
// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Clipboard, Vibration, PermissionsAndroid, Platform } from 'react-native';
// import useState from 'react-usestateref';
// import { LinearGradient } from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage'
// // import hljs from "highlight.js";
// // import javascript from "highlight.js/lib/languages/javascript";
// // import { WebView } from 'react-native-webview';
// // import SyntaxHighlighter from "react-native-syntax-highlighter";
// // import { docco } from "react-syntax-highlighter/styles/hljs";
// // import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// // import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// // import { docco } from "react-syntax-highlighter/dist/esm/styles/";
// // import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { StatusBar } from "expo-status-bar";
// import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
// // import {Voice} from 'react-native-voice';
// import Voice from "@react-native-voice/voice";
// // import SpeechToText from 'react-native-google-speech-to-text';


// // Voice.onSpeechStart = this.ononSpeechStart;
// // class VoiceTest extends Component{
// // constructor(props){
// // 	Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
// // 	Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
// // 	Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
// // }
// // onStartButtonPress(e){
// // 	// const {status, expires, permission} = await Permission(
// // 	// 	Permission.AUDIO_RECORDING
// // 	// )
// // 	try {
// // 		// setTimeout(async() => {
// // 			Voice.start('en-US');
// // 		// }, 1000);
// // 		// console.log(result);
// // 	} catch (error) {
// // 		console.log(error);
// // 	}
// // }

// // }


// export default function App() {

// 	const [some, setSome] = useState(null);

// 	useEffect(() => {
// 		// Voice.onSpeechStart;
// 		// Voice.onSpeechStart = () => { Voice.isRecognizing(); console.log("Started"); }
// 		// Voice.onSpeechEnd = () => { console.log("End") };
// 		// Voice.onSpeechResults = (e) => { setSome(e.value[0]) };
// 		Voice.onSpeechError = onSpeechError;
// 		Voice.onSpeechResults = onSpeechResults;
// 		// Voice.onSpeechError = (e)=>{
// 		// 	console.error(e.error);
// 		// }
// 		return () => {
// 			Voice.destroy().then(Voice.removeAllListeners);
// 		}
// 	}, []);

// 	const [messages, setMessages, refMessages] = useState([]);
// 	const [text, setText] = useState('');
// 	const [chats, setChats, refChats] = useState([]);
// 	const [returnKeyType, setreturnKeyType, refReturnKeyType] = useState('go');
// 	const scroll = React.useRef();
// 	const textInput = React.useRef();
// 	const sendText = React.useRef();
// 	let chatUpdate;
// 	let chatText;


// 	const onStartButtonPress = async (what) => {
// 		const g = await PermissionsAndroid.request(
// 			PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
// 			message: 'hii',
// 			buttonPositive: 'Y'
// 		})
// 		console.log(2);
// 		try {
// 			if(what == 0){
// 				await Voice.start('en-US');
// 				console.log(what);
// 			}
// 			// else{
// 			// 	await Voice.stop();
// 			// 	console.log(what);
// 			// }
			
// 		} catch (error) {
// 			console.log(error);
// 		}
// 		console.log(3);

// 		// try {
// 		// 	const options = {
// 		// 		language: 'en-US',
// 		// 		recognitionModel:'command_and_search',
// 		// 		partialResults : false,
// 		// 		prompt:'Speak Now',
// 		// 	};
// 		// 	const t = await SpeechToText.start(options);
// 		// } catch (error) {

// 		// }
// 	}
// 	const onSpeechResults = (r) => {
// 		console.log(r.value[0]);
// 		getOpenAIResponce(r.value[0])
// 	}
// 	const onSpeechError = (e) => {
// 		console.log(e);
// 	}

// 	const saveData = async () => {
// 		try {
// 			// AsyncStorage.clear()
// 			let data = await AsyncStorage.getItem('data')
// 			if (data != null) {
// 				if (refChats.current[0] == undefined) {
// 					data = await JSON.parse(data);
// 					// console.log(data.current);
// 					setChats(data.current);
// 					setTimeout(async () => {
// 						await scroll.current.scrollToEnd({ animated: true });
// 					}, 1000);
// 				}
// 			}
// 			// data = JSON.parse(data);
// 			// console.log(data.current);
// 			// console.log(refChats.current[0]);
// 			if (refChats.current[0] != undefined) {
// 				await AsyncStorage.setItem('data', JSON.stringify(refChats));
// 			}

// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	saveData()

// 	const messagesSetter = (receive, send) => {
// 		setChats(prev => {
// 			return [...prev, { send: send, receive: receive }]
// 		})
// 	}


// 	const configuration = new Configuration({
// 		apiKey: "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",
// 	});

// 	const openai = new OpenAIApi(configuration);

// 	// hljs.registerLanguage('javascript',javascript)

// 	const getOpenAIResponce = async (text) => {
// 		try {

// 			if (text.length === 0 || text.trim() === "") {
// 				console.log("empty");
// 			}
// 			else {
// 				messagesSetter("Typing .....", text);
// 				textInput.current.clear();
// 				textInput.current.setNativeProps({
// 					onSubmitEditing: {},
// 				});
// 				setreturnKeyType("none");
// 				scroll.current.scrollToEnd({ animated: true });
// 				await openai.createCompletion({
// 					model: "text-davinci-003",
// 					prompt: " Human:" + text,
// 					temperature: 0.9,
// 					top_p: 1,
// 					frequency_penalty: 0,
// 					presence_penalty: 0.6,
// 					best_of: 1,
// 					max_tokens: 1000,
// 					stop: [" Human:", " AI:"],
// 				}).then((response) => {
// 					// const hicode = hljs.highlightAuto(response.data.choices[0].text).value;
// 					chatUpdate = refChats;
// 					chatUpdate.current[chatUpdate.current.length - 1].receive = response.data.choices[0].text.replace("Human:", "").replace("Bot:", "").replace("AI:", "").replace("Computer:", "");
// 					// chatUpdate.current[chatUpdate.current.length - 1].receive = hicode;
// 					console.log(chatUpdate.current[chatUpdate.current.length - 1]);
// 					setChats(chatUpdate.current);
// 					textInput.current.setNativeProps({
// 						onSubmitEditing: getOpenAIResponce
// 					});
// 					setText('');
// 				})
// 				scroll.current.scrollToEnd({ animated: true });
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}

// 	};



// 	let [fontsLoaded] = useFonts({
// 		Manrope_200ExtraLight,
// 		Manrope_300Light,
// 		Manrope_400Regular,
// 		Manrope_500Medium,
// 		Manrope_600SemiBold,
// 		Manrope_700Bold,
// 		Manrope_800ExtraBold,
// 	});

// 	const copyText = (text) => {
// 		console.log(text);
// 		Clipboard.setString(text)
// 		Vibration.vibrate(100);
// 	}

// 	const showReceived = () => {
// 		return (
// 			refChats.current.map((e) => {
// 				return (
// 					<>
// 						<View style={styles.chats_send} key={e.send}>
// 							<Text selectable={true} onLongPress={() => copyText(e.send)} ref={sendText} dataDetectorType={'all'} key={e.send} style={[{ fontFamily: 'Manrope_600SemiBold' }, styles.chats_send_text]}>{e.send}</Text>
// 						</View>
// 						{/* <SyntaxHighlighter language="python" style={darcula} highlighter={"prism" || "hljs"}>{e.receive}</SyntaxHighlighter> */}
// 						<View style={styles.chats_receive} key={e.receive}>
// 							{/* <WebView javaScriptEnabled={true} domStorageEnabled={true} startInLoadingState={true} style={[{ fontFamily: 'Manrope_700Bold',margin:10, width:"auto",height:300, backgroundColor:'transparent',fontSize:14 }, styles.chats_receive_text]} source={{ html: e.receive }}/> */}
// 							{/* <TouchableOpacity> */}
// 							<Text selectable={true} onLongPress={() => copyText(e.receive)} selectionColor="grey" dataDetectorType={'all'} key={e.receive} style={[{ fontFamily: 'Manrope_700Bold' }, styles.chats_receive_text]}>{e.receive}</Text>
// 							{/* </TouchableOpacity> */}
// 						</View>

// 					</>
// 				)
// 			})

// 		)
// 	}


// 	// console.log(some);
// 	if (!fontsLoaded) {
// 		// return <AppLoading />;
// 	} else {
// 		return (
// 			<View style={styles.container}>
// 				<LinearGradient start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} colors={[colors.Light_Violet, colors.Light_Magenta]} style={styles.nav}>
// 					<StatusBar />
// 					<Text style={[{ fontFamily: 'Manrope_800ExtraBold' }, styles.nav_title]}>AI Buddy</Text>
// 				</LinearGradient>
// 				<View style={[{ fontFamily: 'Manrope_800ExtraBold' }, styles.chats]}>
// 					<ScrollView style={styles.chats_scroller} ref={scroll}>
// 						{showReceived()}
// 						<View style={{ height: 200 }}></View>
// 					</ScrollView>
// 				</View>
// 				<View style={styles.input_send} >
// 					<View style={styles.input_send_input}>
// 						<TextInput secureTextInput={true} ref={textInput} onSubmitEditing={()=>getOpenAIResponce(text)} pointerEvents="none" returnKeyType={'go'} style={[{ fontFamily: 'Manrope_700Bold' }, styles.input_send_input_input]} value={text} onChangeText={setText} placeholder='Type a message ...' />
// 					</View>
// 					<View pointerEvents={'auto'} onTouchEnd={()=>getOpenAIResponce(text)} style={[styles.input_send_send, { display: `${text.length === 0 || text.trim() === "" ? 'none' : 'flex'}` }]}>
// 						<Text style={[{ fontFamily: 'Manrope_800ExtraBold' }, styles.input_send_input_button]}>{">"}</Text>
// 					</View>
// 					<View pointerEvents={'auto'} onTouchStart={() => onStartButtonPress(0)} onTouchEnd={() => onStartButtonPress(1)} style={[styles.input_send_listen, { display: `${text.length !== 0 || text.trim() !== "" ? 'none' : 'flex'}` }]}>
// 						<MaterialCommunityIcons name={'microphone'} color={'white'} size={30} style={{ verticalAlign: 'middle' }} />
// 					</View>
// 				</View>
// 			</View>
// 		);
// 	}
// }

// const colors = {
// 	Pale_Violet: "hsl(276, 100%, 81%)",
// 	Moderate_Violet: "hsl(276, 55%, 52%)",
// 	Desaturated_Dark_Violet: "hsl(271, 15%, 43%)",
// 	Grayish_Blue: "hsl(206, 6%, 79%)",
// 	Very_Dark_Desaturated_Violet: "hsl(271, 36%, 24%)",
// 	Dark_Grayish_Violet: "hsl(270, 7%, 64%)",

// 	Light_Magenta: "hsl(293, 100%, 63%)",
// 	Light_Violet: "hsl(264, 100%, 61%)",

// 	Light_Grayish_Violet: "hsl(270, 20%, 96%)",
// 	Very_Light_Magenta: "hsl(289, 100%, 72%)"
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		// marginTop:20
// 	},
// 	nav: {
// 		backgroundColor: colors.Light_Magenta,
// 		width: "100%",
// 		padding: 20,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		paddingTop: 20,

// 	},
// 	nav_title: {
// 		fontSize: 24,
// 		color: colors.Light_Grayish_Violet,
// 		fontFamily: 'Manrope_800ExtraBold'
// 		// fontFamily: 'Manrope_800ExtraBold',
// 		// color: colors.Very_Dark_Desaturated_Violet,
// 		// color:"white",
// 	},
// 	chats: {
// 		width: "100%",
// 		height: "100%",
// 		backgroundColor: colors.Light_Grayish_Violet,
// 		flexDirection: "column",
// 	},
// 	chats_scroller: {
// 		paddingTop: 35,
// 	},
// 	chats_receive: {
// 		flex: 1,
// 		padding: 15,
// 		// borderColor:"black",
// 		// borderWidth:1,
// 		// width:"60%",
// 		// maxWidth:200,
// 		minWidth: 10,
// 		maxWidth: "65%",
// 		marginHorizontal: 10,
// 		borderRadius: 20,
// 		// backgroundColor: colors.Pale_Violet,
// 		backgroundColor: "hsl(272, 41%, 93%)",
// 		marginBottom: 20
// 	},
// 	chats_receive_text: {
// 		color: colors.Moderate_Violet,
// 		fontSize: 16,
// 		// fontWeight: '800',
// 	},
// 	chats_send: {
// 		padding: 15,
// 		// borderColor:"black",
// 		// borderWidth:1,
// 		width: "65%",
// 		marginHorizontal: 10,
// 		borderRadius: 20,
// 		backgroundColor: "white",
// 		marginBottom: 20,
// 		alignSelf: 'flex-end'
// 	},
// 	chats_send_text: {
// 		fontSize: 16,
// 	},
// 	input_send: {
// 		position: 'absolute',
// 		width: '95%',
// 		bottom: 0,
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 		// paddingHorizontal:30,
// 		// paddingVertical:20,
// 		backgroundColor: 'white',
// 		borderRadius: 1000,
// 		marginVertical: 20,
// 		shadowColor: "black",
// 		shadowOffset: 0.5,
// 		shadowOpacity: 1,
// 	},
// 	input_send_input_input: {
// 		fontSize: 16,
// 		paddingHorizontal: 25,
// 		paddingVertical: 20,
// 		width: "100%",
// 		maxWidth: 310,
// 	},
// 	input_send_send: {
// 		backgroundColor: colors.Very_Dark_Desaturated_Violet,
// 		height: 55,
// 		width: 55,
// 		borderRadius: 100,
// 		marginRight: 8,
// 		outline: 'none',
// 	},
// 	input_send_listen: {
// 		backgroundColor: colors.Very_Dark_Desaturated_Violet,
// 		height: 55,
// 		width: 55,
// 		borderRadius: 100,
// 		marginRight: 8,
// 		outline: 'none',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	input_send_input_button: {
// 		fontSize: 38,
// 		// fontWeight: '900',
// 		color: 'white',
// 		alignSelf: 'center',
// 	},
// });

