import {
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import GlobalImageBackgroundStyle from "../../Assets/GlobalStyles/GlobalImageBackgroundStyle";
import Style from "./Style";
import {Routes} from "../../Navigation/Routes";
import {useEffect} from "react";
import auth from "@react-native-firebase/auth";
import OptionsHeaderText from "../../Components/OptionsHeaderText/OptionsHeaderText.tsx";
import {scaleFontSize} from "../../Assets/ScalingUtility/ScalingUtility";
const WelcomeScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            if (user) {
                navigation.navigate(Routes.HomePage);
            }
        });
    }, []);
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
