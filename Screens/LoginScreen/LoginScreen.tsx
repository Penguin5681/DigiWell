import { Appearance, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import React, { SetStateAction, useState } from "react";
import Style from "./Style";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import GoogleButton from "../../Components/GoogleButton/GoogleButton.tsx";
import FacebookButton from "../../Components/FacebookButton/FacebookButton.tsx";
import LoginMethodText from "../../Components/LoginMethodText/LoginMethodText.tsx";
import { Routes } from "../../Navigation/Routes";
import { loginUser } from "../../api/user";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const colorSchema = Appearance.getColorScheme();
  const [defaultEmailValue, setDefaultEmailValue] = useState("");
  const [defaultPasswordValue, setDefaultPasswordValue] = useState("");
  const [error, setError] = useState("");

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../Assets/Images/GlobalAppAssets/img.png")}
        style={
          { flexDirection: "row", flexWrap: "wrap" }
        }
        resizeMode={"cover"}>

        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0 ,0, 0, 0.6)" }} />
        <View
          id={"back-button"}
          style={Style.backButton}>
          <BackButton
            onPress={() => {
              navigation.navigate(Routes.WelcomeScreen);
            }}
            buttonBackgroundColor={colorSchema === "dark" ? "#000" : "#FFF"}
            backArrowColor={colorSchema === "dark" ? "#FFF" : "#000"} />
        </View>

        <View
          id={"header-text-view"}
          style={Style.headerTextView}>
          <HeaderText text={"Welcome back! Glad to see you, Again!"} textColor={"#FFF"} />
        </View>
      </ImageBackground>


      <View
        style={[Style.inputFieldContainer, { backgroundColor: colorSchema === "dark" ? "#000" : "#FFF" }]}>
        <View style={Style.emailEditText}>
          <EditText
            text={"Enter your email"}
            textColor={colorSchema === "light" ? "#000" : "#FFF"}
            placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
            backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
            inputType={"email"}
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
            textColor={colorSchema === "light" ? "#000" : "#FFF"}
            placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
            inputType={"password"}
            value={defaultPasswordValue}
            onChangeText={(value: SetStateAction<string>) => {
              console.log(value);
              setDefaultPasswordValue(value);
            }}
            backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
          />
        </View>

        <Text
          style={Style.forgetPasswordText}
          onPress={() => {
            console.log("LoginScreen -> ForgetPasswordPage");
            navigation.navigate(Routes.ForgetPasswordPage);
          }}
        >
          Forgot Password?
        </Text>
        {error.length>0 && <Text style={Style.error}>{error}</Text>}
        <View
          style={Style.loginButtonContainer}>
          <LoginSignUpButton
            text={"Login"}
            textColor={"#FFFFFF"}
            buttonColor={"#1E232C"}
            topMargin={0}
            onPress={async () => {
              let user= await loginUser(defaultEmailValue,defaultPasswordValue);
              if (!user.status) {
                setError(user.error);
               }
              else {
                setError('');
                navigation.navigate(Routes.HomePage);
              }
            }
            }
            isEnabled={(defaultEmailValue.length > 6 && defaultPasswordValue.length >= 6)}
            buttonRadius={8}
            leftMargin={0} />

          <View style={Style.loginMethodTextContainer}>
            <LoginMethodText text={"Or Login with"} />

            <View style={Style.signInButtonContainer}>
              <GoogleButton rightMargin={12} buttonBackgroundColor={colorSchema === "dark" ? "#FFF" : "#E5E4E2"} />
              <FacebookButton buttonBackgroundColor={colorSchema === "dark" ? "#FFF" : "#E5E4E2"} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
