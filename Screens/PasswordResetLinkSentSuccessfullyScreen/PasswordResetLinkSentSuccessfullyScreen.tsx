import {Appearance, Image, SafeAreaView, Text, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import {Routes} from "../../Navigation/Routes";
import {useEffect} from "react";

const PasswordResetLinkSentSuccessfullyScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = Appearance.getColorScheme();
    useEffect(() => {
        const timeOut = setTimeout(() => {
            navigation.navigate(Routes.LoginScreen)
        }, 3000);
        return () => clearTimeout(timeOut);
    }, [navigation]);
    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}]}>
            <View
                style={Style.stickerContainer}>
                <Image source={require('../../Assets/Images/Sticker.png')}/>
            </View>

            <View
                style={Style.headerTextContainer}
            >

                <HeaderText
                    text={"Password Reset Link Sent!"}
                    textColor={colorSchema === 'light' ? '#000' : '#FFF'}
                />
                <Text style={[Style.subHeaderTextContainer, {color: colorSchema === 'light' ? '#000' : '#FFF'}]}>
                    Follow the instructions in the email to create a new password.
                </Text>
            </View>

            <View style={Style.buttonContainer}>
                <LoginSignUpButton
                    text={"Back to Login"}
                    textColor={"#FFF"}
                    buttonColor={"#1E232C"}
                    onPress={() => {
                        navigation.navigate(Routes.LoginScreen)
                    }}
                    isEnabled={true}
                    topMargin={40}
                    buttonRadius={8}
                    leftMargin={0}/>
            </View>
        </SafeAreaView>
    );
};

export default PasswordResetLinkSentSuccessfullyScreen;
