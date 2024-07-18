import {
    Alert,
    BackHandler,
    Linking,
    PermissionsAndroid, Platform,
    SafeAreaView,
    StatusBar,
    Text,
    ToastAndroid,
    useColorScheme,
    View
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import {SvgXml} from "react-native-svg";
import {VectorIcons} from "../../Assets/Images/VectorIcons";
import LabelText from "../../Components/LabelText/LabelText.tsx";
import {scaleFontSize} from "../../Assets/ScalingUtility/ScalingUtility";
import LinearGradient from "react-native-linear-gradient";
import OptionsHeaderText from "../../Components/OptionsHeaderText/OptionsHeaderText.tsx";
import {useEffect, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import UsageStats, {
    checkForPermission,
    EventFrequency,
    queryUsageStats,
    showUsageAccessSettings
} from '@brighthustle/react-native-usage-stats-manager'
import {PERMISSIONS, request} from "react-native-permissions";

const DashboardScreen = ({navigation}: { navigation: any }) => {
    const appsInstalled = '12';
    const dailyScreenTime = "3h 12m";
    const colorSchema = useColorScheme();
    const darkModeGradientColorList = ['#0c0c0c', '#4C4E52', '#9FA2A8'];
    const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#97a1a3'];
    const currentAppListView = 'Today';
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [dropDownItems, setDropDownItems] = useState([
        {label: 'Today', value: 'today'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Monthly', value: 'monthly'},
    ]);

    // async function requestLocationPermission() {
    //     try {
    //         if (Platform.OS === 'android') {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.PACKAGE_USAGE_STATS,
    //                 {
    //                     title: "Location Permission",
    //                     message:
    //                         "This app needs access to your location " +
    //                         "so you can take awesome pictures.",
    //                     buttonNeutral: "Ask Me Later",
    //                     buttonNegative: "Cancel",
    //                     buttonPositive: "OK"
    //                 }
    //             );
    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 console.log("You can use the location");
    //             } else {
    //                 console.log("Location permission denied");
    //             }
    //         } else {
    //             // For iOS, permissions are handled through the Info.plist file
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // }
    //
    // requestLocationPermission();

    const startDateString = '2023-06-11T12:34:56';
    const endDateString = '2023-07-11T12:34:56';

    const startMilliseconds = new Date().getDate();
    const endMilliseconds = new Date(endDateString).getTime();

    const result = queryUsageStats(
        EventFrequency.INTERVAL_DAILY,
        startMilliseconds,
        endMilliseconds
    )
    useEffect(() => {
        const checkForPermission=async () => {
            try {
                const permissionGranted = await showUsageAccessSettings('');
                if (!permissionGranted) {
                    BackHandler.exitApp();
                    console.log("afafaf")
                }
            } catch (error) {
                console.error('Error checking permission:', error);
            }
        };
        checkForPermission();
    }, []);


    return (
        <SafeAreaView

            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'}, {marginTop: StatusBar.currentHeight}]}>
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
                    {/*    IDEA: Add the {current app view and a kind of dropdown menu (filter) }*/}
                    {/*    Also categorize the apps into: Social Media, Entertainment */}
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
                            style={{justifyContent: 'center'}}
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

        </SafeAreaView>
    );
};

export default DashboardScreen;
