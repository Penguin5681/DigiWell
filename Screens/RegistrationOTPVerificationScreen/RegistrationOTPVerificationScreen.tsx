import React, {useState} from "react";
import {
    Alert,
    Appearance,
    ImageBackground, NativeModules,
    SafeAreaView,
    StyleSheet,
    Text,
    ToastAndroid,
    useColorScheme,
    View
} from "react-native";
import Style from "../ForgetPasswordOTPVerificationScreen/Style.ts";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes.ts";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import {OtpInput} from "react-native-otp-entry";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import functions from '@react-native-firebase/functions';
import {useRoute} from "@react-navigation/native";
import {createUser} from "../../api/user";
import {text} from "@fortawesome/fontawesome-svg-core";
import {log} from "firebase-functions/logger";
import firestore from "@react-native-firebase/firestore";
import {generateRandomUsername} from "../../Assets/RandomUsernameGenerator/RandomUsernameGenerator";
import AwesomeButton from "react-native-really-awesome-button";
import {verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";

const RegistrationOTPVerificationScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
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
    const getFormattedDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const sendOtp = async () => {
        try {
            await functions().httpsCallable('sendOtpEmail')({email: email});
            navigation.navigate('RegistrationOTPVerificationScreen', {email, password});
        } catch (error) {
            console.log(error)
        }
    };
    const verifyOtp = async () => {
        try {
            interface VerifyOtpResponse {
                success: boolean;
            }

            const result = await functions().httpsCallable("verifyOtp")({email, otp: defaultOTP});
            const data = result.data as VerifyOtpResponse;
            if (data.success) {
                let user = await createUser(email, password);
                if (user.error) {
                    setError(user.error);
                    ToastAndroid.show('Registration Failed', ToastAndroid.SHORT);
                } else {
                    setError('');
                    setSuccess("Registration Success");
                    await firestore()
                        .collection('users')
                        .doc(email?.replace('.', '_').replace('@', '_'))
                        .set({accountCreationDate: getFormattedDate()})
                        .then(() => {
                            console.log("Account Created on: " + getFormattedDate());
                        })
                    navigation.navigate(Routes.DashboardScreen)
                    ToastAndroid.show('Registration Complete', ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            console.log("Invalid OTP")
            Alert.alert(
                'Error Occurred',
                'Invalid OTP. Please retry.',
                [
                    {
                        text: 'Resend OTP',
                        onPress: () => {
                            sendOtp()
                                .then((r) => {
                                    console.log('OTP Resent')
                                });
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'Dismiss',
                        onPress: () => console.log('Dismiss'),
                        style: 'cancel'
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {
                        ToastAndroid.show('Please re-enter the OTP', ToastAndroid.SHORT);
                    }
                }
            )
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

            <View style={[Style.otpInputContainer, {backgroundColor: colorSchema === "dark" ? "#000" : "#FFF"}]}>
                <View style={Style.otpInputStyle}>
                    <OtpInput
                        numberOfDigits={4}
                        focusStickBlinkingDuration={700}
                        focusColor={"#35C2C1"}
                        onTextChange={(value) => {
                            // setDefaultOTP(value);
                            console.log("onTextChange() => " + value)
                        }}
                        onFilled={(value) => {
                            console.log("onFilled() => " + value);
                            setDefaultOTP(value)
                        }}
                        autoFocus={false}
                    />
                </View>

                <View style={Style.verifyButtonContainer}>
                    <AwesomeButton
                        style={{marginTop: verticalScale(38)}}
                        backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                        raiseLevel={0}
                        progress={true}
                        stretch={true}
                        borderRadius={8}
                        activeOpacity={0.5}
                        disabled={!(defaultOTP.length === 4)}
                        onPress={async (next) => {
                            await verifyOtp()
                                .then(() => {
                                    console.log("OTP: Verified")
                                })
                                .catch((reason) => {
                                    console.error("Firebase Error: " + reason)
                                });

                            if (next) {
                                next();
                            }
                        }}

                    >

                        <Text
                            style={{color: colorSchema === 'dark' ? '#FFF' : '#000', fontWeight: '500'}}>
                            Verify OTP
                        </Text>

                    </AwesomeButton>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegistrationOTPVerificationScreen;
