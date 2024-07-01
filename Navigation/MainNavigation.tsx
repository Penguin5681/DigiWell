import {createStackNavigator} from "@react-navigation/stack";
import {Routes} from "./Routes";
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen.tsx";
import LoginScreen from "../Screens/LoginScreen/LoginScreen.tsx";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen.tsx";
import ForgetPasswordPage from "../Screens/ForgetPasswordPage/ForgetPasswordPage.tsx";
import ForgetPasswordOTPVerificationScreen from "../Screens/ForgetPasswordOTPVerificationScreen/ForgetPasswordOTPVerificationScreen.tsx";
import CreateNewPasswordPageScreen from "../Screens/CreateNewPasswordPageScreen/CreateNewPasswordPageScreen.tsx";
import PasswordChangedScreen from "../Screens/PasswordChangedScreen/PasswordChangedScreen.tsx";
import React from "react";
import BottomTabNavigation from "./BottomTabNavigation.tsx";
import RegistrationOTPVerificationScreen
    from "../Screens/RegistrationOTPVerificationScreen/RegistrationOTPVerificationScreen.tsx";

const StackBase = createStackNavigator();
const MainNavigation: React.FC = () => {
    return (
        <StackBase.Navigator screenOptions={{headerShown: false}}>
            {/*<StackBase.Screen name={Routes.WelcomeScreen} component={WelcomeScreen}/>*/}
            {/*<StackBase.Screen name={Routes.LoginScreen} component={LoginScreen}/>*/}
            {/*<StackBase.Screen name={Routes.ForgetPasswordPage} component={ForgetPasswordPage}/>*/}
            {/*<StackBase.Screen name={Routes.RegisterScreen} component={RegisterScreen}/>*/}
            {/*<StackBase.Screen name={Routes.RegistrationOTPVerificationScreen} component={RegistrationOTPVerificationScreen}/>*/}
            {/*<StackBase.Screen name={Routes.ForgetPasswordOTPVerificationScreen}*/}
            {/*component={ForgetPasswordOTPVerificationScreen}/>*/}
            {/*<StackBase.Screen name={Routes.CreateNewPasswordPageScreen} component={CreateNewPasswordPageScreen}/>*/}
            {/*<StackBase.Screen name={Routes.PasswordChangedScreen} component={PasswordChangedScreen}/>*/}
            <StackBase.Screen name={Routes.HomePage} component={BottomTabNavigation}/>
        </StackBase.Navigator>
    );
};

export default MainNavigation;
