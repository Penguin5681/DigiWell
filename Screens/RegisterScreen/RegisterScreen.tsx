import {Button, ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import React, {SetStateAction, useState} from "react";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import LoginMethodText from "../../Components/LoginMethodText/LoginMethodText.tsx";
import GoogleButton from "../../Components/GoogleButton/GoogleButton.tsx";
import FacebookButton from "../../Components/FacebookButton/FacebookButton.tsx";
import Style from "./Style";

const RegisterScreen = ({navigation}: { navigation: any }) => {
    const [defaultEmailValue, setDefaultEmailValue] = useState("");
    const [defaultPasswordValue, setDefaultPasswordValue] = useState("");
    const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] = useState("");
    return (
        <SafeAreaView style={[GlobalStyle.globalAppBackground, GlobalStyle.globalBackgroundFlex]}>
            <ImageBackground
                source={require("../../Assets/Images/GlobalAppAssets/img.png")}
                style={
                    {flexDirection: 'row', flexWrap: 'wrap',}
                }
                resizeMode={"cover"}>

                <View style={{...StyleSheet.absoluteFill, backgroundColor: 'rgba(0 ,0, 0, 0.6)'}}/>

                <View
                    id={"back-button"}
                    style={Style.backButton}>
                    <BackButton
                        onPress={() => {
                            navigation.navigate(Routes.WelcomeScreen)
                        }}/>
                </View>

                <View
                    id={"header-text-view"}
                    style={[Style.headerTextView, {marginBottom: 20}]}>
                    <HeaderText text={"Hello! Register to get started"}/>
                </View>
            </ImageBackground>

            <View style={Style.inputFieldContainer}>

                <View style={Style.emailEditTextContainer}>
                    <EditText
                        text={"Email"}
                        inputType={'email'}
                        value={defaultEmailValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            console.log(value)
                            setDefaultEmailValue((value))
                        }}/>
                </View>

                <View style={Style.passwordEditTextContainer}>
                    <EditText
                        text={"Password"}
                        inputType={'password'}
                        value={defaultPasswordValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            console.log(value)
                            setDefaultPasswordValue((value))
                        }}/>
                </View>

                <View style={Style.confirmPasswordEditTextContainer}>
                    <EditText
                        text={"Confirm Password"}
                        inputType={'password'}
                        value={defaultConfirmPasswordValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            console.log(value)
                            setDefaultConfirmPasswordValue((value))
                        }}/>
                </View>

                <View style={Style.buttonContainer}>
                    <LoginSignUpButton
                        text={"Register"}
                        textColor={"#FFF"}
                        buttonColor={"#1E232C"}
                        onPress={() => {
                            navigation.navigate(Routes.RegistrationOTPVerificationScreen);
                            console.log("Registration to OTP Verification.")
                        }}
                        isEnabled={(defaultEmailValue.length > 6) && ((defaultPasswordValue.length >= 6 && defaultConfirmPasswordValue.length >= 6) && (defaultPasswordValue === defaultConfirmPasswordValue))}
                        topMargin={15}/>

                    <View style={Style.signUpMethodTextContainer}>
                        {/*<Svg>*/}
                        {/*    <Line*/}
                        {/*        x1={"0"}*/}
                        {/*        y1={"0"}*/}
                        {/*        x2={"100"}*/}
                        {/*        y2={"0"}*/}
                        {/*        stroke={"#E8ECF4"}*/}
                        {/*        strokeWidth={"1"}*/}
                        {/*    />*/}
                        {/*</Svg>*/}
                        <LoginMethodText text={"Or Register with"}/>

                        <View style={Style.signUpButtonContainer}>
                            <GoogleButton rightMargin={12}/>
                            <FacebookButton/>
                        </View>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
