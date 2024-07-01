import React from "react";
import Style from "./Style";
import PropTypes from "prop-types";
import { Image, SafeAreaView, View } from "react-native";


const ProfileContainer = props => {
  return (
    <SafeAreaView>
      <View style={{borderRadius: props.imageDimensions}}>
        <Image source={props.profilePhoto} style={[Style.profileImage,{width:props.imageDimensions,height:props.imageDimensions,alignSelf:props.allign}]}/>
      </View>
    </SafeAreaView>
  );
};

ProfileContainer.propTypes = {
  profilePhoto: PropTypes.any.isRequired,
  imageDimensions: PropTypes.number.isRequired,
  allign:PropTypes.string,
};

export default ProfileContainer;
