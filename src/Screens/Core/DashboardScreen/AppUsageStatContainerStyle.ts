import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../../Utility/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../../Assets/Fonts/helper";

const AppUsageStatContainerStyle = StyleSheet.create({
    appStat: {
        flexDirection: 'row',
        padding: 22,
        borderRadius: 11,
        alignItems: 'center'
    },
    iconStyle: {

    },
    flashListContainer: {
        flex: 1,
        paddingBottom: 50,
        marginHorizontal: horizontalScale(26),
    },
    linearGradient: {
        marginVertical: verticalScale(10),
        borderRadius: 11,
    },
    appNameText: {
        fontFamily: getUrbanistFontFamily('Urbanist', '600'),
        marginLeft: horizontalScale(15),
    },
    appNameAndCategoryNest: {
        flexDirection: 'column',
    },
    categoryContainer: {

    },
    categoryText: {
        fontFamily: getUrbanistFontFamily('Urbanist', '500'),
        marginLeft: horizontalScale(15),
        marginTop: 10,
        borderRadius: 10,
        paddingLeft: horizontalScale(10),
        paddingRight: horizontalScale(10),
        paddingVertical: verticalScale(3),
    },
    usageTimeAndSettingsContainer: {
        flexDirection: 'column',
        marginLeft: 'auto',
        alignItems: 'flex-end'
    }
});

export default AppUsageStatContainerStyle;
