import React, {useState} from "react";
import {Appearance, SafeAreaView, Text, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import BackButton from "../../Components/BackButton/BackButton.tsx";

const EditProfileScreen = () => {
    const colorSchema = Appearance.getColorScheme();

    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'}]}>
            <View style={Style.headerContainer}>
                <BackButton
                    onPress={() => {

                    }}
                    buttonBackgroundColor={colorSchema === 'dark' ? '#FFF' : '#000'}
                    backArrowColor={colorSchema === 'light' ? '#FFF' : '#000'}/>
            </View>
        </SafeAreaView>
    );
};

export default EditProfileScreen;

