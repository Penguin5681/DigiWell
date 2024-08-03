import {
    Alert,
    NativeModules,
    SafeAreaView,
    StatusBar,
    Text,
    ToastAndroid,
    useColorScheme,
    View,
    AppState, BackHandler
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import {SvgXml} from "react-native-svg";
import {VectorIcons} from "../../Assets/Images/VectorIcons";
import LabelText from "../../Components/LabelText/LabelText.tsx";
import {scaleFontSize, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import LinearGradient from "react-native-linear-gradient";
import OptionsHeaderText from "../../Components/OptionsHeaderText/OptionsHeaderText.tsx";
import React, {useCallback, useEffect, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
    EventFrequency,
    queryUsageStats, showUsageAccessSettings
} from '@brighthustle/react-native-usage-stats-manager'
import {FlashList} from "@shopify/flash-list";
import {faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import AppUsageStatContainerStyle from "./AppUsageStatContainerStyle";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import {Routes} from "../../Navigation/Routes";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";

const DashboardScreen = ({navigation}: { navigation: any }) => {
    const appsInstalled = '12';
    const dailyScreenTime = "3h 12m";
    const colorSchema = useColorScheme();
    const insets = useSafeAreaInsets();
    const darkModeGradientColorList = ['#3f3c3c', '#313334', '#1a1a1a'];
    const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#b8c0c2'];
    const currentAppListView = 'Today';
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [dropDownItems, setDropDownItems] = useState([
        {label: 'Today', value: 'today'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Monthly', value: 'monthly'},
    ]);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [backPressedTime, setBackPressedTime] = useState(0);
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                const BACK_BUTTON_DELAY = 2000;
                const currentTime = Date.now();

                if (backPressedTime && currentTime - backPressedTime < BACK_BUTTON_DELAY) {
                    BackHandler.exitApp();
                } else {
                    ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
                    setBackPressedTime(currentTime);
                }
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }
        }, [backPressedTime])
    )
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
                        "Permission Required",
                        "Usage access permission is required. Please enable it in the settings.",
                        [
                            {text: "Open Settings", onPress: () => showUsageAccessSettings('')},
                            {text: "Exit", onPress: () => navigation.goBack()}
                        ],
                        {cancelable: false}
                    );
                }
            } catch (error) {
                console.error('Error checking usage access permission:', error);
            }
        };

        checkPermission().then(r => {
        });

        const appStateListener = AppState.addEventListener("change", (nextAppState) => {
            if (nextAppState === "active") {
                checkPermission().then(r => {
                });
            }
        });

        return () => {
            appStateListener.remove();
        };
    }, []);

    const {UsageStatsModule} = NativeModules;

    const appData = [
        {
            appName: 'Instagram',
            icon: faInstagram,
            usageTime: '2h 34m',
            category: 'Social'
        },
        {
            appName: 'Youtube',
            icon: faYoutube,
            usageTime: '2h 34m',
            category: 'Entertainment'
        },
        {
            appName: 'BGMI',
            icon: faGamepad,
            usageTime: '20h 34m',
            category: 'Video Game'
        },
        {
            appName: 'Instagram',
            icon: faInstagram,
            usageTime: '2h 34m',
            category: 'Social'
        },
        {
            appName: 'Youtube',
            icon: faYoutube,
            usageTime: '2h 34m',
            category: 'Entertainment'
        },
        {
            appName: 'BGMI',
            icon: faGamepad,
            usageTime: '20h 34m',
            category: 'Video Game'
        },
    ];

    interface AppDataItem {
        appName: string;
        icon: IconDefinition;
        usageTime: string;
        category: string;
    }

    const renderAppUsage = ({item}: { item: AppDataItem }) => {
        return (
            <LinearGradient
                style={AppUsageStatContainerStyle.linearGradient}
                colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>
                <View style={AppUsageStatContainerStyle.appStat}>
                    <FontAwesomeIcon
                        icon={item.icon}
                        color={"#FFF"}
                        size={37}
                    />
                    <View style={AppUsageStatContainerStyle.appNameAndCategoryNest}>
                        <Text
                            style={[AppUsageStatContainerStyle.appNameText, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                            {item.appName}
                        </Text>

                        <View
                            style={AppUsageStatContainerStyle.categoryContainer}>
                            <Text
                                style={
                                    [
                                        AppUsageStatContainerStyle.categoryText,
                                        {color: colorSchema == 'dark' ? '#FD5B71' : '#FFF'},
                                        {backgroundColor: "rgba(62,43,62,0.39)"},
                                        {alignSelf: 'baseline'}
                                    ]}
                            >
                                {item.category}
                            </Text>
                        </View>
                    </View>

                    <View style={AppUsageStatContainerStyle.usageTimeAndSettingsContainer}>
                        <Text
                            style={[
                                AppUsageStatContainerStyle.appNameText,
                                {}
                            ]}>
                            {item.usageTime}
                        </Text>
                        <SvgXml
                            style={{marginTop: verticalScale(2.5)}}
                            xml={VectorIcons.settingsVectorIcon}/>
                    </View>

                </View>
            </LinearGradient>
        );
    }

    const startDateString = '2023-06-11T12:34:56';
    const endDateString = '2023-07-11T12:34:56';

    const startMilliseconds = new Date().getDate();
    const endMilliseconds = new Date(endDateString).getTime();

    const result = queryUsageStats(
        EventFrequency.INTERVAL_DAILY,
        startMilliseconds,
        endMilliseconds
    );

    if (!permissionGranted) {
        return (
            <SafeAreaView
                style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}, {marginTop: StatusBar.currentHeight}]}>
                <Text style={{fontFamily: getUrbanistFontFamily('Urbanist', '700')}}>
                    Please grant usage access permission to load the Dashboard!
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'}, {marginTop: StatusBar.currentHeight},]}>
            <StatusBar
                backgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
                barStyle={colorSchema === 'light' ? 'dark-content' : 'light-content'}
                translucent={true}
            />
            <View style={Style.headerStatsContainer}>
                <View style={Style.appsInstalledStatsContainer}>
                    <LinearGradient
                        style={Style.appsInstalledStatsContainerGradient}
                        colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>
                        <View style={Style.appsInstalledHeaderStatsContainer}>
                            <SvgXml xml={VectorIcons.greenCheckVector}/>
                            <LabelText
                                text={'  Installed Apps'}
                                color={colorSchema === 'dark' ? '#FFF' : '#000'}
                                size={scaleFontSize(14)}/>
                        </View>

                        <View style={Style.appsInstalledCountStatsContainer}>
                            <Text
                                style={[Style.count, {color: colorSchema === 'dark' ? '#FFF' : '#000'}, {marginTop: 10}]}>
                                {appsInstalled}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={Style.dailyScreenTimeStatsContainer}>
                    <LinearGradient
                        style={Style.dailyScreenTimeStatsContainerGradient}
                        colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>
                        <View style={Style.dailyScreenTimeHeaderStatsContainer}>
                            <SvgXml xml={VectorIcons.clockVector}/>
                            <LabelText
                                text={'  Screen Time'}
                                color={colorSchema === 'dark' ? '#FFF' : '#000'}
                                size={scaleFontSize((14))}/>
                        </View>

                        <View style={Style.dailyScreenTimeCountStatsContainer}>
                            <Text
                                style={[Style.count, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                                {dailyScreenTime}
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
                        onPress={() => null}/>

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
                            onSelectItem={(item) => {
                                ToastAndroid.show("Showing: " + item.label, ToastAndroid.SHORT);
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={AppUsageStatContainerStyle.flashListContainer}>
                <FlashList
                    showsVerticalScrollIndicator={false}
                    renderItem={renderAppUsage}
                    data={appData}
                    estimatedItemSize={65}
                />
            </View>
        </SafeAreaView>
    )
}

export default DashboardScreen;
