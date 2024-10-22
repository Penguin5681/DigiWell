import GlobalStyle from "../../../Assets/GlobalStyles/GlobalStyle";
import { SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import Style from './Style.ts';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import { VectorIcons } from '../../../Assets/Images/VectorIcons.ts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Routes } from '../../../Navigation/Routes.ts';
import DailyUsageStats from '../MaterialTabs/Screen/DailyUsageStats/DailyUsageStats.tsx';
import WeeklyUsageStats from '../MaterialTabs/Screen/WeeklyUsageStats/WeeklyUsageStats.tsx';
import MonthlyUsageStats from '../MaterialTabs/Screen/MonthlyUsageStats/MonthlyUsageStats.tsx';
import { scaleFontSize } from '../../../Utility/ScalingUtility/ScalingUtility';
import { NativeModules } from 'react-native';
const { NotificationModule } = NativeModules;

const AnalyticsScreen = () => {
	const colorSchema = useColorScheme();
	const darkModeGradientColorList = ['#3f3c3c', '#313334', '#1a1a1a'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#b8c0c2'];
	const [periodicNotificationCount, setPeriodicNotificationCount] = useState(0);
	const [mostNotificationCount, setMostNotificationCount] = useState(0);

	const fetchNotifications = async () => {
		try {
			const count = await NotificationModule.getTotalNotificationCount();
			setPeriodicNotificationCount(count);
		} catch (error) {
			console.error('Error fetching notification count:', error);
		}
	};

	useEffect(() => {
		fetchNotifications()
			.then(() => {})
			.catch(() => {});
	}, []);

	const MaterialTopTabs = createMaterialTopTabNavigator();

	return (
		<SafeAreaView style={[
			GlobalStyle.globalBackgroundFlex,
			{ backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF' },
			{ marginTop: StatusBar.currentHeight }
		]}>
			<StatusBar
				backgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
				barStyle={colorSchema === 'dark' ? 'light-content' : 'dark-content'}
				translucent={true}
			/>

			<View style={Style.notificationStatContainer}>
				<View style={Style.periodicNotificationCount}>
					<LinearGradient
						style={Style.gradientWrapper}
						colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}
					>
						<View style={Style.periodicNotificationCountHeaderContainer}>
							<SvgXml xml={VectorIcons.yellowBellIcon} width={30} height={30} />
							<Text style={[Style.headerLabelText, { color: colorSchema === 'dark' ? "#FFF" : "#000" }]}>
								Notification Count
							</Text>
						</View>

						<View style={Style.countTextWrapper}>
							<Text style={[Style.countText, { color: colorSchema === 'dark' ? "#FFF" : '#000' }]}>
								{periodicNotificationCount}
							</Text>
						</View>

					</LinearGradient>
				</View>

				<View style={Style.peakNotificationCountContainer}>
					<LinearGradient
						style={Style.gradientWrapper}
						colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>
						<View style={Style.peakNotificationCountHeaderContainer}>
							<SvgXml xml={VectorIcons.yellowBellIcon} width={30} height={30} />
							<Text style={[Style.headerLabelText, { color: colorSchema === 'dark' ? "#FFF" : "#000" }]}>
								Most Notifications
							</Text>
						</View>

						<View style={Style.countTextWrapper}>
							<Text style={[Style.countText, { color: colorSchema === 'dark' ? "#FFF" : '#000' }]}>
								{mostNotificationCount}
							</Text>
						</View>

					</LinearGradient>
				</View>
			</View>

			<View style={Style.bodyContainer}>
				<MaterialTopTabs.Navigator
					screenOptions={{
						tabBarStyle: {
							backgroundColor: colorSchema === 'dark' ? '#1a1a1a' : '#f0f0f0',
							borderRadius: 12,
							margin: 10,
						},
						tabBarIndicatorStyle: {
							backgroundColor: colorSchema === 'dark' ? '#666666' : '#d0d0d0',
							height: '80%',
							borderRadius: 11,
							width: "30%",
							marginHorizontal: 5,
							marginVertical: 5,
						},
						tabBarLabelStyle: {
							textTransform: 'none',
							fontSize: scaleFontSize(18),
							fontWeight: '500',
							color: colorSchema === 'dark' ? '#fff' : '#000',
						},
						tabBarItemStyle: {
							borderRadius: 11,
							marginHorizontal: 5,
						},
						swipeEnabled: true,
					}}
					initialRouteName={Routes.DailyUsageStats}>
					<MaterialTopTabs.Screen
						name={Routes.DailyUsageStats}
						component={DailyUsageStats}
						options={{ title: 'Day' }}
					/>
					<MaterialTopTabs.Screen
						name={Routes.WeeklyUsageStats}
						component={WeeklyUsageStats}
						options={{ title: 'Week' }}
					/>
					<MaterialTopTabs.Screen
					name={Routes.MonthlyUsageStats}
					component={MonthlyUsageStats}
					options={{ title: 'Month' }}
				/>
				</MaterialTopTabs.Navigator>
			</View>

		</SafeAreaView>
	);
};

export default AnalyticsScreen;
