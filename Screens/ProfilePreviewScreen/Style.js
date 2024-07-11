import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import {getInterFontFamily} from "../../Assets/Fonts/helper";

const Style = StyleSheet.create({
    userDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: horizontalScale(20),
        marginTop: verticalScale(20),
    },
    userImage: {
        borderRadius: 100,
        borderWidth: 4,
        width: verticalScale(86),
        height: verticalScale(86),
    },
    userLabelContainer: {
        flexDirection: 'column',
        marginLeft: horizontalScale(20)
    },
    profileOptionContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',

        borderRadius: 30,
        marginHorizontal: horizontalScale(15),
    },
    profileOptionGradient: {
        padding: horizontalScale(20),
        borderRadius: 30,
    },
    profileOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10)
    },
    optionLabel: {
        fontFamily: getInterFontFamily('Inter', '600'),
    },
    logoutOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    settingsOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },
    shareOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },
    homeOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },
    statsContainer: {

        borderRadius: 30,
        marginTop: verticalScale(10),
        marginHorizontal: horizontalScale(15),
    },
    usageStatsGradient: {
        borderRadius: 30,
        paddingHorizontal: horizontalScale(15),
        paddingTop: verticalScale(10),
    },
    accountStatsGradient: {
        paddingHorizontal: horizontalScale(15),
        paddingBottom: verticalScale(10),
        paddingTop: verticalScale(10),
    },
    accountStatusContainer: {

        marginHorizontal: horizontalScale(15),
        borderRadius: 30,
    },
    dailyStats: {

    },
    monthlyStats: {

    },
    weeklyStats: {

    },
    editProfileButton: {
        marginTop: 5,
        borderRadius: 60,
        padding: 5
    },
    buttonContent: {
        textAlign: 'center',
        color: '#000',
        fontFamily: getInterFontFamily('Inter', '600')
    },
    bodyFooterContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    deleteOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },



});

export default Style;
