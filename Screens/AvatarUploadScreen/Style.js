import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";

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
    }

});

export default Style;
