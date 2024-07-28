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
        height: '100%',
        width: '100%',
    },
    avatarIconContainer: {
        marginTop: verticalScale(30),
        alignItems: 'center',
    },
    buttonContainer: {
        marginHorizontal: horizontalScale(20),
    },
    imagePreview: {
        width: 96,
        height: 96,
        borderRadius: 100
    },
    skipText: {
        fontFamily: getUrbanistFontFamily('Urbanist', '700'),
        fontSize: 13.86,
        color: "#35C2C1",
        textAlign: 'right',
        marginRight: horizontalScale(28),
        marginTop: verticalScale(10.84),
    },

});

export default Style;
