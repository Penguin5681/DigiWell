import { StyleSheet } from "react-native";
import { getInterFontFamily, getUrbanistFontFamily } from "../../../Assets/Fonts/helper";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../Utility/ScalingUtility/ScalingUtility";

const Styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: verticalScale(20)
    },
    userProfileImageContainer: {

    },
    userProfileImage: {
        width: horizontalScale(125),
        height: horizontalScale(125),
        borderRadius: 100,
        borderWidth: 3.2,
    },
    rootContainer: {
        flexDirection: 'column'
    },
    inputFieldContainer: {
        flexDirection: "column",
        marginHorizontal: horizontalScale(30)
    },
    nameInputFieldContainer: {
        marginBottom: verticalScale(10)
    },
    passwordInputFieldContainer: {
        marginBottom: verticalScale(10)
    },
    confirmPasswordInputFieldContainer: {}

});

export default Styles;

