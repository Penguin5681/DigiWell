import {StyleSheet} from "react-native";
import {horizontalScale, scaleFontSize, verticalScale} from "../../../Utility/ScalingUtility/ScalingUtility";
import {getInterFontFamily} from "../../../Assets/Fonts/helper";
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
        flex: 1,
        marginTop: verticalScale(17),
        marginHorizontal: horizontalScale(27)
    },
    emailEditTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: verticalScale(10.8),
    },
    usernameEditTextContainer: {

    },
    passwordEditTextContainer: {
        marginBottom: verticalScale(10.8),
    },
    confirmPasswordEditTextContainer: {},
    buttonContainer: {

    },
    signUpMethodTextContainer: {
        marginTop: verticalScale(10),
    },
    signUpButtonContainer: {
        marginTop: verticalScale(10),
        flexDirection: "row",
        justifyContent: "center",
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
