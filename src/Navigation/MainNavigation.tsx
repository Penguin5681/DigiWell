import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes.ts';
import WelcomeScreen from "../Screens/Core/WelcomeScreen/WelcomeScreen.tsx";
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
import CreateUsernameScreen from '../Screens/Auth/CreateUsernameScreen/CreateUsernameScreen.tsx';
import CreateAnAccount from '../Screens/Auth/CreateAnAccount/CreateAnAccount.tsx';
import DashboardScreen from '../Screens/Core/DashboardScreen/DashboardScreen.tsx';

const StackBase = createStackNavigator();

const MainNavigation: React.FC = () => {
	return (
		<StackBase.Navigator
			initialRouteName={'WelcomeScreen'}
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
			<StackBase.Screen
				name={Routes.WelcomeScreen}
				component={WelcomeScreen} />
			<StackBase.Screen
				name={Routes.LoginScreen}
				component={LoginScreen} />
			<StackBase.Screen
				name={Routes.RegisterScreen}
				component={RegisterScreen}
			/>
			<StackBase.Screen
				name={Routes.RegistrationOTPVerificationScreen}
				component={RegistrationOTPVerificationScreen}
			/>
			<StackBase.Screen
				name={Routes.ForgetPasswordPage}
				component={ForgetPasswordPage}
			/>
			<StackBase.Screen
				name={Routes.ForgetPasswordOTPVerificationScreen}
				component={ForgetPasswordOTPVerificationScreen}
			/>
			<StackBase.Screen
				name={Routes.CreateNewPasswordScreen}
				component={CreateNewPasswordScreen}
			/>
			<StackBase.Screen
				name={Routes.PasswordChangedScreen}
				component={PasswordChangedScreen}
			/>
			<StackBase.Screen
				name={Routes.DashboardScreen}
				component={DashboardScreen}
			/>
			<StackBase.Screen
				name={Routes.ProfileSettingScreen}
				component={ProfileSettingsScreen}
			/>
			<StackBase.Screen
				name={Routes.EditProfileScreen}
				component={EditProfileScreen}
			/>
			<StackBase.Screen
				name={Routes.AvatarUploadScreen}
				component={AvatarUploadScreen}
			/>
			<StackBase.Screen
				name={Routes.CreateUsernameScreen}
				component={CreateUsernameScreen}
			/>
			<StackBase.Screen
				name={Routes.CreateAnAccount}
				component={CreateAnAccount}
			/>
		</StackBase.Navigator>
	);
};

export default MainNavigation;
