import {
	ImageBackground,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import GlobalStyle from '../../../Assets/GlobalStyles/GlobalStyle';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from '../../../Navigation/Routes.ts';
import HeaderText from '../../../Components/HeaderText/HeaderText.tsx';
import EditText from '../../../Components/EditText/EditText.tsx';
import React, {SetStateAction, useEffect, useState} from 'react';
import LoginMethodText from '../../../Components/LoginMethodText/LoginMethodText.tsx';
import GoogleButton from '../../../Components/GoogleButton/GoogleButton.tsx';
import Style from './Style.ts';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import KeyboardCoveringContainer from '../../../Components/KeboardCoveringContainer/KeyboardCoveringContainer';
import AwesomeButton from 'react-native-really-awesome-button';
import {useRoute} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import firestore from "@react-native-firebase/firestore";
import {createUser} from "../../../api/user";
import functions from "@react-native-firebase/functions";

const RegisterScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultEmailValue, setDefaultEmailValue] = useState('');
	const [defaultUsernameValue, setDefaultUsernameValue] = useState('');
	const [defaultPasswordValue, setDefaultPasswordValue] = useState('');
	const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] =
		useState('');
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	interface RouteParams {
		defaultEmailValue: string;
	}

	const encryptPassword = (password: string, shift: number): string => {
		return password
			.split('')
			.map(char => {
				const charCode = char.charCodeAt(0);
				return String.fromCharCode(charCode + shift);
			})
			.join('');
	};

	const route = useRoute();
	const routeParams = route.params as RouteParams | undefined;
	const email = routeParams?.defaultEmailValue;
	const shift = 7;
	const showFlashMessage = (
		message: string,
		type: 'success' | 'warning' | 'danger',
	) => {
		showMessage({
			message: message,
			type: type,
			statusBarHeight: StatusBar.currentHeight,
		});
	};

	const getCurrentDateTime = () => {
		const now = new Date();

		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();

		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	};

	const collectData = async (username: string, password: string) => {
		// const sanitizedEmail = email?.replace(/[@.]/g, '_');
		await firestore()
			.collection('users')
			.doc(email)
			.set({
				uid: firebase.auth().currentUser?.uid,
				username: username,
				email: email,
				password: encryptPassword(password, shift),
				accountCreationTime: getCurrentDateTime(),
			})
			.then(() => {
				console.log("Data Collected")
			})
			.catch((error) => {
				console.error(error);
			})
	};

	const createUserAccount = async (email: string, password: string) => {
		let user = await createUser(email, password)
			.then(() => {
				console.log("Account created: " + user);
				collectData(defaultUsernameValue, defaultPasswordValue);
				showFlashMessage('Registration Complete', 'success');
				navigation.replace(Routes.DashboardScreen);
				sendWelcomeEmail();
			})
			.catch((error: Error) => {
				console.error(error.message);
			});
	};

	const handleUserSignUp = async () => {
		if (defaultUsernameValue.trim() === '') {
			showFlashMessage("Username can't be empty", 'warning');
		} else if (!(defaultPasswordValue === defaultConfirmPasswordValue)) {
			showFlashMessage('Passwords do not match', 'danger');
		} else {
			await createUserAccount(defaultEmailValue, defaultPasswordValue)
				.then(() => null)
				.catch(() => null);
		}
	};

	const signInWithGoogle = async () => {
		try {
			console.log("Google Sign in called");
			GoogleSignin.configure({
				offlineAccess: false,
				webClientId:
					'411285290789-h7085ag0gmrfickl1h80fkpcv97vgttu.apps.googleusercontent.com',
				scopes: ['profile', 'email'],
			});
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();

			const {idToken} = await GoogleSignin.signIn();
			const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
			await auth().signInWithCredential(googleCredentials);
			return userInfo;
		} catch (error) {
			console.log('=> Google Sign In', error);
			return null;
		}
	};

	const sendWelcomeEmail = async () => {
		try {
			await functions().httpsCallable('sendWelcomeMail')({
				email: defaultEmailValue,
			})
		} catch (error) {
			console.error("sendWelcomeMail(): function called failed. Check GCC logs");
		}
	};

	useEffect(() => {
		setDefaultEmailValue(email ? email : '');
	}, []);

	return (
		<SafeAreaView
			style={[
				{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
				GlobalStyle.globalBackgroundFlex,
			]}>
			<KeyboardCoveringContainer style={undefined}>
				<StatusBar
					backgroundColor={'transparent'}
					barStyle={'light-content'}
					translucent={true}
				/>

				<ImageBackground
					source={require('../../../Assets/Images/GlobalAppAssets/img.png')}
					style={{flexDirection: 'row', flexWrap: 'wrap'}}
					resizeMode={'cover'}>
					<View
						style={{
							...StyleSheet.absoluteFillObject,
							backgroundColor: 'rgba(0 ,0, 0, 0.6)',
						}}
					/>

					<View id={'back-button'} style={Style.backButton}>
						<BackButton
							onPress={() => {
								navigation.replace(Routes.CreateAnAccount);
							}}
							backArrowColor={colorSchema === 'dark' ? '#FFF' : '#000'}
							buttonBackgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
						/>
					</View>

					<View
						id={'header-text-view'}
						style={[Style.headerTextView, {marginBottom: 20}]}>
						<HeaderText
							text={'Hello! Register to get started'}
							textColor={'#FFF'}
						/>
					</View>
				</ImageBackground>

				<View
					style={[
						Style.inputFieldContainer,
						{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
					]}>
					<View style={Style.emailEditTextContainer}>
						<EditText
							text={'Email'}
							inputType={'email'}
							value={defaultEmailValue}
							onChangeText={() => {

							}}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							leftMargin={0}
							rightMargin={10}/>
						<EditText
							text={'Username'}
							inputType={'text'}
							value={defaultUsernameValue}
							onChangeText={(value: SetStateAction<string>) => {
								setDefaultUsernameValue(value);
							}}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							leftMargin={0}
							rightMargin={0}/>
					</View>

					{/*<View style={Style.usernameEditTextContainer}>*/}
					{/*</View>*/}

					<View style={Style.passwordEditTextContainer}>
						<EditText
							text={'Password'}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							leftMargin={0}
							rightMargin={0}
							inputType={'password'}
							value={defaultPasswordValue}
							onChangeText={(value: SetStateAction<string>) => {
								setDefaultPasswordValue(value);
							}}
						/>
					</View>

					<View style={Style.confirmPasswordEditTextContainer}>
						<EditText
							text={'Confirm Password'}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							leftMargin={0}
							rightMargin={0}
							inputType={'password'}
							value={defaultConfirmPasswordValue}
							onChangeText={(value: SetStateAction<string>) => {
								setDefaultConfirmPasswordValue(value);
							}}
						/>
						{error.length > 0 && <Text style={Style.error}>{error}</Text>}
						{success.length > 0 && <Text style={Style.success}>{success}</Text>}
					</View>

					<View style={Style.buttonContainer}>
						<AwesomeButton
							style={{marginTop: 15}}
							backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
							raiseLevel={0}
							progress={true}
							stretch={true}
							borderRadius={8}
							disabled={
								!(defaultEmailValue.length > 6) &&
								!(
									defaultPasswordValue.length >= 6 &&
									defaultConfirmPasswordValue.length >= 6 &&
									defaultPasswordValue === defaultConfirmPasswordValue
								)
							}
							activeOpacity={0.5}
							onPress={async (next) => {
								await handleUserSignUp()
									.then(() => {})
									.catch((error) => {});
								if (next) {
									next();
								}
							}}>
							<Text
								style={{
									color: colorSchema === 'dark' ? '#FFF' : '#000',
									fontWeight: '500',
								}}>
								Register
							</Text>
						</AwesomeButton>

						<View style={Style.signUpMethodTextContainer}>
							<LoginMethodText text={'Or Register with'} />

							<View style={Style.signUpButtonContainer}>
								<GoogleButton
									onPress={() => {
										signInWithGoogle().then(data => {
											console.log(data);
											navigation.navigate(Routes.DashboardScreen);
										});
									}}
									rightMargin={12}
									buttonBackgroundColor={
										colorSchema === 'dark' ? '#FFF' : '#E5E4E2'
									}
								/>
							</View>
						</View>
					</View>
				</View>
			</KeyboardCoveringContainer>
		</SafeAreaView>
	);
};

export default RegisterScreen;
