import {AnimatedTabBarNavigator} from "react-native-animated-nav-tab-bar";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Routes} from "./Routes";
import DashboardScreen from "../Screens/DashboardScreen/DashboardScreen.tsx";
import AppUsageScreen from "../Screens/AppUsageScreen/AppUsageScreen.tsx";
import DetailedAppUsageScreen from "../Screens/DetailedAppUsageScreen/DetailedAppUsageScreen.tsx";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen.tsx";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={{headerShown: false}}>
            <BottomTab.Screen name={Routes.DashboardScreen} component={DashboardScreen}/>
            <BottomTab.Screen name={Routes.AppUsageScreen} component={AppUsageScreen}/>
            <BottomTab.Screen name={Routes.DetailedAppUsageScreen} component={DetailedAppUsageScreen}/>
            <BottomTab.Screen name={Routes.ProfileScreen} component={ProfileScreen}/>
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
