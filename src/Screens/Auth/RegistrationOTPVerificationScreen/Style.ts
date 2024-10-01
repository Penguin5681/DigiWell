
import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../../Utility/ScalingUtility/ScalingUtility";

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
        marginTop: verticalScale(32),
        marginHorizontal: horizontalScale(40),
    },
    verifyButtonContainer: {
        marginHorizontal: horizontalScale(40),
    }


});

export default Style;
