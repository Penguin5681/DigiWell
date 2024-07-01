import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Styles from "./Style";
import ProfileContainer from "../../Components/ProfileContainer/ProfileContainer.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import { verticalScale } from "../../Assets/ScalingUtility/ScalingUtility";
import ViewStyles from "./ViewStyles";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import BackButton from "../../Components/BackButton/BackButton.tsx";

const EditProfileScreen = () => {
    const [defaultNameValue, setDefaultNameValue] = useState("");
    const [defaultEmailValue, setDefaultEmailValue] = useState("");
    const [defaultPasswordValue, setDefaultPasswordValue] = useState("");

    return (
        <SafeAreaView style={[GlobalStyle.globalAppBackground, GlobalStyle.globalBackgroundFlex]}>
            <View>
                <View style={ViewStyles.backButtonEditProfileScreen}>
                    <BackButton onPress={() => null}/>
                    <Text style={Styles.editProfileHeader}>Edit profile</Text>
                </View>
                <View style={ViewStyles.profileImageContainerStyle}>
                    <ProfileContainer
                        profilePhoto={require("../../Assets/Images/Ellipse.png")}
                        imageDimensions={140}
                        allign={"center"} />
                </View>
                <View style={ViewStyles.inputContainerStyle}>

                    <View style={ViewStyles.newNameEditTextStyle}>

                        <Text
                            style={Styles.editTextLabelTextCommon}>
                            Name
                        </Text>

                        <EditText
                            text={"New Name"}
                            inputType={"text"}
                            value={defaultNameValue}
                            onChangeText={
                                (value: string) => {
                                    console.log(value);
                                    setDefaultNameValue(value);
                                }
                            } />
                    </View>

                    <View>
                        <View style={ViewStyles.emailEditTextStyle}>
                            <Text style={Styles.editTextLabelTextCommon}>Email</Text>
                            <EditText
                                text={"New Email"}
                                inputType={"email"}
                                value={defaultEmailValue}
                                onChangeText={(value: string) => {
                                    console.log(value);
                                    setDefaultEmailValue(value);
                                }
                                } />
                        </View>
                    </View>

                    <View>
                        <View style={{ marginBottom: verticalScale(20) }}>
                            <Text style={Styles.editTextLabelTextCommon}>Password</Text>
                            <EditText text={"New Password"} inputType={"password"} value={defaultPasswordValue}
                                      onChangeText={(value: string) => {
                                          console.log(value);
                                          setDefaultPasswordValue(value);
                                      }
                                      } />
                        </View>
                    </View>

                    <View>

                    </View>
                </View>

                <View style={ViewStyles.updateButtonStyle}>
                    <LoginSignUpButton
                        leftMargin={0}
                        buttonRadius={10}
                        text={"Update Profile"}
                        textColor={"#FFF"}
                        buttonColor={"#1E232C"}
                        onPress={() => null}
                        isEnabled={defaultNameValue.length >= 2 && defaultEmailValue.length >= 6 && defaultPasswordValue.length >= 6}
                        topMargin={10} />
                </View>

            </View>
        </SafeAreaView>
    );
};

export default EditProfileScreen;

