import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Appearance,
    Alert
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import React, {SetStateAction, useEffect, useState} from "react";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import LoginMethodText from "../../Components/LoginMethodText/LoginMethodText.tsx";
import GoogleButton from "../../Components/GoogleButton/GoogleButton.tsx";
import FacebookButton from "../../Components/FacebookButton/FacebookButton.tsx";
import Style from "./Style";
import functions from '@react-native-firebase/functions';


const RegisterScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = Appearance.getColorScheme();
    const [defaultEmailValue, setDefaultEmailValue] = useState("");
    const [defaultPasswordValue, setDefaultPasswordValue] = useState("");
    const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    const sendOtp = async () => {
        try {
            await functions().httpsCallable('sendOtpEmail')({email: defaultEmailValue});
            navigation.navigate(Routes.RegistrationOTPVerificationScreen, {defaultEmailValue, defaultPasswordValue});
        } catch (error) {
            console.log(error)
        }
    };

        return (
            <SafeAreaView style={[GlobalStyle.globalAppBackground, GlobalStyle.globalBackgroundFlex]}>
                <ImageBackground
                    source={require("../../Assets/Images/GlobalAppAssets/img.png")}
                    style={
                        {flexDirection: "row", flexWrap: "wrap"}
                    }
                    resizeMode={"cover"}>

                    <View style={{...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0 ,0, 0, 0.6)"}}/>

                    <View
                        id={"back-button"}
                        style={Style.backButton}>
                        <BackButton
                            onPress={() => {
                                navigation.navigate(Routes.WelcomeScreen);
                            }}
                            backArrowColor={colorSchema === "dark" ? "#FFF" : "#000"}
                            buttonBackgroundColor={colorSchema === "dark" ? "#000" : "#FFF"}/>
                    </View>

                    <View
                        id={"header-text-view"}
                        style={[Style.headerTextView, {marginBottom: 20}]}>
                        <HeaderText text={"Hello! Register to get started"} textColor={"#FFF"}/>
                    </View>
                </ImageBackground>


                <View style={[Style.inputFieldContainer, {backgroundColor: colorSchema === "dark" ? "#000" : "#FFF"}]}>

                    <View style={Style.emailEditTextContainer}>
                        <EditText
                            text={"Email"}
                            textColor={colorSchema === "light" ? "#000" : "#FFF"}
                            placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
                            backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
                            inputType={"email"}
                            value={defaultEmailValue}
                            onChangeText={(value: SetStateAction<string>) => {
                                console.log(value);
                                setDefaultEmailValue((value));
                            }}/>
                    </View>

                    <View style={Style.passwordEditTextContainer}>
                        <EditText
                            text={"Password"}
                            textColor={colorSchema === "light" ? "#000" : "#FFF"}
                            placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
                            backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
                            inputType={"password"}
                            value={defaultPasswordValue}
                            onChangeText={(value: SetStateAction<string>) => {
                                console.log(value);
                                setDefaultPasswordValue((value));
                            }}/>
                    </View>

                    <View style={Style.confirmPasswordEditTextContainer}>
                        <EditText
                            text={"Confirm Password"}
                            textColor={colorSchema === "light" ? "#000" : "#FFF"}
                            placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
                            backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
                            inputType={"password"}
                            value={defaultConfirmPasswordValue}
                            onChangeText={(value: SetStateAction<string>) => {
                                console.log(value);
                                setDefaultConfirmPasswordValue((value));
                            }}/>
                        {error.length > 0 && <Text style={Style.error}>{error}</Text>}
                        {success.length > 0 && <Text style={Style.success}>{success}</Text>}
                    </View>

                    <View style={Style.buttonContainer}>
                        <LoginSignUpButton
                            text={"Register"}
                            textColor={"#FFF"}
                            buttonColor={"#1E232C"}
                            onPress={() => {
                                sendOtp();
                            }}
                            isEnabled={(defaultEmailValue.length > 6) && ((defaultPasswordValue.length >= 6 && defaultConfirmPasswordValue.length >= 6) && (defaultPasswordValue === defaultConfirmPasswordValue))}
                            topMargin={15}
                            buttonRadius={8}
                            leftMargin={0}/>

                        <View style={Style.signUpMethodTextContainer}>
                            <LoginMethodText text={"Or Register with"}/>

                            <View style={Style.signUpButtonContainer}>

                                <GoogleButton onPress={()=>{
                                }} rightMargin={12}
                                              buttonBackgroundColor={colorSchema === "dark" ? "#FFF" : "#E5E4E2"}/>
                                <FacebookButton buttonBackgroundColor={colorSchema === "dark" ? "#FFF" : "#E5E4E2"}/>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
};

export default RegisterScreen;
