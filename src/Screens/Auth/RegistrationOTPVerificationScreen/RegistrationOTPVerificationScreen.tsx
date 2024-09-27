import React, {useState} from 'react';
import {
	Alert,
	ImageBackground,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import Style from '../../Core/ForgetPasswordOTPVerificationScreen/Style.ts';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from '../../../Navigation/Routes.ts';
import HeaderText from '../../../Components/HeaderText/HeaderText.tsx';
import {OtpInput} from 'react-native-otp-entry';
import functions from '@react-native-firebase/functions';
import {useRoute} from '@react-navigation/native';
import AwesomeButton from 'react-native-really-awesome-button';
import {verticalScale} from '../../../Assets/ScalingUtility/ScalingUtility';
import {showMessage} from 'react-native-flash-message';

const RegistrationOTPVerificationScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultOTP, setDefaultOTP] = useState('');

	interface RouteParams {
		defaultEmailValue: string;
	}

	const route = useRoute();
	const routeParams = route.params as RouteParams | undefined;
	const email = routeParams?.defaultEmailValue;

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

	const sendOtp = async () => {
		try {
			await functions().httpsCallable('sendOtpEmail')({email: email});
		} catch (error) {
			console.log(error);
		}
	};
	const verifyOtp = async () => {
		try {
			interface VerifyOtpResponse {
				success: boolean;
			}

			const result = await functions().httpsCallable('verifyOtp')({
				email,
				otp: defaultOTP,
			});
			const data = result.data as VerifyOtpResponse;
			if (data.success) {
				showFlashMessage('OTP has been verified successfully', 'success');
				navigation.replace(Routes.RegisterScreen, {defaultEmailValue: email});
			}
		} catch (error) {
			showFlashMessage('OTP verification failed', 'danger');
			Alert.alert(
				'Error Occurred',
				'Invalid OTP. Please retry',
				[
					{
						text: 'Resend OTP',
						onPress: () => sendOtp(),
						style: 'cancel',
					},
					{
						text: 'Dismiss',
						onPress: () => {
							console.log('Prompt Dismissed');
							showFlashMessage('Please re enter the OTP.', 'warning');
						},
						style: 'default',
					},
				],
				{
					cancelable: true,
				},
			);
		}
	};
	// @ts-ignore
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
							navigation.navigate(Routes.CreateAnAccount);
						}}
						backArrowColor={colorSchema === 'dark' ? '#FFF' : '#000'}
						buttonBackgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
					/>
				</View>

				<View id={'header-text-view'} style={Style.headerTextView}>
					<HeaderText text={'OTP Verification'} textColor={'#FFF'} />

					<Text style={Style.subHeaderTextView}>
						Enter the verification code we just sent on your email address.
					</Text>
				</View>
			</ImageBackground>

			<View
				style={[
					Style.otpInputContainer,
					{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
				]}>
				<View style={Style.otpInputStyle}>
					<OtpInput
						numberOfDigits={4}
						focusStickBlinkingDuration={700}
						focusColor={'#35C2C1'}
						onTextChange={value => {
							console.log('onTextChange() => ' + value);
						}}
						onFilled={value => {
							console.log('onFilled() => ' + value);
							setDefaultOTP(value);
						}}
						autoFocus={true}
					/>
				</View>

				<View style={Style.verifyButtonContainer}>
					<AwesomeButton
						style={{marginTop: verticalScale(24)}}
						backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
						raiseLevel={0}
						progress={true}
						stretch={true}
						borderRadius={8}
						activeOpacity={0.5}
						disabled={!(defaultOTP.length === 4)}
						onPress={async next => {
							await verifyOtp()
								.then(() => {})
								.catch(reason => {});

							if (next) {
								next();
							}
						}}>
						<Text
							style={{
								color: colorSchema === 'dark' ? '#FFF' : '#000',
								fontWeight: '500',
							}}>
							Verify OTP
						</Text>
					</AwesomeButton>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RegistrationOTPVerificationScreen;
