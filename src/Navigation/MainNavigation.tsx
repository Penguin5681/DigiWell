import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native'; // Add loading indicator
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes.ts';
import WelcomeScreen from '../Screens/Core/WelcomeScreen/WelcomeScreen.tsx';
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen.tsx';
import RegisterScreen from '../Screens/Auth/RegisterScreen/RegisterScreen.tsx';
import ForgetPasswordPage from '../Screens/Auth/ForgetPasswordPage/ForgetPasswordPage.tsx';
import ForgetPasswordOTPVerificationScreen from '../Screens/Core/ForgetPasswordOTPVerificationScreen/ForgetPasswordOTPVerificationScreen.tsx';
import CreateNewPasswordScreen from '../Screens/Auth/CreateNewPasswordScreen/CreateNewPasswordScreen.tsx';
import PasswordChangedScreen from '../Screens/Auth/PasswordChangedScreen/PasswordChangedScreen.tsx';
import RegistrationOTPVerificationScreen from '../Screens/Auth/RegistrationOTPVerificationScreen/RegistrationOTPVerificationScreen.tsx';
import AvatarUploadScreen from '../Screens/Core/AvatarUploadScreen/AvatarUploadScreen.tsx';
import ProfileSettingsScreen from '../Screens/Core/ProfileSettingsScreen/ProfileSettingsScreen.tsx';
import EditProfileScreen from '../Screens/Core/EditProfileScreen/EditProfileScreen.tsx';
import CreateAnAccount from '../Screens/Auth/CreateAnAccount/CreateAnAccount.tsx';
import DashboardScreen from '../Screens/Core/DashboardScreen/DashboardScreen.tsx';
import BottomTabNavigation from './BottomTabNavigation.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackBase = createStackNavigator();

const MainNavigation: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

	// Function to check if the user is logged in
	const checkLoginStatus = async () => {
		try {
			// Get the user token or login status from AsyncStorage
			const userToken = await AsyncStorage.getItem('userToken');

			// If token exists, user is logged in
			if (userToken) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		} catch (e) {
			// Handle error
			console.error('Failed to fetch user token:', e);
			setIsLoggedIn(false);
		} finally {
			// Hide the loading indicator
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// On component mount, check the user's login status
		checkLoginStatus();
	}, []);


	return (
		<StackBase.Navigator
			initialRouteName={isLoggedIn ? Routes.DashboardScreen : Routes.WelcomeScreen}
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				transitionSpec: {
					open: {
						animation: 'timing',
						config: {
							duration: 300,
						},
					},
					close: {
						animation: 'timing',
						config: {
							duration: 300,
						},
					},
				},
				cardStyleInterpolator: ({current, layouts}) => {
					return {
						cardStyle: {
							transform: [
								{
									translateX: current.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [layouts.screen.width, 0],
									}),
								},
							],
						},
					};
				},
			}}>
			{/* Auth Screens */}
			<StackBase.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />
			<StackBase.Screen name={Routes.LoginScreen} component={LoginScreen} />
			<StackBase.Screen name={Routes.RegisterScreen} component={RegisterScreen} />
			<StackBase.Screen name={Routes.RegistrationOTPVerificationScreen} component={RegistrationOTPVerificationScreen} />
			<StackBase.Screen name={Routes.ForgetPasswordPage} component={ForgetPasswordPage} />
			<StackBase.Screen name={Routes.ForgetPasswordOTPVerificationScreen} component={ForgetPasswordOTPVerificationScreen} />
			<StackBase.Screen name={Routes.CreateNewPasswordScreen} component={CreateNewPasswordScreen} />
			<StackBase.Screen name={Routes.PasswordChangedScreen} component={PasswordChangedScreen} />
			<StackBase.Screen name={Routes.CreateAnAccount} component={CreateAnAccount} />

			{/* App Screens */}
			<StackBase.Screen name={Routes.DashboardScreen} component={BottomTabNavigation} />
			<StackBase.Screen name={Routes.ProfileSettingScreen} component={ProfileSettingsScreen} />
			<StackBase.Screen name={Routes.EditProfileScreen} component={EditProfileScreen} />
			<StackBase.Screen name={Routes.AvatarUploadScreen} component={AvatarUploadScreen} />
		</StackBase.Navigator>
	);
};

export default MainNavigation;
