import {
	ImageBackground,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	ToastAndroid,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';
import Style from './Style.ts';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from '../../../Navigation/Routes.ts';
import HeaderText from '../../../Components/HeaderText/HeaderText.tsx';
import React, {useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import functions from '@react-native-firebase/functions';
import {useRoute} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import AwesomeButton from 'react-native-really-awesome-button';
import {verticalScale} from '../../../Utility/ScalingUtility/ScalingUtility';

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
			await functions().httpsCallable('sendPasswordResetOtp')({
				email: defaultEmailValue,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const showFlashMessage = (
		message: string,
		type: 'danger' | 'success' | 'warning',
	) => {
		showMessage({
			message: message,
			type: type,
			statusBarHeight: StatusBar.currentHeight,
		});
	};

	const verifyOtp = async () => {
		try {
			interface VerifyOtpResponse {
				success: boolean;
			}

			const result = await functions().httpsCallable('verifyPasswordResetOtp')({
				email,
				otp: defaultOTP,
			});
			const data = result.data as VerifyOtpResponse;
			if (data.success) {
				showFlashMessage(`OTP Verification Success!`, 'success');
				navigation.replace(Routes.CreateNewPasswordScreen, {defaultEmailValue});
			}
		} catch (error) {
			showFlashMessage('OTP Verification Failed!', 'danger');
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
					<TouchableOpacity
						onPress={() => {
							sendOtp().catch(error => {
								console.log('OTP Error Occurred: ' + error);
							});
							ToastAndroid.show('OTP Sent', ToastAndroid.SHORT);
						}}>
						<Text style={Style.resendOTPText}>Didn't receive OTP? Re-send</Text>
					</TouchableOpacity>
				</View>

				<View style={Style.verifyButtonContainer}>
					<AwesomeButton
						style={{marginTop: verticalScale(38)}}
						backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
						raiseLevel={0}
						progress={true}
						stretch={true}
						borderRadius={8}
						onPress={async next => {
							await verifyOtp()
								.then(() => {})
								.catch(() => {});

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
							Verify
						</Text>
					</AwesomeButton>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ForgetPasswordOTPVerificationScreen;
