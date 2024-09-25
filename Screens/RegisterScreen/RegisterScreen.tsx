import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    useColorScheme, StatusBar,
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes.ts";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import React, {SetStateAction, useEffect, useState} from "react";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import LoginMethodText from "../../Components/LoginMethodText/LoginMethodText.tsx";
import GoogleButton from "../../Components/GoogleButton/GoogleButton.tsx";
import FacebookButton from "../../Components/FacebookButton/FacebookButton.tsx";
import Style from "./Style.ts";
import functions from '@react-native-firebase/functions';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import {AccessToken, LoginManager} from "react-native-fbsdk-next";
import KeyboardCoveringContainer from "../../Components/KeboardCoveringContainer/KeyboardCoveringContainer";
import AwesomeButton from "react-native-really-awesome-button";
import {loginUser} from "../../api/user";
import {useRoute} from "@react-navigation/native";


const RegisterScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
    const [defaultEmailValue, setDefaultEmailValue] = useState("");
    const [defaultUsernameValue, setDefaultUsernameValue] = useState("");
    const [defaultPasswordValue, setDefaultPasswordValue] = useState("");
    const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const firebaseAuthProvider = 'firebase.com';
    const googleAuthProvider = 'google.com';

    interface RouteParams {
        defaultEmailValue: string,
    }

    const route = useRoute();
    const routeParams = route.params as RouteParams | undefined;
    const email = routeParams?.defaultEmailValue;

    const sendOtp = async () => {
        try {
            await functions().httpsCallable('sendOtpEmail')({email: defaultEmailValue});
            navigation.navigate(Routes.RegistrationOTPVerificationScreen, {defaultEmailValue, defaultPasswordValue});
        } catch (error) {
            console.log(error)
        }
    };

    const signInWithGoogle = async () => {
        try {
            GoogleSignin.configure({
                offlineAccess: false,
                webClientId: '411285290789-h7085ag0gmrfickl1h80fkpcv97vgttu.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const {idToken} = await GoogleSignin.signIn();
            const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredentials);
            return userInfo;
        } catch (error) {
            console.log('=> Google Sign In', error);
            return null;
        }
    };

    useEffect(() => {
        setDefaultEmailValue(email ? email : "");
    }, []);

    return (
        <SafeAreaView style={[GlobalStyle.globalAppBackground, GlobalStyle.globalBackgroundFlex]}>
            <KeyboardCoveringContainer style={undefined}>
                <StatusBar
                    backgroundColor={'transparent'}
                    barStyle={'light-content'}
                    translucent={true}
                />

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
                            leftMargin={0}
                            rightMargin={0}
                            inputType={"email"}
                            value={defaultEmailValue}
                            onChangeText={(value: SetStateAction<string>) => {
                                console.log(value);
                                setDefaultEmailValue((value));
                            }}/>

                        <EditText
                            text={"Username"}
                            textColor={colorSchema === "light" ? "#000" : "#FFF"}
                            placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
                            backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
                            leftMargin={10}
                            rightMargin={0}
                            inputType={"text"}
                            value={defaultUsernameValue}
                            onChangeText={(value: SetStateAction<string>) => {
                                console.log(value);
                                setDefaultUsernameValue((value));
                            }}/>
                    </View>

                    <View style={Style.passwordEditTextContainer}>
                        <EditText
                            text={"Password"}
                            textColor={colorSchema === "light" ? "#000" : "#FFF"}
                            placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
                            backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
                            leftMargin={0}
                            rightMargin={0}
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
                            leftMargin={0}
                            rightMargin={0}
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
                        <AwesomeButton
                            style={{marginTop: 15}}
                            backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                            raiseLevel={0}
                            progress={true}
                            stretch={true}
                            borderRadius={8}
                            disabled={!(defaultEmailValue.length > 6) && !((defaultPasswordValue.length >= 6 && defaultConfirmPasswordValue.length >= 6) && (defaultPasswordValue === defaultConfirmPasswordValue))}
                            activeOpacity={0.5}
                            onPress={
                                async (next) => {
                                     await sendOtp().then(response => {
                                        console.log(response)
                                    });
                                    if (next) {
                                        next();
                                    }
                                }
                            }>

                            <Text
                                style={{color: colorSchema === 'dark' ? '#FFF' : '#000', fontWeight: '500'}}>
                                Register
                            </Text>

                        </AwesomeButton>

                        <View style={Style.signUpMethodTextContainer}>
                            <LoginMethodText text={"Or Register with"}/>

                            <View style={Style.signUpButtonContainer}>

                                <GoogleButton
                                    onPress={() => {
                                        signInWithGoogle().then(data => {
                                            console.log(data);
                                            navigation.navigate(Routes.DashboardScreen);
                                        })
                                    }}
                                    rightMargin={12}
                                    buttonBackgroundColor={colorSchema === "dark" ? "#FFF" : "#E5E4E2"}/>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardCoveringContainer>
        </SafeAreaView>
    );
};

export default RegisterScreen;
