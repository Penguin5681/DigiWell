import {useState} from "react";
import { Appearance, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Style from "../ForgetPasswordOTPVerificationScreen/Style";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import {OtpInput} from "react-native-otp-entry";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import functions from '@react-native-firebase/functions';
import {useRoute} from "@react-navigation/native";
import {createUser} from "../../api/user";

const RegistrationOTPVerificationScreen = ({navigation}: {navigation: any}) => {
    const colorSchema = Appearance.getColorScheme();
    const [defaultOTP, setDefaultOTP] = useState('');
    interface RouteParams {
        defaultEmailValue: string;
        defaultPasswordValue: string;
    }
    const route = useRoute();
    const routeParams = route.params as RouteParams | undefined;

    const email = routeParams?.defaultEmailValue;
    const password = routeParams?.defaultPasswordValue;
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const verifyOtp = async () => {
      try {
          interface VerifyOtpResponse {
              success: boolean;
          }
          const result = await functions().httpsCallable("verifyOtp")({email, otp:      defaultOTP});
          const data = result.data as VerifyOtpResponse;
          if (data.success) {
              let user = await createUser(email, password);
              if (user.error) {
                  setError(user.error);
              } else {
                  setError('');
                  setSuccess("Registration Success");
                  setTimeout(() => navigation.navigate(Routes.HomePage));
              }
          }
      }  catch (error) {
          console.log("Invalid OTP")
      }
    };
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
                            navigation.navigate(Routes.RegisterScreen);
                            console.log(Routes.RegistrationOTPVerificationScreen + " => " + Routes.RegisterScreen);
                        }}
                        backArrowColor={colorSchema === "dark" ? "#FFF" : "#000"}
                        buttonBackgroundColor={colorSchema === "dark" ? "#000" : "#FFF"}
                    />
                </View>

                <View
                    id={"header-text-view"}
                    style={Style.headerTextView}>
                    <HeaderText text={"OTP Verification"} textColor={'#FFF'}/>

                    <Text
                        style={Style.subHeaderTextView}>
                        Enter the verification code we just sent on your email address.
                    </Text>
                </View>
            </ImageBackground>

            <View style={[Style.otpInputContainer, { backgroundColor: colorSchema === "dark" ? "#000" : "#FFF" }]}>
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
                            // navigation.navigate(Routes.PhotoUploadScreen);
                            // console.log(email, password)
                            verifyOtp();
                        }}
                        isEnabled={defaultOTP.length === 4}
                        topMargin={38}
                        buttonRadius={8}
                        leftMargin={0}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegistrationOTPVerificationScreen;
