import {
    Alert,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, ToastAndroid,
    useColorScheme,
    View
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import React, {SetStateAction, useEffect, useState} from "react";
import Style from "./Style";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes.ts";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import AwesomeButton from "react-native-really-awesome-button";
import {useRoute} from "@react-navigation/native";
import KeyboardCoveringContainer from "../../Components/KeboardCoveringContainer/KeyboardCoveringContainer";
import firestore from "@react-native-firebase/firestore";
import {generateRandomUsername} from "../../Assets/RandomUsernameGenerator/RandomUsernameGenerator";

const CreateUsernameScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
    const [defaultUsernameValue, setUsernameValue] = useState("");

    interface RouteParams {
        userEmail: string,
    }

    const route = useRoute();
    const routeParams = route.params as RouteParams | undefined;
    const email = routeParams?.userEmail ?? '';

    useEffect(() => {
        console.log(email);
    }, []);

    return (
        <SafeAreaView style={[GlobalStyle.globalAppBackground, GlobalStyle.globalBackgroundFlex]}>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle={'light-content'}
                translucent={true}
            />
            <KeyboardCoveringContainer style={undefined}>
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
                                navigation.navigate(Routes.AvatarUploadScreen);
                            }}
                            backArrowColor={colorSchema === "dark" ? "#FFF" : "#000"}
                            buttonBackgroundColor={colorSchema === "dark" ? "#000" : "#FFF"}/>
                    </View>

                    <View
                        id={"header-text-view"}
                        style={[Style.headerTextView, {marginBottom: 20}]}>
                        <HeaderText text={"Create a username"} textColor={"#FFF"}/>
                        <Text
                            style={Style.subHeaderTextView}>
                            Make an unique and cool username
                        </Text>
                    </View>
                </ImageBackground>

                <View style={Style.usernameEditTextContainer}>
                    <EditText
                        text={"Username"}
                        textColor={colorSchema === "light" ? "#000" : "#FFF"}
                        placeHolderTextColor={colorSchema === "light" ? "#000" : "#FFF"}
                        backgroundColor={colorSchema === "light" ? "#E5E4E2" : "#303030"}
                        inputType={"text"}
                        value={defaultUsernameValue}
                        onChangeText={(value: SetStateAction<string>) => {
                            console.log(value);
                            setUsernameValue(value);
                        }}
                    />

                    <AwesomeButton
                        style={{marginTop: 15}}
                        backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                        raiseLevel={0}
                        progress={true}
                        stretch={true}
                        borderRadius={8}
                        activeOpacity={0.5}
                        disabled={!(defaultUsernameValue.length >= 5)}
                        onPress={async (next) => {
                            await firestore()
                                .collection('users')
                                .doc(email.replace(/[@.]/g, '_'))
                                .set({
                                    userEmail: email,
                                    userName: defaultUsernameValue,
                                })
                                .then(() => {
                                    ToastAndroid.show("Welcome: " + defaultUsernameValue, ToastAndroid.SHORT);
                                    navigation.navigate(Routes.DashboardScreen);
                                })
                                .catch((reason) => {
                                    console.error(reason);
                                    Alert.alert(
                                        'Error Occurred',
                                        'Error: ' + reason,
                                        [
                                            {
                                                text: 'Try Again',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Generate a random username',
                                                onPress: () => {
                                                    const randomUsername = generateRandomUsername();
                                                    firestore()
                                                        .collection('users')
                                                        .doc(email.replace('.', ','))
                                                        .set({
                                                            userEmail: email,
                                                            userName: randomUsername,
                                                        })
                                                        .then(() => {
                                                            console.log('Random username generated');
                                                            ToastAndroid.show("Welcome: " + randomUsername, ToastAndroid.SHORT);
                                                            navigation.navigate(Routes.DashboardScreen);
                                                        })
                                                        .catch((error) => {
                                                            setTimeout(() => {navigation.navigate(Routes.DashboardScreen)})
                                                            console.error(error);
                                                        });
                                                }
                                            },
                                        ]
                                    );
                                })
                            if (next) {
                                next();
                            }
                        }}>
                        <Text
                            style={{color: colorSchema === 'dark' ? '#FFF' : '#000', fontWeight: '500'}}>
                            Continue
                        </Text>
                    </AwesomeButton>
                </View>
            </KeyboardCoveringContainer>
        </SafeAreaView>
    );
};

export default CreateUsernameScreen;
