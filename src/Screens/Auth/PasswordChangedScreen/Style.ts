import {Dimensions, StyleSheet} from "react-native";
import {getUrbanistFontFamily} from "../../../Assets/Fonts/helper";
import {horizontalScale, scaleFontSize, verticalScale} from "../../../Utility/ScalingUtility/ScalingUtility";

const Style = StyleSheet.create({
    stickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
    },
    headerTextContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    subHeaderTextContainer: {
        fontFamily: getUrbanistFontFamily('Urbanist', '500'),
        fontSize: scaleFontSize(15),
        marginTop: verticalScale(8)
    },
    buttonContainer: {
        marginHorizontal: horizontalScale(27)
    },
});

export default Style;
