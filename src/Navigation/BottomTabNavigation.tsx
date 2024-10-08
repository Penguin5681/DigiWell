import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {Routes} from "./Routes.ts";
import Icon from 'react-native-vector-icons/Feather';
import DashboardScreen from "../Screens/Core/DashboardScreen/DashboardScreen.tsx";
import AnalyticsScreen from "../Screens/Core/AnalyticsScreen/AnalyticsScreen.tsx";
import AppLimitsScreen from "../Screens/Core/AppLimitsScreen/AppLimitsScreen.tsx";
import ProfilePreviewScreen from "../Screens/Core/ProfilePreviewScreen/ProfilePreviewScreen.tsx";
import CustomIcon from "../Utility/IconUtility/Icon.tsx";
import {SVG} from "../Assets/Images/SVGs/SVGIcons.ts";
import {useColorScheme} from "react-native";

const Tabs = AnimatedTabBarNavigator();

const BottomTabNavigation = () => {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<Tabs.Navigator
			tabBarOptions={{
				activeTintColor: '#000',
				inactiveTintColor: '#6A6A6A',
				activeBackgroundColor: '#61DA5E',
			}}
			appearance={{
				tabBarBackground: isDarkMode ? '#1E232C' : '#E5E4E2',
				shadow: true,
				floating: true,


			}}
			backBehavior={'initialRoute'}
			initialRouteName={Routes.DashboardScreen}>
			<Tabs.Screen
				name="Dashboard"
				component={DashboardScreen}
				options={{
					tabBarIcon: () => (
						<CustomIcon xml={isDarkMode ? SVG.home_bottom_nav_dark_mode : SVG.home_bottom_nav_light_mode}/>
					),
				}}
			/>
			<Tabs.Screen
				name="Analytics"
				component={AnalyticsScreen}
				options={{
					tabBarIcon: () => (
						<CustomIcon xml={isDarkMode ? SVG.analytics_bottom_nav_dark_mode : SVG.analytics_bottom_nav_light_mode}/>
					),
				}}
			/>
			<Tabs.Screen
				name="App Limit"
				component={AppLimitsScreen}
				options={{
					tabBarIcon: () => (
						<CustomIcon xml={isDarkMode ? SVG.appLimit_bottom_nav_dark_mode : SVG.appLimit_bottom_nav_light_mode}/>
					),
				}}
			/>

			<Tabs.Screen
				name="Profile"
				component={ProfilePreviewScreen}
				options={{
					tabBarIcon: () => (
						<CustomIcon xml={isDarkMode ? SVG.profile_bottom_nav_dark_mode : SVG.profile_bottom_nav_light_mode}/>
					),
				}}
			/>
		</Tabs.Navigator>
	);
};

export default BottomTabNavigation;
