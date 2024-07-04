import { Appearance, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Style from "./Style";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import {SetStateAction, useState} from "react";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";

const ForgetPasswordPage = ({navigation}: { navigation: any }) => {
    const colorSchema = Appearance.getColorScheme();
    const [defaultEmailValue, setDefaultEmailValue] = useState("");
    // @ts-ignore
    return (
        <SafeAreaView>
            <ImageBackground
                source={require("../../Assets/Images/GlobalAppAssets/img.png")}
                style={
                    {flexDirection: 'row', flexWrap: 'wrap',}
                }
                resizeMode={"cover"}>

                <View
                    style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0 ,0, 0, 0.6)'}}/>
                <View
                    id={"back-button"}
                    style={Style.backButton}>
                    <BackButton
                        onPress={() => {
                            navigation.navigate(Routes.LoginScreen)
                        }}
                        backArrowColor={colorSchema === "dark" ? "#FFF" : "#000"}
                        buttonBackgroundColor={colorSchema === "dark" ? "#000" : "#FFF"}
                    />
                </View>

                <View
                    id={"header-text-view"}
                    style={Style.headerTextView}>
                    <HeaderText text={"Forgot Password?"} textColor={"#FF"}/>

                    <Text
                        style={Style.subHeaderTextView}>
                        Don't worry! It occurs. Please enter the email address linked with your account.
                    </Text>

                </View>
            </ImageBackground>

            <View
                style={[Style.inputFieldContainer, {backgroundColor: colorSchema === "dark" ? "#000" : "#FFF"}]}>
                <View
                    style={Style.emailEditTextContainer}>
                    <EditText
                        text={'Enter your email'}
                        textColor={colorSchema === "light" ? "#000" : "#FFF"}
                        placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
                        backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
                        inputType={'email'}
                        value={defaultEmailValue}
                        onChangeText={
                            (value: SetStateAction<string>) => {
                                console.log(value)
                                setDefaultEmailValue(value);
                            }
                        }/>

                    <LoginSignUpButton
                        text={"Send Code"}
                        textColor={"#FFF"}
                        buttonColor={"#1E232C"}
                        onPress={() => {
                            navigation.navigate(Routes.ForgetPasswordOTPVerificationScreen);
                        }}
                        isEnabled={defaultEmailValue.length >= 6}
                        topMargin={30}
                        buttonRadius={8}
                        leftMargin={0}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgetPasswordPage;
