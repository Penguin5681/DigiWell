import {createStackNavigator} from "@react-navigation/stack";
import {Routes} from "./Routes";
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen.tsx";
import LoginScreen from "../Screens/LoginScreen/LoginScreen.tsx";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen.tsx";
import ForgetPasswordPage from "../Screens/ForgetPasswordPage/ForgetPasswordPage.tsx";
import ProfilePreviewScreen from "../Screens/ProfilePreviewScreen/ProfilePreviewScreen.tsx";
import ProfileSettingsScreen from "../Screens/ProfileSettingsScreen/ProfileSettingsScreen.tsx";
import EditProfileScreen from "../Screens/EditProfileScreen/EditProfileScreen.tsx";

const StackBase= createStackNavigator();
const MainNavigation = () => {
    return (
        <StackBase.Navigator screenOptions={{headerShown: false}}>
          {/*<StackBase.Screen name={Routes.WelcomeScreen} component={WelcomeScreen}/>*/}
          {/*<StackBase.Screen name={Routes.LoginScreen} component={LoginScreen}/>*/}
          {/*<StackBase.Screen name={Routes.ForgetPasswordPage} component={ForgetPasswordPage}/>*/}
          {/*<StackBase.Screen name={Routes.RegisterScreen} component={RegisterScreen}/>*/}
          {/*<StackBase.Screen name={Routes.ProfilePreviewScreen} component={ProfilePreviewScreen}/>*/}
            <StackBase.Screen name={Routes.ProfileSettingScreen} component={ProfileSettingsScreen}/>
          {/*<StackBase.Screen name={Routes.EditProfileScreen} component={EditProfileScreen}/>*/}
        </StackBase.Navigator>
    );
};

export default MainNavigation;
