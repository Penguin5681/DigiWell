import {
	ImageBackground,
	SafeAreaView,
	StatusBar,
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
import {verticalScale} from '../../../Assets/ScalingUtility/ScalingUtility';
import AwesomeButton from 'react-native-really-awesome-button';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import functions from '@react-native-firebase/functions';
import KeyboardCoveringContainer from '../../../Components/KeboardCoveringContainer/KeyboardCoveringContainer';

const CreateNewPasswordScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultNewPasswordValue, setDefaultNewPasswordValue] = useState('');
	const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] =
		useState('');
	const [previousPasswordValue, setPreviousPasswordValue] = useState('');
	const [uidValue, setUidValue] = useState('');
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

	const updatePassword = async () => {
		try {
			await functions().httpsCallable('updateUserPassword')({
				uid: uidValue,
				password: defaultConfirmPasswordValue,
			});
			showFlashMessage('Password Updated Successfully', 'success');
			navigation.replace(Routes.LoginScreen);
			await firestore()
				.collection('users')
				.doc(email)
				.update({
					password: encryptPassword(defaultNewPasswordValue, 7)
				})
		} catch (error: any) {
			console.error(error)
			showFlashMessage('Error updating the password', 'danger');
		}
	};

	interface RouteParams {
		defaultEmailValue: string;
	}

	const route = useRoute();
	const routeParams = route.params as RouteParams | undefined;
	const email = routeParams?.defaultEmailValue;

	const shift = 7;
	const encryptPassword = (password: string, shift: number): string => {
		return password
			.split('')
			.map(char => {
				const charCode = char.charCodeAt(0);
				return String.fromCharCode(charCode + shift);
			})
			.join('');
	};

	const decryptPassword = (encrypted: string, shift: number): string => {
		return encrypted
			.split('')
			.map(char => {
				const charCode = char.charCodeAt(0);
				return String.fromCharCode(charCode - shift);
			})
			.join('');
	};

	const validatePassword = () => {
		return defaultNewPasswordValue === defaultConfirmPasswordValue;
	};

	const fetchPreviouslyUsedPassword = async () => {
		await firestore()
			.collection('users')
			.doc(email)
			.get()
			.then(snapshot => {
				setPreviousPasswordValue(decryptPassword(snapshot.get('password'), 7));
			});
	};

	const fetchUid = async () => {
		await firestore()
			.collection('users')
			.doc(email)
			.get()
			.then(snapshot => {
				setUidValue(snapshot.get('uid'));
			});
	};

	useEffect(() => {
		fetchPreviouslyUsedPassword().then(() => null);
		fetchUid().then(() => null);

	}, []);

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'}}>
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
								navigation.navigate(Routes.ForgetPasswordPage);
							}}
							backArrowColor={colorSchema === 'dark' ? '#FFF' : '#000'}
							buttonBackgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
						/>
					</View>

					<View id={'header-text-view'} style={Style.headerTextView}>
						<HeaderText text={'Create new password'} textColor={'#FFF'} />

						<Text style={Style.subHeaderTextView}>
							Your new password must be unique from those previously used.
						</Text>
					</View>
				</ImageBackground>

				<View
					style={[
						Style.editTextContainer,
						{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
					]}>
					<View style={Style.newPasswordEditTextContainer}>
						<EditText
							text={'New Password'}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							leftMargin={0}
							rightMargin={0}
							inputType={'password'}
							value={defaultNewPasswordValue}
							onChangeText={(value: SetStateAction<string>) => {
								setDefaultNewPasswordValue(value);
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
					</View>
					<View style={Style.buttonContainer}>
						<AwesomeButton
							style={{marginTop: verticalScale(38)}}
							backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
							raiseLevel={0}
							progress={true}
							stretch={true}
							borderRadius={8}
							onPress={async next => {
								if (
									validatePassword() &&
									defaultConfirmPasswordValue !== previousPasswordValue
								) {
									await updatePassword()
										.then()
										.catch();
								} else {
									if (!validatePassword()) {
										showFlashMessage('Passwords do not match', 'warning');
									} else {
										if (
											validatePassword() &&
											defaultConfirmPasswordValue === previousPasswordValue
										) {
											showFlashMessage(
												'Current password can not be the same as the old one',
												'danger',
											);
										}
									}
								}

								if (next) {
									next();
								}
							}}
							activeOpacity={0.5}>
							<Text
								style={{
									color: colorSchema === 'dark' ? '#FFF' : '#000',
									fontWeight: '500',
								}}>
								Reset Password
							</Text>
						</AwesomeButton>
					</View>
				</View>
			</KeyboardCoveringContainer>
		</SafeAreaView>
	);
};

export default CreateNewPasswordScreen;
