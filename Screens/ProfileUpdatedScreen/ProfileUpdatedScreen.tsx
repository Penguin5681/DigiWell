import { Image, SafeAreaView, Text, View } from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import HeaderText from "../../Components/HeaderText/HeaderText.tsx";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";

const ProfileUpdatedScreen = ({navigation}: {navigation: any}) => {
    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground, {alignItems: 'center', justifyContent: "center"}]}>
            <View style={Style.stickerContainer}>
                <Image source={require('../../Assets/Images/BlueSticker.png')}/>
            </View>

            <View style={Style.headerTextContainer}>
                <HeaderText text={"Profile Updated!!"}/>
                <Text style={Style.subHeaderTextContainer}>
                    Your profile has been updated successfully.
                </Text>
            </View>

            <View style={Style.buttonContainer}>
                <LoginSignUpButton
                    leftMargin={0}
                    buttonRadius={20}
                    text={"Back"}
                    textColor={"#FFF"}
                    buttonColor={"#1E232C"}
                    onPress={() => {}}
                    isEnabled={true}
                    topMargin={20}/>
            </View>

        </SafeAreaView>
    );
};

export default ProfileUpdatedScreen;
