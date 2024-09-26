import {StyleSheet} from "react-native";
import {horizontalScale, scaleFontSize, verticalScale} from "../../../Assets/ScalingUtility/ScalingUtility";
import {getInterFontFamily, getUrbanistFontFamily} from "../../../Assets/Fonts/helper";
import {getFontScale} from "react-native-device-info";

const Style = StyleSheet.create({
    backButton: {
        marginTop: verticalScale(88),
        marginLeft: horizontalScale(28),
    },
    headerTextView: {
        marginTop: verticalScale(26.33),
        marginLeft: horizontalScale(28.1),
        marginRight: horizontalScale(70.63),
        marginBottom: verticalScale(20),
    },
    inputFieldContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: "#000",
    },
    emailEditTextContainer: {
        marginHorizontal: horizontalScale(27),
        marginTop: verticalScale(15),
        marginBottom: verticalScale(10.8),
    },
    passwordEditTextContainer: {
        marginHorizontal: horizontalScale(27),
        marginBottom: verticalScale(10.8),
    },
    usernameEditTextContainer: {
        marginHorizontal: horizontalScale(27),
        marginTop: verticalScale(30)
    },
    buttonContainer: {
        marginHorizontal: horizontalScale(27),
    },
    signUpMethodTextContainer: {
        marginTop: verticalScale(10),
    },
    signUpButtonContainer: {
        marginTop: verticalScale(10),
        flexDirection: "row",
        justifyContent: "center",
    },
    subHeaderTextView: {
        fontFamily: getUrbanistFontFamily('Urbanist', '500'),
        fontSize: scaleFontSize(16),
        marginTop: verticalScale(10),
        color: "#FFF"
    },
    error: {
        fontFamily: getInterFontFamily("Inter"),
        fontSize: scaleFontSize(16),
        color: '#ff0000',
        marginTop: verticalScale(5),
    },
    success: {
        fontFamily: getInterFontFamily("Inter"),
        fontSize: scaleFontSize(16),
        color: '#08ff00',
        marginTop: verticalScale(5),
    },
});

export default Style;
