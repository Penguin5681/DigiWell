import { Appearance, Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import {Routes} from "../../Navigation/Routes";

const PasswordChangedScreen = ({navigation}: {navigation: any}) => {
    const colorSchema = Appearance.getColorScheme();
    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}]}>
            <View
                style={Style.stickerContainer}>
                <Image source={require('../../Assets/Images/Sticker.png')}/>
            </View>

            <View
                style={Style.headerTextContainer}
            >

                <HeaderText
                    text={"Password Changed!"}
                    textColor={colorSchema === 'light' ? '#000' : '#FFF'}
                />
                <Text style={[Style.subHeaderTextContainer, {color: colorSchema === 'light' ? '#000' : '#FFF'}]}>
                    Your password has been changed successfully.
                </Text>
            </View>

            <View style={Style.buttonContainer}>
                <LoginSignUpButton
                    text={"Back to Login"}
                    textColor={"#FFF"}
                    buttonColor={"#1E232C"}
                    onPress={() => {
                        navigation.navigate(Routes.LoginScreen)
                    }}
                    isEnabled={true}
                    topMargin={40}
                    buttonRadius={8}
                    leftMargin={0}/>
            </View>
        </SafeAreaView>
    );
};

export default PasswordChangedScreen;
