import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Style from "./Style";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import {SetStateAction, useState} from "react";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";

const CreateNewPasswordPageScreen = ({navigation}: { navigation: any }) => {
    const [defaultNewPasswordValue, setDefaultNewPasswordValue] = useState('');
    const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] = useState('');
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
                            navigation.navigate(Routes.ForgetPasswordPage);
                        }}/>
                </View>

                <View
                    id={"header-text-view"}
                    style={Style.headerTextView}>
                    <HeaderText text={"Create new password"}/>

                    <Text
                        style={Style.subHeaderTextView}>
                        Your new password must be unique from those previously used.
                    </Text>
                </View>
            </ImageBackground>

            <View style={Style.editTextContainer}>

                <View style={Style.newPasswordEditTextContainer}>
                    <EditText
                        text={"New Password"}
                        inputType={'text'}
                        value={defaultNewPasswordValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            setDefaultNewPasswordValue(value);
                            console.log("new pass ", value)
                        }}
                    />
                </View>

                <View style={Style.confirmPasswordEditTextContainer}>
                    <EditText
                        text={"Confirm Password"}
                        inputType={'text'}
                        value={defaultConfirmPasswordValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            setDefaultConfirmPasswordValue(value);
                            console.log("conf pass ", value);
                        }}/>
                </View>
                <View style={Style.buttonContainer}>
                    <LoginSignUpButton
                        text={"Reset Password"}
                        textColor={"#FFF"}
                        buttonColor={"#1E232C"}
                        onPress={() => {
                            navigation.navigate(Routes.PasswordChangedScreen);
                        }}
                        isEnabled={(defaultNewPasswordValue.length >= 6 && defaultConfirmPasswordValue.length >= 6)}
                        topMargin={33}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default CreateNewPasswordPageScreen;
