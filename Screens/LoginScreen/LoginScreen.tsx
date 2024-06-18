import {ImageBackground, SafeAreaView, StatusBar, Text, View} from "react-native";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {SetStateAction, useState} from "react";
import Style from "./Style";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import GlobalImageBackgroundStyle from "../../Assets/GlobalStyles/GlobalImageBackgroundStyle";
import EditText from "../../Components/EditText/EditText.tsx";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";

const LoginScreen = ({navigation}: { navigation: any }) => {
    const [defaultEmailValue, setDefaultEmailValue] = useState("");
    const [defaultPasswordValue, setDefaultPasswordValue] = useState("");
    return (
        <SafeAreaView>
            <ImageBackground
                source={require("../../Assets/Images/GlobalAppAssets/img.png")}
                style={
                    {
                        flexDirection: 'row', flexWrap: 'wrap'
                    }
                }
                imageStyle={{}}
                resizeMode={"cover"}>

                <View
                    id={"back-button"}
                    style={Style.backButton}>
                    <BackButton onPress={() => {
                    }}/>
                </View>

                <View
                    id={"header-text-view"}
                    style={Style.headerTextView}>
                    <HeaderText text={"Welcome back! Glad to see you, Again!"}/>
                </View>
            </ImageBackground>

            <View
                style={Style.inputFieldContainer}>
                <View style={Style.emailEditText}>
                    <EditText
                        text={"Enter your email"}
                        inputType={'email'}
                        value={defaultEmailValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            console.log(value);
                            setDefaultEmailValue(value);
                        }}
                    />
                </View>

                <View style={Style.passwordEditText}>
                    <EditText
                        text={"Enter your password"}
                        inputType={'password'}
                        value={defaultPasswordValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            console.log(value);
                            setDefaultPasswordValue(value);
                        }}
                    />
                </View>

                <Text style={Style.forgetPasswordText}>
                    Forgot Password?
                </Text>

                <View
                    style={Style.loginButtonContainer}>
                    <LoginSignUpButton
                        text={"Login"}
                        textColor={"#FFFFFF"}
                        buttonColor={"#1E232C"}
                        onPress={() => {
                            console.log("Login Button Clicked!")
                        }}
                        isEnabled={(defaultEmailValue.length > 6 && defaultPasswordValue.length >= 6)}/>
                </View>

            </View>

        </SafeAreaView>
    );
};

export default LoginScreen;
