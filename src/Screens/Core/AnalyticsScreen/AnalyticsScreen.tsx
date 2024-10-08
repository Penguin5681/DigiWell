import GlobalStyle from "../../../Assets/GlobalStyles/GlobalStyle";
import {SafeAreaView, StatusBar, Text, useColorScheme, View} from 'react-native';
import React, {useState} from 'react';
import Style from './Style.ts';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {VectorIcons} from '../../../Assets/Images/VectorIcons.ts';
import CustomIcon from '../../../Utility/IconUtility/Icon.tsx';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const AnalyticsScreen = () => {
	const colorSchema = useColorScheme();
	const darkModeGradientColorList = ['#3f3c3c', '#313334', '#1a1a1a'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#b8c0c2'];
	const [periodicNotificationCount, setPeriodicNotificationCount] = useState(0);
	const [mostNotificaitonCount, setMostNotificaitonCount] = useState(0);

	const MaterialTopTabs = createMaterialTopTabNavigator();

	return (
		<SafeAreaView style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : "#FFF"}, {marginTop: StatusBar.currentHeight}]}>
			<StatusBar
				backgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
				barStyle={colorSchema === 'dark' ? 'light-content' : 'dark-content'}
				translucent={true}
			/>
			<View style={Style.notificationStatContainer}>
				<View style={Style.periodicNotificationCount}>
					<LinearGradient
						style={Style.gradientWrapper}
						colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>

						<View style={Style.periodicNotificationCountHeaderContainer}>
							<SvgXml
								xml={VectorIcons.yellowBellIcon}
								width={30}
								height={30}/>

							<Text style={[Style.headerLabelText, {color: colorSchema === 'dark' ? "#FFF" : "#000"}]}>
								Notification Count
							</Text>
						</View>

						<View style={Style.countTextWrapper}>
							<Text style={[Style.countText, {color: colorSchema === 'dark' ? "#FFF" : '#000'}]}>
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
							<SvgXml
								xml={VectorIcons.yellowBellIcon}
								width={30}
								height={30}/>

							<Text style={[Style.headerLabelText, {color: colorSchema === 'dark' ? "#FFF" : "#000"}]}>
								Most Notifications
							</Text>
						</View>

						<View style={Style.countTextWrapper}>
							<Text style={[Style.countText, {color: colorSchema === 'dark' ? "#FFF" : '#000'}]}>
								{periodicNotificationCount}
							</Text>
						</View>

					</LinearGradient>
				</View>
			</View>

		</SafeAreaView>
	);
};

export default AnalyticsScreen;
