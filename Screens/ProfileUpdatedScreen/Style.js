import { StyleSheet } from "react-native";
import { getUrbanistFontFamily } from "../../Assets/Fonts/helper";
import { horizontalScale, scaleFontSize, verticalScale } from "../../Assets/ScalingUtility/ScalingUtility";

const Style = StyleSheet.create({
    stickerContainer: {
        marginBottom: verticalScale(15),
    },
    headerTextContainer: {
        alignItems: 'center',
        color: '#FFF',
        fontFamily: getUrbanistFontFamily('Urbanist', '700'),
        fontSize: scaleFontSize(26),

    },
    subHeaderTextContainer: {
        alignItems: 'center',
        color: '#DBDBDB',
        fontFamily: getUrbanistFontFamily('Urbanist', '500'),
        lineHeight: 22.5,
    },
    buttonContainer: {
        width: 330,
        marginHorizontal: horizontalScale(20),
    },


});

export default Style;
