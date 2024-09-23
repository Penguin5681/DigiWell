import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";

export const Style = StyleSheet.create({
    backButton: {
        marginTop: verticalScale(88),
        marginLeft: horizontalScale(28),
    },
    headerTextView: {
        marginTop: verticalScale(56.33),
        marginLeft: horizontalScale(28.1),
        marginRight: horizontalScale(70.63),
        marginBottom: verticalScale(20),
    },
    inputFieldContainer: {
        flex: 1,
        marginTop: verticalScale(40),
        marginHorizontal: horizontalScale(27)
    },
    footerContainer: {

    },
    buttonStyle: {
        marginTop: verticalScale(22),
    }

});
