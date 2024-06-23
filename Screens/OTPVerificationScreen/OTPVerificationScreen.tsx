import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Style from "./Style";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import {useState} from "react";
import OtpInputs from "react-native-otp-inputs";
import {OtpInput} from "react-native-otp-entry";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";

const OTPVerificationScreen = ({navigation}: { navigation: any }) => {
    const [defaultOTP, setDefaultOTP] = useState('');
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
                    style={{...StyleSheet.absoluteFill, backgroundColor: 'rgba(0 ,0, 0, 0.6)'}}/>

                <View
                    id={"back-button"}
                    style={Style.backButton}>
                    <BackButton
                        onPress={() => {
                            navigation.navigate(Routes.ForgetPasswordPage)
                        }}/>
                </View>

                <View
                    id={"header-text-view"}
                    style={Style.headerTextView}>
                    <HeaderText text={"OTP Verification"}/>

                    <Text
                        style={Style.subHeaderTextView}>
                        Enter the verification code we just sent on your email address.
                    </Text>
                </View>
            </ImageBackground>

            <View style={Style.otpInputContainer}>
                <View style={Style.otpInputStyle}>
                    <OtpInput
                        numberOfDigits={4}
                        focusStickBlinkingDuration={700}
                        focusColor={"#35C2C1"}
                        onTextChange={(value) => {
                            // setDefaultOTP(value);
                        }}
                        onFilled={(value) => {
                            console.log(value);
                            setDefaultOTP(value)
                        }}
                        autoFocus={false}
                    />
                </View>

                <View style={Style.verifyButtonContainer}>
                    <LoginSignUpButton
                        text={"Verify"}
                        textColor={"#FFF"}
                        buttonColor={"#1E232C"}
                        onPress={() => {
                            navigation.navigate(Routes.CreateNewPasswordPageScreen);
                        }}
                        isEnabled={defaultOTP.length === 4}
                        topMargin={38}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OTPVerificationScreen;
