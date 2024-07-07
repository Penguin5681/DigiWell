import {ImageBackground, Platform, SafeAreaView, Text, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import GlobalImageBackgroundStyle from "../../Assets/GlobalStyles/GlobalImageBackgroundStyle";
import Style from "./Style";
import {Routes} from "../../Navigation/Routes";
import {useEffect} from "react";
import SplashScreen from "react-native-splash-screen";

const WelcomeScreen = ({navigation}: { navigation: any }) => {
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex,]}>
            <ImageBackground
                style={GlobalImageBackgroundStyle.imageBackground}
                resizeMode={'cover'}
                source={require('../../Assets/Images/GlobalAppAssets/img.png')}>

                <View style={Style.buttonContainer}>
                    <LoginSignUpButton
                        text={"Login"}
                        textColor={"#FFF"}
                        buttonColor={"#1E232C"}
                        onPress={
                            () => {
                                navigation.navigate(Routes.LoginScreen);
                            }
                        }
                        topMargin={0}
                        isEnabled={true}
                        buttonRadius={8}
                        leftMargin={0}
                    />

                    <LoginSignUpButton
                        text={"Register"}
                        textColor={"#000"}
                        buttonColor={"#FFF"}
                        onPress={
                            () => {
                                navigation.navigate(Routes.RegisterScreen);
                            }
                        }
                        topMargin={10}
                        isEnabled={true}
                        buttonRadius={8}
                        leftMargin={0}/>

                    <View style={{marginTop: 30}}>
                        <Text
                            onPress={() => {
                                navigation.navigate(Routes.HomePage);
                            }}
                            style={Style.textStyle}>
                            Continue as a guest
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
