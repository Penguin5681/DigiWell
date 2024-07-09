import {StyleSheet} from "react-native";
import {scaleFontSize, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";

const Style = StyleSheet.create({
    headerStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: verticalScale(10)
    },
    appsInstalledStatsContainer: {},
    dailyScreenTimeStatsContainer: {},
    StatsContainerGradient: {},
    appsInstalledHeaderStatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    appsInstalledCountStatsContainer: {},
    dailyScreenTimeHeaderStatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    dailyScreenTimeCountStatsContainer: {},
    count: {
        fontSize: scaleFontSize(30),
        fontWeight: '700',
        marginTop: 8,
    },
    dailyScreenTimeStatsContainerGradient: {
        padding: 15,
        flex: 1,
        borderRadius: 10
    },
    appsInstalledStatsContainerGradient: {
        padding: 15,
        borderRadius: 10,
    }

});

export default Style;
