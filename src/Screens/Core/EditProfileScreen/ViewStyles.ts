import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../Utility/ScalingUtility/ScalingUtility";

const ViewStyles = StyleSheet.create({
    profileImageContainerStyle: {
        marginTop: -verticalScale(25),
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputContainerStyle: {
        marginRight: horizontalScale(20),
        marginLeft: horizontalScale(20),
        marginTop: verticalScale(10),
    },
    newNameEditTextStyle: {
        marginBottom: verticalScale(10)
    },
    emailEditTextStyle: {
        marginBottom: verticalScale(10)
    },
    updateButtonStyle: {
        marginHorizontal: horizontalScale(20),
    },
    backButtonEditProfileScreen: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: horizontalScale(20)
    },

});

export default ViewStyles;
