import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";

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
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
    },
    emailEditText: {
        marginHorizontal: horizontalScale(27),
        marginTop: verticalScale(20)
    },
    passwordEditText: {
        marginHorizontal: horizontalScale(27),
        marginTop: verticalScale(13.84),
    },
    forgetPasswordText: {
        fontFamily: getUrbanistFontFamily('Urbanist', '700'),
        fontSize: 13.86,
        color: "#35C2C1",
        textAlign: 'right',
        marginRight: horizontalScale(28),
        marginTop: verticalScale(10.84),
    },
    loginButtonContainer: {
        marginHorizontal: horizontalScale(27),
        marginTop: verticalScale(20.35),
    },
    signInButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: verticalScale(10),
    },
    loginMethodTextContainer: {
        marginTop: verticalScale(16),
    },
});

export default Style;
