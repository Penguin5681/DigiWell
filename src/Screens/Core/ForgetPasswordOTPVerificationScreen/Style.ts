import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../../Assets/Fonts/helper";

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
    subHeaderTextView: {
        color: "#DBDBDB"
    },
    otpInputContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
    },
    otpInputStyle: {
        marginTop: verticalScale(24),
        marginHorizontal: horizontalScale(40),
    },
    verifyButtonContainer: {
        marginHorizontal: horizontalScale(40),
    },
    resendOTPContainer: {
        marginHorizontal: horizontalScale(40),
        marginBottom: verticalScale(-20),
        marginTop: verticalScale(10),
    },
    resendOTPText: {
        fontFamily: getUrbanistFontFamily('Urbanist', '700'),
        fontSize: 13.86,
        color: "#35C2C1",
        marginTop: verticalScale(10.84),
        textAlign: 'right'
    },

});

export default Style;
