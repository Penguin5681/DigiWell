import {createStackNavigator} from "@react-navigation/stack";
import {Routes} from "./Routes";
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen.tsx";
import LoginScreen from "../Screens/LoginScreen/LoginScreen.tsx";

const StackBase= createStackNavigator();
const MainNavigation = () => {
    return (
        <StackBase.Navigator screenOptions={{headerShown: false}}>
            <StackBase.Screen name={Routes.LoginScreen} component={LoginScreen}/>
        </StackBase.Navigator>
    );
};

export default MainNavigation;
