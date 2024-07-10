import React from "react";
import Style from "./Style";
import PropTypes from "prop-types";
import { Image, ImageSourcePropType, SafeAreaView, View } from "react-native";


const ProfileContainer = (props: { imageDimensions: any; profilePhoto: ImageSourcePropType | undefined; align: any; }) => {
    return (
        <SafeAreaView>
            <View style={{borderRadius: props.imageDimensions}}>
                <Image source={props.profilePhoto} style={[Style.profileImage,{width:props.imageDimensions,height:props.imageDimensions,alignSelf:props.align}]}/>
            </View>
        </SafeAreaView>
    );
};

ProfileContainer.propTypes = {
    profilePhoto: PropTypes.any.isRequired,
    imageDimensions: PropTypes.number.isRequired,
    align:PropTypes.string,
};

export default ProfileContainer;

