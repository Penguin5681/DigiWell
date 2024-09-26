import {StyleSheet} from "react-native";
import {horizontalScale, scaleFontSize, verticalScale} from "../../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../../Assets/Fonts/helper";

const Style = StyleSheet.create({
    settingsHeaderContainer: {
        marginTop: verticalScale(50),
        marginLeft: horizontalScale(36),
        flexDirection: 'row',
    },
    accountOptionsContainer: {

    },
    subAccountOptionsContainer: {
        flexDirection: 'row',
        marginLeft: horizontalScale(36),
        marginTop: verticalScale(23),
        marginBottom: verticalScale(15),
    },
    accountOptionsLabelContainer: {
        flexDirection: 'column',
        marginLeft: horizontalScale(36)
    },
    notificationOptionsContainer: {

    },
    labelSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    otherOptionsContainer: {

    },
    svgStyle: {
        marginRight: horizontalScale(14),
    },
    labelSwitchContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: horizontalScale(36)
    },
    subOtherOptionsContainer: {
    },
    languageText: {
        marginRight: horizontalScale(5)
    },
    backButtonContainer: {
        marginRight: horizontalScale(18)
    }

});

export default Style;
