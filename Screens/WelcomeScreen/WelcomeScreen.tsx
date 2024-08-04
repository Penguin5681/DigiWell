import {
    Alert,
    Dimensions,
    Image,
    ImageBackground, NativeModules,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, ToastAndroid,
    useColorScheme,
    View
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import GlobalImageBackgroundStyle from "../../Assets/GlobalStyles/GlobalImageBackgroundStyle";
import Style from "./Style";
import {Routes} from "../../Navigation/Routes";
import {useEffect, useState} from "react";
import auth from "@react-native-firebase/auth";
import OptionsHeaderText from "../../Components/OptionsHeaderText/OptionsHeaderText.tsx";
import {scaleFontSize} from "../../Assets/ScalingUtility/ScalingUtility";
import AwesomeButton from "react-native-really-awesome-button";
import {useProviderData} from "../../context/ProviderDataContext.tsx";
import {showUsageAccessSettings} from "@brighthustle/react-native-usage-stats-manager";
import DashboardScreen from "../DashboardScreen/DashboardScreen.tsx";
const WelcomeScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
    const {setProviderData} = useProviderData();
    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            if (user) {
                navigation.navigate(DashboardScreen);
                setProviderData(user.providerData[0].providerId);
            }
        });
    }, []);

    const {UsageStatsModule} = NativeModules;
    const isUsageAccessPermissionGranted = async () => {
        try {
            const granted = await UsageStatsModule.isUsageAccessPermissionGranted();
            console.log(granted)
            if (granted){
                navigation.navigate(Routes.DashboardScreen);
            }
            return granted;
        } catch (error) {
            console.error('Error checking usage access permission:', error);
            return false;
        }
    };
    const [hasPermission, setHasPermission] = useState(false);
    const { KillApp } = NativeModules;
    function killApp() {
        KillApp.kill();
    }

    useEffect(() => {
        const checkForPermission = async () => {
            try {
                const isGranted = await isUsageAccessPermissionGranted();
                setHasPermission(isGranted);
                console.log("isGranted",isGranted)
                if (isGranted) {
                    navigation.navigate(Routes.DashboardScreen); // Navigate immediately if permission is granted
                }
                else {
                    if (hasPermission) {
                        navigation.navigate(Routes.DashboardScreen);
                    }
                    if (!hasPermission) {
                        Alert.alert(
                            'Permission Required',
                            'Usage access permission is required. Please enable it in the settings.',
                            [
                                {
                                    text: 'Open Settings', onPress: () => {
                                        const permissionGranted = showUsageAccessSettings('');
                                        console.log("setHasPermission",setHasPermission);

                                        if (permissionGranted){
                                            // navigation.navigate(Routes.ProfilePreviewScreen);
                                            ToastAndroid.show("Permission Granted", ToastAndroid.SHORT);
                                        }
                                        else {
                                            // killApp()
                                            ToastAndroid.show("Please grant usage access permission", ToastAndroid.SHORT);
                                        }
                                    }
                                },
                                {text: 'Exit', onPress: () => {
                                        killApp();
                                    }}
                            ]);

                    }

                }
            } catch (error) {
                console.error('Error checking permission:', error);
                setHasPermission(false);
            }
        };
        checkForPermission().then(r => {

        });
    }, [hasPermission]);

    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}]}>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle={'light-content'}
                translucent={true}
                />
            <ImageBackground
                style={[GlobalImageBackgroundStyle.imageBackground]}
                resizeMode={'cover'}
                source={require('../../Assets/Images/GlobalAppAssets/img.png')}>

                <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}/>
            </ImageBackground>

            <View style={[Style.footerView,]}>
                <View style={Style.appLogoAndTextContainer}>
                    <Image
                        style={GlobalStyle.globalAppLogo}
                        source={require('../../Assets/Images/GlobalAppAssets/AppLogo.png')}/>
                    <OptionsHeaderText
                        text={"DigiWell"}
                        color={colorSchema === 'dark' ? '#FFF' : '#000'}
                        fontSize={scaleFontSize(25)}
                        marginBottom={0}
                        onPress={() => null}/>

                    <OptionsHeaderText
                        text={"Balance your digital life"}
                        color={colorSchema === 'dark' ? '#FFF' : '#000'}
                        fontSize={scaleFontSize(15)}
                        marginBottom={0}
                        onPress={() => null}/>
                </View>

                <View style={Style.buttonContainer}>
                    <LoginSignUpButton
                        leftMargin={0}
                        buttonRadius={8}
                        text={"Login"}
                        textColor={colorSchema === 'dark' ? '#FFF' : '#000'}
                        buttonColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                        onPress={() => {
                            navigation.navigate(Routes.LoginScreen)
                        }}
                        isEnabled={true}
                        topMargin={0}/>

                    <LoginSignUpButton
                        leftMargin={0}
                        buttonRadius={8}
                        text={"Register"}
                        textColor={colorSchema === 'dark' ? '#FFF' : '#000'}
                        buttonColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                        onPress={() => {
                            navigation.navigate(Routes.RegisterScreen)
                        }}
                        isEnabled={true}
                        topMargin={12}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
