import {
	ImageBackground,
	SafeAreaView, StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import Style from './Style.ts';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from '../../../Navigation/Routes.ts';
import HeaderText from '../../../Components/HeaderText/HeaderText.tsx';
import EditText from '../../../Components/EditText/EditText.tsx';
import React, {SetStateAction, useEffect, useState} from 'react';
import functions from '@react-native-firebase/functions';
import GlobalStyle from "../../../Assets/GlobalStyles/GlobalStyle";
import AwesomeButton from "react-native-really-awesome-button";
import {showMessage} from "react-native-flash-message";
import firestore from '@react-native-firebase/firestore';

const ForgetPasswordPage = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultEmailValue, setDefaultEmailValue] = useState('');
	const [uidValue, setUidValue] = useState('');
	const fetchUidAndSendOtp = async () => {
		await firestore()
			.collection('users')
			.doc(defaultEmailValue)
			.get()
			.then(async snapshot => {
				if (snapshot.exists) {
					setUidValue(snapshot.get('uid'));
					console.log("UID: " + uidValue);
					try {
						await functions().httpsCallable('sendPasswordResetOtp')({
							email: defaultEmailValue,
						});
						showFlashMessage('OTP Sent Successfully', 'success');
						navigation.navigate(Routes.ForgetPasswordOTPVerificationScreen, {
							defaultEmailValue,
						});
					} catch (error: any) {
						showFlashMessage('Error sending OTP!', 'danger');
						console.log(error);
					}
				} else {
					showFlashMessage('Account not found!', 'danger');
				}
			})
			.catch(reason => {
				console.error(reason);
			})
	};
	const showFlashMessage = (message: string, type: 'danger' | 'success' | 'warning') => {
		showMessage({
			message: message,
			type: type,
			statusBarHeight: StatusBar.currentHeight,
		})
	}
	// @ts-ignore
	return (
		<SafeAreaView style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'}]}>
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
							navigation.navigate(Routes.LoginScreen);
						}}
						backArrowColor={colorSchema === 'dark' ? '#FFF' : '#000'}
						buttonBackgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
					/>
				</View>

				<View id={'header-text-view'} style={Style.headerTextView}>
					<HeaderText text={'Forgot Password?'} textColor={'#FFF'} />

					<Text style={Style.subHeaderTextView}>
						Don't worry! It occurs. Please enter the email address linked with
						your account.
					</Text>
				</View>
			</ImageBackground>

			<View style={Style.inputFieldContainer}>
				<EditText
					text={'Email'}
					textColor={colorSchema === 'light' ? '#000' : '#FFF'}
					placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
					backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
					leftMargin={0}
					rightMargin={0}
					inputType={'email'}
					value={defaultEmailValue}
					onChangeText={(value: SetStateAction<string>) => {
						setDefaultEmailValue(value);
					}}
				/>

				<AwesomeButton
					style={{marginTop: 25}}
					backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
					raiseLevel={0}
					progress={true}
					stretch={true}
					onPress={async (next) => {
						await fetchUidAndSendOtp();

						if (next) {
							next();
						}
					}}
					borderRadius={8}
					activeOpacity={0.5}>
					<Text
						style={{
							color: colorSchema === 'dark' ? '#FFF' : '#000',
							fontWeight: '500',
						}}>
						Send OTP
					</Text>
				</AwesomeButton>

			</View>
		</SafeAreaView>
	);
};

export default ForgetPasswordPage;
