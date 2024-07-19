// noinspection DuplicatedCode

import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet, ToastAndroid,
    useColorScheme,
    View
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import React from "react";
import Style from "./Style";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {firebase} from "@react-native-firebase/auth";
const AvatarUploadScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
    const userEmail = firebase.auth().currentUser?.email;
    const uploadToFirebase = async (imagePath: string, userEmail: string) => {
        const imageFileName = userEmail.replace(/[@.]/g, '_') + '.jpg';
        const storagePathString = 'user_profile_images/' +  imageFileName;
        const storageReference = storage().ref().child(storagePathString);
        const blob = await fetch(imagePath).then((response) => response.blob());

        try {
            await storageReference.put(blob);
            const imageUri = await storageReference.getDownloadURL();
            console.log("Image Uploaded Successfully");
            setTimeout(() => {navigation.navigate(Routes.HomePage)});
            ToastAndroid.show('Welcome', ToastAndroid.SHORT);
            return imageUri;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const [selectedImageUri, setSelectedImageUri] = React.useState<string | null>(null);
    let selectedImagePath: string = "";
    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}]}>
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
                        buttonBackgroundColor={colorSchema === "dark" ? "#000" : "#FFF"}
                        backArrowColor={colorSchema === "dark" ? "#FFF" : "#000"}/>
                </View>

                <View
                    id={"header-text-view"}
                    style={Style.headerTextView}>
                    <HeaderText text={"Complete your profile with a avatar!"} textColor={"#FFF"}/>
                </View>
            </ImageBackground>

            <View style={[Style.inputFieldContainer, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}]}>
                <View style={Style.avatarIconContainer}>
                    <Image
                        style={Style.imagePreview}
                        source={selectedImageUri ? {uri: selectedImageUri} : (colorSchema === 'dark' ? require('../../Assets/Images/avatar_icon_white.png') : require('../../Assets/Images/avatar_icon_black.png'))}
                    />
                </View>

                <View style={Style.buttonContainer}>
                    <LoginSignUpButton
                        leftMargin={0}
                        buttonRadius={8}
                        text={"Browse"}
                        textColor={'#FFF'}
                        buttonColor={colorSchema === 'light' ? '#4C4E52' : '#1E232C'}
                        onPress={() => {
                            ImagePicker
                                .openPicker({
                                    width: 300,
                                    height: 400,
                                    cropping: true,
                                })
                                .then(image => {
                                    selectedImagePath = image.path;
                                    setSelectedImageUri(image.path);
                                })
                                .catch(reason => {
                                   ToastAndroid.show(reason, ToastAndroid.SHORT);
                                });
                        }}
                        isEnabled={true}
                        topMargin={30}/>

                    <LoginSignUpButton
                        leftMargin={0}
                        buttonRadius={8}
                        text={"Upload"}
                        textColor={'#FFF'}
                        buttonColor={colorSchema === 'light' ? '#4C4E52' : '#1E232C'}
                        onPress={() => {
                            if (!userEmail) {
                                console.log(userEmail + ' is possibly null')
                                return;
                            }
                            uploadToFirebase(selectedImagePath, userEmail)
                                .then(value => {
                                    console.log(value);
                                })
                                .catch(reason => {
                                    console.log(reason);
                                })
                        }}
                        isEnabled={true}
                        topMargin={20}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AvatarUploadScreen;
