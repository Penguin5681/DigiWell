import {createStackNavigator} from "@react-navigation/stack";
import {Routes} from "./Routes";
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen.tsx";
import LoginScreen from "../Screens/LoginScreen/LoginScreen.tsx";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen.tsx";
import ForgetPasswordPage from "../Screens/ForgetPasswordPage/ForgetPasswordPage.tsx";
import OTPVerificationScreen from "../Screens/OTPVerificationScreen/OTPVerificationScreen.tsx";
import CreateNewPasswordPageScreen from "../Screens/CreateNewPasswordPageScreen/CreateNewPasswordPageScreen.tsx";
import PasswordChangedScreen from "../Screens/PasswordChangedScreen/PasswordChangedScreen.tsx";

const StackBase= createStackNavigator();
const MainNavigation = () => {
    return (
        <StackBase.Navigator screenOptions={{headerShown: false}}>
            <StackBase.Screen name={Routes.WelcomeScreen} component={WelcomeScreen}/>
            <StackBase.Screen name={Routes.LoginScreen} component={LoginScreen}/>
            <StackBase.Screen name={Routes.ForgetPasswordPage} component={ForgetPasswordPage}/>
            <StackBase.Screen name={Routes.RegisterScreen} component={RegisterScreen}/>
            <StackBase.Screen name={Routes.OTPVerificationScreen} component={OTPVerificationScreen}/>
            <StackBase.Screen name={Routes.CreateNewPasswordPageScreen} component={CreateNewPasswordPageScreen}/>
            <StackBase.Screen name={Routes.PasswordChangedScreen} component={PasswordChangedScreen}/>
            {/*<StackBase.Screen name={Routes.HomePage} component={HomePage}/>*/}
            {/*<StackBase.Screen name={Routes.DashboardScreen} component={DashboardScreen}/>*/}
            {/*<StackBase.Screen name={Routes.AppUsageScreen} component={AppUsageScreen}/>*/}
            {/*<StackBase.Screen name={Routes.DetailedAppUsageScreen} component={DetailedAppUsageScreen}/>*/}
            {/*<StackBase.Screen name={Routes.ProfileScreen} component={ProfileScreen}/>*/}
        </StackBase.Navigator>
    );
};

export default MainNavigation;
