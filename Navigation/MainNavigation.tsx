import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import WelcomeScreen from '../Screens/WelcomeScreen/WelcomeScreen.tsx';
import LoginScreen from '../Screens/LoginScreen/LoginScreen.tsx';
import RegisterScreen from '../Screens/RegisterScreen/RegisterScreen.tsx';
import ForgetPasswordPage from '../Screens/ForgetPasswordPage/ForgetPasswordPage.tsx';
import ForgetPasswordOTPVerificationScreen
    from '../Screens/ForgetPasswordOTPVerificationScreen/ForgetPasswordOTPVerificationScreen.tsx';
import CreateNewPasswordPageScreen from '../Screens/CreateNewPasswordPageScreen/CreateNewPasswordPageScreen.tsx';
import PasswordChangedScreen from '../Screens/PasswordChangedScreen/PasswordChangedScreen.tsx';
import BottomTabNavigation from './BottomTabNavigation.tsx';
import RegistrationOTPVerificationScreen
    from '../Screens/RegistrationOTPVerificationScreen/RegistrationOTPVerificationScreen.tsx';
import PhotoUploadScreen from '../Screens/PhotoUploadScreen/PhotoUploadScreen.tsx';
import AvatarUploadScreen from '../Screens/AvatarUploadScreen/AvatarUploadScreen.tsx';
import PasswordResetLinkSentSuccessfullyScreen
    from '../Screens/PasswordResetLinkSentSuccessfullyScreen/PasswordResetLinkSentSuccessfullyScreen.tsx';
import ProfileSettingsScreen from '../Screens/ProfileSettingsScreen/ProfileSettingsScreen.tsx';
import EditProfileScreen from '../Screens/EditProfileScreen/EditProfileScreen.tsx';

const StackBase = createStackNavigator();

const MainNavigation: React.FC = () => {
    return (
        <StackBase.Navigator
            initialRouteName={"WelcomeScreen"}
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                transitionSpec: {
                    open: {
                        animation: "timing",
                        config: {
                            duration: 300
                        }
                    },
                    close: {
                        animation: "timing",
                        config: {
                            duration: 300
                        }
                    }
                },
                cardStyleInterpolator: ({current, layouts}) => {
                    return {
                        cardStyle: {
                            transform: [{
                                translateX: current.progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [layouts.screen.width, 0],
                                }),
                            },],
                        },
                    };
                },
            }}
        >

            <StackBase.Screen name={Routes.WelcomeScreen}
                              component={WelcomeScreen}/>
            <StackBase.Screen name={Routes.LoginScreen}
                              component={LoginScreen}/>
            <StackBase.Screen name={Routes.RegisterScreen}
                              component={RegisterScreen}/>
            <StackBase.Screen name={Routes.RegistrationOTPVerificationScreen}
                              component={RegistrationOTPVerificationScreen}/>
            <StackBase.Screen name={Routes.PhotoUploadScreen}
                              component={PhotoUploadScreen}/>
            <StackBase.Screen name={Routes.ForgetPasswordPage}
                              component={ForgetPasswordPage}/>
            <StackBase.Screen name={Routes.ForgetPasswordOTPVerificationScreen}
                              component={ForgetPasswordOTPVerificationScreen}/>
            <StackBase.Screen name={Routes.CreateNewPasswordPageScreen}
                              component={CreateNewPasswordPageScreen}/>
            <StackBase.Screen name={Routes.PasswordChangedScreen}
                              component={PasswordChangedScreen}/>
            <StackBase.Screen name={Routes.PasswordResetLinkSentSuccessfullyScreen}
                              component={PasswordResetLinkSentSuccessfullyScreen}/>
            <StackBase.Screen name={Routes.HomePage}
                              component={BottomTabNavigation}/>
            <StackBase.Screen name={Routes.ProfileSettingScreen}
                              component={ProfileSettingsScreen}/>
            <StackBase.Screen name={Routes.EditProfileScreen}
                              component={EditProfileScreen}/>
            <StackBase.Screen name={Routes.AvatarUploadScreen}
                              component={AvatarUploadScreen}/>
        </StackBase.Navigator>
    );
};

export default MainNavigation;
