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
        color: "#DBDBDB",
        marginTop: 8,
        fontFamily: getUrbanistFontFamily('Urbanist', '600'),
    },
    editTextContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
    },
    newPasswordEditTextContainer: {
        marginTop: verticalScale(20),
        marginHorizontal: horizontalScale(27),
        marginBottom: verticalScale(15),
    },
    confirmPasswordEditTextContainer: {
        marginHorizontal: horizontalScale(27),
    },
    buttonContainer: {
        marginHorizontal: horizontalScale(27),
    }

});

export default Style;
