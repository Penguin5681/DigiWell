import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import React from "react";
import Style from "./Style.ts";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {Routes} from "../../Navigation/Routes.ts";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {firebase} from "@react-native-firebase/auth";
import AwesomeButton from "react-native-really-awesome-button";
import {verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";

const AvatarUploadScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
    const userEmail = firebase.auth().currentUser?.email;
    const [selectedImageUri, setSelectedImageUri] = React.useState<string | null>(null);
    const [selectedImagePath, setSelectedImagePath] = React.useState<string>("");

    const uploadToFirebase = async (imagePath: string, userEmail: string) => {
        const imageFileName = userEmail.replace(/[@.]/g, '_') + '.jpg';
        const storagePathString = 'user_profile_images/' + imageFileName;
        const storageReference = storage().ref().child(storagePathString);
        const blob = await fetch(imagePath).then((response) => response.blob());

        try {
            await storageReference.put(blob);
            const imageUri = await storageReference.getDownloadURL();
            console.log("Image Uploaded Successfully");
            setTimeout(() => {
                navigation.navigate(Routes.CreateUsernameScreen, {userEmail: userEmail});
            });
            ToastAndroid.show('Welcome', ToastAndroid.SHORT);
            return imageUri;
        } catch (error) {
            console.log("uploadToFirebase(): " + error);
            throw error;
        }
    }

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
                    <AwesomeButton
                        style={{marginTop: verticalScale(20)}}
                        backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                        raiseLevel={0}
                        progress={true}
                        stretch={true}
                        borderRadius={8}
                        activeOpacity={0.5}
                        disabled={false}
                        onPress={async (next) => {
                            await ImagePicker
                                .openPicker({
                                    width: 300,
                                    height: 400,
                                    cropping: true,
                                })
                                .then(image => {
                                    console.log(image.path);
                                    setSelectedImagePath(image.path);
                                    setSelectedImageUri(image.path);
                                })
                                .catch(reason => {
                                    ToastAndroid.show("ImagePicker: " + reason, ToastAndroid.SHORT);
                                });

                            if (next) {
                                next();
                            }
                        }}
                    >
                        <Text
                            style={{color: colorSchema === 'dark' ? '#FFF' : '#000', fontWeight: '500'}}>
                            Browse
                        </Text>

                    </AwesomeButton>

                    <AwesomeButton
                        style={{marginTop: verticalScale(15)}}
                        backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
                        raiseLevel={0}
                        progress={true}
                        stretch={true}
                        borderRadius={8}
                        activeOpacity={0.5}
                        disabled={false}
                        onPress={async (next) => {
                            if (!userEmail) {
                                console.log(userEmail + ' is possibly null')
                                return;
                            }
                            await uploadToFirebase(selectedImagePath, userEmail)
                                .catch(reason => {
                                    console.log("Continue: " + reason);
                                })
                            if (next) {
                                next();
                            }
                        }}
                    >
                        <Text
                            style={{color: colorSchema === 'dark' ? '#FFF' : '#000', fontWeight: '500'}}>
                            Continue
                        </Text>

                    </AwesomeButton>

                    <TouchableOpacity
                        style={{marginRight: -20}}
                        onPress={() => {
                            navigation.navigate(Routes.CreateUsernameScreen, {userEmail: userEmail});
                        }}>
                        <Text style={Style.skipText}>
                            Upload Later
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default AvatarUploadScreen;
