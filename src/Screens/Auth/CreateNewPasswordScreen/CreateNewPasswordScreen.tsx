import {
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import Style from './Style.ts';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from "../../../Navigation/Routes.ts";
import HeaderText from '../../../Components/HeaderText/HeaderText.tsx';
import EditText from '../../../Components/EditText/EditText.tsx';
import React, {SetStateAction, useEffect, useState} from 'react';
import LoginSignUpButton from '../../../Components/LoginSignUpButton/LoginSignUpButton.tsx';
import {verticalScale} from "../../../Assets/ScalingUtility/ScalingUtility";
import AwesomeButton from "react-native-really-awesome-button";
import firestore from "@react-native-firebase/firestore";
import {useRoute} from "@react-navigation/native";

const CreateNewPasswordScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultNewPasswordValue, setDefaultNewPasswordValue] = useState('');
	const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] =
		useState('');

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
	}

	const checkPreviouslyUsedPassword = async () => {
		if (email != null) {
			const passwordDoc = await firestore()
				.doc('users')
				.collection(email)
				.get()
		}
	};

	return (
		<SafeAreaView>
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
		</SafeAreaView>
	);
};

export default CreateNewPasswordScreen;
