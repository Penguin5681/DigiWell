import {
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    useColorScheme,
    View
} from "react-native";
import React, {SetStateAction, useState} from "react";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import GlobalImageBackgroundStyle from "../../Assets/GlobalStyles/GlobalImageBackgroundStyle";
import {Style} from './Style.ts';
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes.ts";
import EditText from "../../Components/EditText/EditText.tsx";
import {loginUser} from "../../api/user";
import AwesomeButton from "react-native-really-awesome-button";
import functions from "@react-native-firebase/functions";

const CreateAnAccount = ({navigation} : {navigation : any}) => {
    const colorSchema = useColorScheme();
    const [defaultEmailValue, setDefaultEmailValue] = useState('');
    const sendOtp = async () => {
        try {
            await functions().httpsCallable('sendOtpEmail')({email: defaultEmailValue});
            // navigation.navigate(Routes.RegistrationOTPVerificationScreen, {defaultEmailValue, defaultPasswordValue});
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <SafeAreaView
            style={[
                GlobalStyle.globalBackgroundFlex,
                {backgroundColor: colorSchema === 'dark' ? '#000' : "#FFF"}
            ]}>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle={'light-content'}
                translucent={true}/>
            <ImageBackground
                style={GlobalImageBackgroundStyle.imageBackground}
                resizeMode={'cover'}
                source={require('../../Assets/Images/GlobalAppAssets/img.png')}>
                <View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                />
                <View id={'back-button'} style={Style.backButton}>
                    <BackButton
                        onPress={() => {
                            navigation.navigate(Routes.WelcomeScreen);
                        }}
                        buttonBackgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
                        backArrowColor={colorSchema === 'dark' ? '#FFF' : '#000'}
                    />
                </View>
                <View id={'header-text-view'} style={Style.headerTextView}>
                    <HeaderText
                        text={'Create an Account'}
                        textColor={'#FFF'}
                    />
                </View>
            </ImageBackground>

            <View style={Style.inputFieldContainer}>
                <EditText
                    text={'Enter your email'}
                    textColor={colorSchema === 'light' ? '#000' : '#FFF'}
                    placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
                    backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
                    inputType={'email'}
                    value={defaultEmailValue}
                    onChangeText={(value: SetStateAction<string>) => {
                        console.log(value);
                        setDefaultEmailValue(value);
                    }}
                />
                <AwesomeButton
                    backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                    raiseLevel={0}
                    progress={true}
                    stretch={true}
                    borderRadius={8}
                    style={Style.buttonStyle}
                    activeOpacity={0.5}
                    onPress={async (next) => {
                        await sendOtp()
                            .then(response => {
                                console.log("CreateAnAccount: sendOtp(): " + response);
                            })
                            .catch(error => {
                                console.error("CreateAnAccount: sendOtp(): " + error);
                            })

                        if (next) {
                            next();
                        }
                    }}
                >
                    <Text
                        style={{
                            color: colorSchema === 'dark' ? '#FFF' : '#000',
                            fontWeight: '500',
                        }}>
                        Send OTP
                    </Text>
                </AwesomeButton>
            </View>
        </SafeAreaView>
    );
};

export default CreateAnAccount;
