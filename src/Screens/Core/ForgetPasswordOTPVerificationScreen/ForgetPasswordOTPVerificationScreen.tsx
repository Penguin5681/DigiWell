import {
	Alert,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	ToastAndroid,
	useColorScheme,
	View,
} from 'react-native';
import Style from './Style.ts';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from '../../../Navigation/Routes.ts';
import HeaderText from '../../../Components/HeaderText/HeaderText.tsx';
import {useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import LoginSignUpButton from '../../../Components/LoginSignUpButton/LoginSignUpButton.tsx';
import functions from '@react-native-firebase/functions';
import {useRoute} from '@react-navigation/native';
import firebaseAuth from '@react-native-firebase/auth';

const ForgetPasswordOTPVerificationScreen = ({
												 navigation,
											 }: {
	navigation: any;
}) => {
	const colorSchema = useColorScheme();
	const [defaultOTP, setDefaultOTP] = useState('');

	interface RouteParams {
		defaultEmailValue: string;
	}

	const route = useRoute();
	const routeParams = route.params as RouteParams | undefined;
	const email = routeParams?.defaultEmailValue;
	const defaultEmailValue = routeParams?.defaultEmailValue;
	const sendOtp = async () => {
		try {
			await functions().httpsCallable('sendOtpEmail')({
				email: defaultEmailValue,
			});
			navigation.navigate(Routes.ForgetPasswordOTPVerificationScreen, {
				defaultEmailValue,
			});
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
				if (email != null) {
					await firebaseAuth().sendPasswordResetEmail(email);
				}
				navigation.navigate(Routes.PasswordResetLinkSentSuccessfullyScreen);
			}
		} catch (error) {
			Alert.alert('Error Occurred', `OTP Verification failed`);
			console.log(error, 'Invalid OTP');
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
							navigation.navigate(Routes.ForgetPasswordPage);
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
						onFilled={value => {
							console.log(value);
							setDefaultOTP(value);
						}}
						autoFocus={false}
					/>
				</View>

				<View style={Style.resendOTPContainer}>
					<Text
						style={Style.resendOTPText}
						onPress={() => {
							sendOtp().catch(error => {
								console.log('OTP Error Occurred: ' + error);
							});
							ToastAndroid.show('OTP Sent', ToastAndroid.SHORT);
						}}>
						Didn't receive OTP? Re-send
					</Text>
				</View>

				<View style={Style.verifyButtonContainer}>
					<LoginSignUpButton
						text={'Verify'}
						textColor={'#FFF'}
						buttonColor={'#1E232C'}
						onPress={() => {
							verifyOtp().catch(error => {
								console.log(`OTP Verification Occurred: ${error}`);
							});
						}}
						isEnabled={defaultOTP.length === 4}
						topMargin={38}
						buttonRadius={8}
						leftMargin={0}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ForgetPasswordOTPVerificationScreen;
