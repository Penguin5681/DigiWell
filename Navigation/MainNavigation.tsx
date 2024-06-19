import {createStackNavigator} from "@react-navigation/stack";
import {Routes} from "./Routes";
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen.tsx";
import LoginScreen from "../Screens/LoginScreen/LoginScreen.tsx";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen.tsx";

const StackBase= createStackNavigator();
const MainNavigation = () => {
    return (
        <StackBase.Navigator screenOptions={{headerShown: false}}>
            <StackBase.Screen name={Routes.WelcomeScreen} component={WelcomeScreen}/>
            <StackBase.Screen name={Routes.LoginScreen} component={LoginScreen}/>
            <StackBase.Screen name={Routes.RegisterScreen} component={RegisterScreen}/>
        </StackBase.Navigator>
    );
};

export default MainNavigation;
