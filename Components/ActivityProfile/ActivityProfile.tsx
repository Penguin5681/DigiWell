import React from "react";
import PropTypes from "prop-types";
import { Image, SafeAreaView, Text, View } from "react-native";
import Styles from "./Style";
import BackButton from "../BackButton/BackButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ActivityProfile = props => {
  return (
    <SafeAreaView>
      <View>
        <View style={Styles.activityprofiles}>
          <View style={Styles.activities}>
            <Image source={props.activityImage} />
            <View>
              <Text style={Styles.activityName}>{props.activityName}</Text>
            </View>
          </View>
          <View style={Styles.activityArrowButtonBackground}>
            <FontAwesomeIcon size={13} style={Styles.leftArrow} icon={faArrowRight} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

ActivityProfile.propTypes = {
  activityName: PropTypes.string.isRequired,
  activityImage: PropTypes.any.isRequired,
};

export default ActivityProfile;
