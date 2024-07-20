import React, {useEffect} from "react";
import Style from "./Style";
import {
    Appearance,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text, ToastAndroid,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import OptionsHeaderText from "../../Components/OptionsHeaderText/OptionsHeaderText.tsx";
import {scaleFontSize, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import {SvgXml} from "react-native-svg";
import {VectorIcons} from "../../Assets/Images/VectorIcons";
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from "../../Navigation/Routes";
import {firebase} from "@react-native-firebase/auth";
import {RouteProp, useRoute} from "@react-navigation/native";

const ProfilePreviewScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = useColorScheme();
    // This data will be realtime soon
    const dailyScreenTime = '3h 28m';
    const weeklyScreenTime = '13h 42m';
    const dailyMostUsedApp = "Brave";
    const weeklyMostUsedApp = "Chrome";
    const accountCreationDate = "09/07/2024";
    const darkModeGradientColorList = ['#0c0c0c', '#4C4E52', '#9FA2A8'];
    const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#97a1a3'];
    useEffect(() => {

    }, []);

    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}, {marginTop: StatusBar.currentHeight}]}>
            <StatusBar
                translucent={true}
                backgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
                barStyle={colorSchema === 'light' ? 'dark-content' : 'light-content'}
            />
            <View style={Style.userDetailContainer}>
                <Image
                    style={[Style.userImage, {borderColor: colorSchema === 'dark' ? '#FFF' : '#000'}]}
                    source={require('../../Assets/Images/monkey.jpg')}/>
                <View style={Style.userLabelContainer}>
                    <OptionsHeaderText
                        text={'Monkey'}
                        color={'#309CFF'}
                        fontSize={scaleFontSize(30)}
                        marginBottom={0}
                        onPress={() => {
                        }}/>
                    <OptionsHeaderText
                        text={'Motihari'}
                        color={colorSchema === 'dark' ? '#FFF' : '#000'}
                        fontSize={scaleFontSize(19)}
                        marginBottom={0}
                        onPress={() => {
                        }}/>
                    <OptionsHeaderText
                        text={'Since 2022'}
                        color={colorSchema === 'dark' ? '#FFF' : '#000'}
                        fontSize={scaleFontSize(19)}
                        marginBottom={0}
                        onPress={() => {
                        }}/>

                    <TouchableOpacity
                        style={[Style.editProfileButton, {backgroundColor: colorSchema === 'dark' ? '#FFF' : '#E5E4E2'}]}
                        onPress={() => {
                            navigation.navigate(Routes.EditProfileScreen)
                        }}
                    >
                        <Text style={Style.buttonContent}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{
                flex: 1,
                justifyContent: 'space-around',
                top: 140,
                left: 0,
                right: 0,
                position: 'absolute',
                bottom: 75
            }}>

                <View style={[Style.statsContainer,]}>
                    <LinearGradient
                        style={Style.usageStatsGradient}
                        start={{x: 0, y: 0}}
                        end={{x: 0.2, y: 4}}
                        colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>

                        <View style={Style.dailyStats}>
                            <OptionsHeaderText
                                text={"Screen Usage"} color={'#119b9b'}
                                fontSize={scaleFontSize(30)}
                                marginBottom={verticalScale(10)} onPress={() => null}/>

                            <OptionsHeaderText
                                text={`Today's Screen Time: ${dailyScreenTime}`}
                                color={colorSchema === 'light' ? '#000' : '#FFF'}
                                fontSize={scaleFontSize(14)}
                                marginBottom={0}
                                onPress={() => {
                                }}/>

                            <OptionsHeaderText
                                text={`Today's Most Used App: ${dailyMostUsedApp}`}
                                color={colorSchema === 'light' ? '#000' : '#FFF'}
                                fontSize={scaleFontSize(14)}
                                marginBottom={verticalScale(10)} onPress={() => {
                            }}/>
                        </View>

                        <View style={Style.weeklyStats}>
                            <OptionsHeaderText
                                text={`Week's Screen Time: ${weeklyScreenTime}`}
                                color={colorSchema === 'light' ? '#000' : '#FFF'}
                                fontSize={scaleFontSize(14)}
                                marginBottom={0}
                                onPress={() => {
                                }}/>

                            <OptionsHeaderText
                                text={`Week's Most Used App: ${weeklyMostUsedApp}`}
                                color={colorSchema === 'light' ? '#000' : '#FFF'}
                                fontSize={scaleFontSize(14)}
                                marginBottom={10} onPress={() => {
                            }}/>
                        </View>
                    </LinearGradient>
                </View>


                <View
                    style={[Style.accountStatusContainer]}>

                    <LinearGradient
                        style={Style.usageStatsGradient}
                        start={{x: 0, y: 0}}
                        end={{x: 0.2, y: 4}}
                        colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>

                        <OptionsHeaderText
                            text={"Account Info"}
                            color={'#119b9b'}
                            fontSize={scaleFontSize(30)}
                            marginBottom={verticalScale(10)}
                            onPress={() => null}/>

                        <OptionsHeaderText
                            text={`Account Created On: ${accountCreationDate}`}
                            color={colorSchema === 'light' ? '#000' : '#FFF'}
                            fontSize={scaleFontSize(14)}
                            marginBottom={10} onPress={() => {
                        }}/>

                    </LinearGradient>
                </View>

                <View
                    style={[Style.profileOptionContainer,]}>

                    <LinearGradient
                        style={Style.profileOptionGradient}
                        start={{x: 0, y: 0}}
                        end={{x: 0.2, y: 4}}
                        colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>

                        <View style={Style.homeOption}>
                            <SvgXml
                                xml={VectorIcons.homeIconVector}/>
                            <Text
                                style={[Style.optionLabel, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                                Go to Dashboard
                            </Text>
                            <SvgXml
                                xml={colorSchema === 'dark' ? VectorIcons.arrowRightVectorWhite : VectorIcons.arrowRightVectorBlack}/>
                        </View>

                        <View style={Style.settingsOption}>
                            <SvgXml
                                xml={VectorIcons.settingsVector}/>
                            <Text
                                style={[Style.optionLabel, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                                Settings
                            </Text>
                            <SvgXml
                                xml={colorSchema === 'dark' ? VectorIcons.arrowRightVectorWhite : VectorIcons.arrowRightVectorBlack}/>
                        </View>

                        <View style={Style.shareOption}>
                            <SvgXml
                                xml={colorSchema === 'dark' ? VectorIcons.shareIconWhite : VectorIcons.shareIconBlack}/>
                            <Text
                                style={[Style.optionLabel, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                                Tell your friends
                            </Text>
                            <SvgXml
                                xml={colorSchema === 'dark' ? VectorIcons.arrowRightVectorWhite : VectorIcons.arrowRightVectorBlack}/>
                        </View>

                        <TouchableOpacity
                            style={Style.deleteOption}
                            onPress={() => {
                                firebase.auth()
                                    .currentUser
                                    ?.delete()
                                    .then(() => {
                                        ToastAndroid.show("Account Deleted", ToastAndroid.SHORT);
                                        navigation.navigate(Routes.WelcomeScreen);
                                    })
                            }}
                        >
                            <SvgXml
                                xml={colorSchema === 'dark' ? VectorIcons.deleteIconWhiteVector : VectorIcons.deleteIconBlackVector}/>
                            <Text
                                style={[Style.optionLabel, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                                Delete Account
                            </Text>
                            <SvgXml
                                xml={colorSchema === 'dark' ? VectorIcons.arrowRightVectorWhite : VectorIcons.arrowRightVectorBlack}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                firebase.auth().signOut()
                                    .then(() => {
                                        console.log("Sign out complete")
                                        navigation.navigate(Routes.LoginScreen)
                                    })
                                    .catch(reason => {
                                        console.log(reason)
                                    });
                            }}
                            style={[Style.logoutOption]}>
                            <SvgXml
                                xml={VectorIcons.logOutVector}/>
                            <Text
                                style={[Style.optionLabel, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                                Logout
                            </Text>
                            <SvgXml
                                xml={colorSchema === 'dark' ? VectorIcons.arrowRightVectorWhite : VectorIcons.arrowRightVectorBlack}/>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfilePreviewScreen;
