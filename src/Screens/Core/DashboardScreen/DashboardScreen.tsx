import {
	ActivityIndicator,
	Alert,
	AppState,
	BackHandler,
	Image,
	NativeModules,
	SafeAreaView,
	StatusBar,
	Text,
	ToastAndroid,
	useColorScheme,
	View,
} from 'react-native';
import GlobalStyle from '../../../Assets/GlobalStyles/GlobalStyle';
import Style from './Style.ts';
import {SvgXml} from 'react-native-svg';
import {VectorIcons} from '../../../Assets/Images/VectorIcons.ts';
import LabelText from '../../../Components/LabelText/LabelText.tsx';
import {
	scaleFontSize,
	verticalScale,
} from '../../../Utility/ScalingUtility/ScalingUtility';
import LinearGradient from 'react-native-linear-gradient';
import OptionsHeaderText from '../../../Components/OptionsHeaderText/OptionsHeaderText.tsx';
import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
	EventFrequency,
	queryUsageStats,
	showUsageAccessSettings,
} from '@brighthustle/react-native-usage-stats-manager';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import AppUsageStatContainerStyle from './AppUsageStatContainerStyle.ts';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {getUrbanistFontFamily} from '../../../Assets/Fonts/helper';
import { showMessage } from 'react-native-flash-message';

const FlashList = lazy(() =>
	import('@shopify/flash-list').then(module => ({default: module.FlashList})),
);

const {AppUsageModule} = NativeModules;

const DashboardScreen = ({navigation}: {navigation: any}) => {
	const [appsInstalled, setAppInstalled] = useState(0);
	const [defaultScreenTime, setDefaultScreenTime] = useState('');
	const colorSchema = useColorScheme();
	const darkModeGradientColorList = ['#3f3c3c', '#313334', '#1a1a1a'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#b8c0c2'];
	const [currentAppListView, setCurrentAppListView] = useState('Today')
	const [isOpen, setIsOpen] = useState(false);
	const [dropDownValue, setDropDownValue] = useState('today');
	const [dropDownItems, setDropDownItems] = useState([
		{label: 'Today', value: 'today'},
		{label: 'Weekly', value: 'weekly'},
		{label: 'Monthly', value: 'monthly'},
	]);
	const INTERVAL = {
		DAILY: 'daily',
		WEEKLY: 'weekly',
		MONTHLY: 'monthly',
	};
	const [permissionGranted, setPermissionGranted] = useState(false);
	const [backPressedTime, setBackPressedTime] = useState(0);
	const [appUsageData, setAppUsageData] = useState('');
	const showFlashMessage = (
		message: string,
		type: 'success' | 'warning' | 'danger',
	) => {
		showMessage({
			message: message,
			type: type,
			statusBarHeight: StatusBar.currentHeight,
		});
	};

	const parseTimeString = (timeString: string): number => {
		const timeParts = timeString.split(' ');
		let totalMinutes = 0;

		timeParts.forEach(part => {
			if (part.endsWith('h')) {
				totalMinutes += parseInt(part) * 60;
			} else if (part.endsWith('m')) {
				totalMinutes += parseInt(part);
			}
		});

		return totalMinutes;
	};

	const convertMinutesToTime = (totalMinutes: number): string => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		if (hours > 0 && minutes > 0) {
			return `${hours}h ${minutes}m`;
		} else if (hours > 0) {
			return `${hours}h`;
		} else {
			return `${minutes}m`;
		}
	};

	const sumAppUsageTime = async (interval: string): Promise<string> => {
		try {
			const data = await AppUsageModule.getUsageStats(interval);
			let totalUsageTimeInMinutes = 0;

			if (!data || data.length === 0) {
				console.log("No usage data received.");
				return '0h 0m';
			}

			data.forEach((app: {totalTimeInForeground: string}) => {
				const usageTimeInMinutes = parseTimeString(app.totalTimeInForeground);
				totalUsageTimeInMinutes += usageTimeInMinutes;
			});

			return convertMinutesToTime(totalUsageTimeInMinutes);
		} catch (error) {
			console.error('Error summing app usage time:', error);
			return '0h 0m';
		}
	};

	const getPlayStoreAppsCount = async () => {
		try {
			const count = await AppUsageModule.getPlayStoreAppsCount();
			console.log('Play Store Apps Count:', count);
			setAppInstalled(count);
		} catch (error) {
			console.error('Error fetching Play Store apps count:', error);
			setAppInstalled(0);
		}
	};

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				const BACK_BUTTON_DELAY = 2000;
				const currentTime = Date.now();

				if (
					backPressedTime &&
					currentTime - backPressedTime < BACK_BUTTON_DELAY
				) {
					BackHandler.exitApp();
				} else {
					ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
					setBackPressedTime(currentTime);
				}
				return true;
			};

			BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () => {
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);
			};
		}, [backPressedTime]),
	);

	interface RouteParams {
		providerData: string;
	}

	const route = useRoute();
	const routeParams = route.params as RouteParams | undefined;

	useEffect(() => {
		const checkPermission = async () => {
			try {
				const granted = await UsageStatsModule.isUsageAccessPermissionGranted();
				setPermissionGranted(granted);
				if (!granted) {
					Alert.alert(
						'Permission Required',
						'Usage access permission is required. Please enable it in the settings.',
						[
							{
								text: 'Open Settings',
								onPress: () => showUsageAccessSettings(''),
							},
							{text: 'Exit', onPress: () => navigation.goBack()},
						],
						{cancelable: false},
					);
				}
			} catch (error) {
				console.error('Error checking usage access permission:', error);
			}
		};

		checkPermission().then(r => {});

		const appStateListener = AppState.addEventListener(
			'change',
			nextAppState => {
				if (nextAppState === 'active') {
					checkPermission().then(r => {});
				}
			},
		);

		return () => {
			appStateListener.remove();
		};
	}, []);

	const {UsageStatsModule} = NativeModules;
	const loadAppUsageData = async (interval: string) => {
		return await AppUsageModule.getUsageStats(interval);
	};
	useEffect(() => {
		getPlayStoreAppsCount()
			.then(() => {})
			.catch(() => {});
		sumAppUsageTime(INTERVAL.DAILY)
			.then(screenTime => {
				setDefaultScreenTime(screenTime);
			})
			.catch((error: Error) => {})
		loadAppUsageData(INTERVAL.DAILY)
			.then(value => {
				setAppUsageData(value);
			})
			.catch(error => {
				console.error('appUsageData: ' + error);
			});
	}, []);

	interface AppDataItem {
		appName: string;
		icon: IconDefinition;
		totalTimeInForeground: string;
		category: string;
	}

	const renderAppUsage = ({item}: {item: AppDataItem}) => {
		return (
			<LinearGradient
				style={AppUsageStatContainerStyle.linearGradient}
				colors={
					colorSchema === 'dark'
						? darkModeGradientColorList
						: lightModeGradientColorList
				}>
				<View style={AppUsageStatContainerStyle.appStat}>
					<Image
						source={{uri: `data:image/png;base64,${item.icon}`}}
						style={{width: 40, height: 40, marginRight: 10}}
					/>
					<View style={AppUsageStatContainerStyle.appNameAndCategoryNest}>
						<Text
							style={[
								AppUsageStatContainerStyle.appNameText,
								{color: colorSchema === 'dark' ? '#FFF' : '#000'},
							]}>
							{item.appName}
						</Text>

						<View style={AppUsageStatContainerStyle.categoryContainer}>
							<Text
								style={[
									AppUsageStatContainerStyle.categoryText,
									{color: colorSchema == 'dark' ? '#FD5B71' : '#FFF'},
									{backgroundColor: 'rgba(62,43,62,0.39)'},
									{alignSelf: 'baseline'},
								]}>
								Games
							</Text>
						</View>
					</View>

					<View
						style={AppUsageStatContainerStyle.usageTimeAndSettingsContainer}>
						<Text style={[AppUsageStatContainerStyle.appNameText, {}]}>
							{item.totalTimeInForeground}
						</Text>
						<SvgXml
							style={{marginTop: verticalScale(2.5)}}
							xml={VectorIcons.settingsVectorIcon}
						/>
					</View>
				</View>
			</LinearGradient>
		);
	};

	const startDateString = '2023-06-11T12:34:56';
	const endDateString = '2023-07-11T12:34:56';

	const startMilliseconds = new Date().getDate();
	const endMilliseconds = new Date(endDateString).getTime();

	const result = queryUsageStats(
		EventFrequency.INTERVAL_DAILY,
		startMilliseconds,
		endMilliseconds,
	);

	if (!permissionGranted) {
		return (
			<SafeAreaView
				style={[
					GlobalStyle.globalBackgroundFlex,
					{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
					{marginTop: StatusBar.currentHeight},
				]}>
				<Text style={{fontFamily: getUrbanistFontFamily('Urbanist', '700')}}>
					Please grant usage access permission to load the Dashboard!
				</Text>
			</SafeAreaView>
		);
	}

	// @ts-ignore
	// @ts-ignore
	return (
		<SafeAreaView
			style={[
				GlobalStyle.globalBackgroundFlex,
				{backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'},
				{marginTop: StatusBar.currentHeight},
			]}>
			<StatusBar
				backgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
				barStyle={colorSchema === 'dark' ? 'light-content' : 'dark-content'}
				translucent={true}
			/>
			<View style={Style.headerStatsContainer}>
				<View style={Style.appsInstalledStatsContainer}>
					<LinearGradient
						style={Style.appsInstalledStatsContainerGradient}
						colors={
							colorSchema === 'dark'
								? darkModeGradientColorList
								: lightModeGradientColorList
						}>
						<View style={Style.appsInstalledHeaderStatsContainer}>
							<SvgXml xml={VectorIcons.greenCheckVector} />
							<LabelText
								text={'  Installed Apps'}
								color={colorSchema === 'dark' ? '#FFF' : '#000'}
								size={scaleFontSize(14)}
							/>
						</View>

						<View style={Style.appsInstalledCountStatsContainer}>
							<Text
								style={[
									Style.count,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
									{marginTop: 10},
								]}>
								{appsInstalled}
							</Text>
						</View>
					</LinearGradient>
				</View>

				<View style={Style.dailyScreenTimeStatsContainer}>
					<LinearGradient
						style={Style.dailyScreenTimeStatsContainerGradient}
						colors={
							colorSchema === 'dark'
								? darkModeGradientColorList
								: lightModeGradientColorList
						}>
						<View style={Style.dailyScreenTimeHeaderStatsContainer}>
							<SvgXml xml={VectorIcons.clockVector} />
							<LabelText
								text={'  Screen Time'}
								color={colorSchema === 'dark' ? '#FFF' : '#000'}
								size={scaleFontSize(14)}
							/>
						</View>

						<View style={Style.dailyScreenTimeCountStatsContainer}>
							<Text
								style={[
									Style.count,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
								]}>
								{defaultScreenTime}
							</Text>
						</View>
					</LinearGradient>
				</View>
			</View>
			<View style={Style.appUsageStatsContainer}>
				<View style={Style.appUsageStatsHeaderViewContainer}>
					<OptionsHeaderText
						text={currentAppListView}
						color={colorSchema === 'light' ? '#000' : '#FFF'}
						fontSize={scaleFontSize(18)}
						marginBottom={0}
						onPress={() => null}
					/>

					<View style={Style.dropDownMenuContainer}>
						<DropDownPicker
							theme={colorSchema === 'dark' ? 'DARK' : 'LIGHT'}
							dropDownDirection={'BOTTOM'}
							style={{justifyContent: 'center', marginBottom: verticalScale(5)}}
							setValue={setDropDownValue}
							value={dropDownValue}
							items={dropDownItems}
							open={isOpen}
							setOpen={setIsOpen}
							placeholder={'Sort By'}
							onSelectItem={item => {
								if (item.label) {
									setCurrentAppListView(item.label);
								}
								sumAppUsageTime(item.label === 'Today' ? INTERVAL.DAILY : item.label === 'Weekly' ? INTERVAL.WEEKLY : INTERVAL.MONTHLY)
								.then((screenTime) => {
									setDefaultScreenTime(screenTime);
								})
								.catch((error: Error) => {

								})
								loadAppUsageData(item.label === 'Today' ? INTERVAL.DAILY : item.label === 'Weekly' ? INTERVAL.WEEKLY : INTERVAL.MONTHLY)
								.then(data => {
									setAppUsageData(data);
								})
								.catch((error: Error) => {
									showFlashMessage(error.message, 'danger');
								});
							}}
						/>
					</View>
				</View>
			</View>
			<Suspense
				fallback={
					<ActivityIndicator
						size={'large'}
						color={colorSchema === 'dark' ? '#FFFFFF' : '#000000'}
					/>
				}>
				<View style={AppUsageStatContainerStyle.flashListContainer}>
					<FlashList
						showsVerticalScrollIndicator={false}
						renderItem={renderAppUsage}
						data={appUsageData}
						estimatedItemSize={65}
					/>
				</View>
			</Suspense>
		</SafeAreaView>
	);
};

export default DashboardScreen;
