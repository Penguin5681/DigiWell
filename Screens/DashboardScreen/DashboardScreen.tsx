import {Appearance, SafeAreaView, Text, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import {SvgXml} from "react-native-svg";
import {VectorIcons} from "../../Assets/Images/VectorIcons";
import LabelText from "../../Components/LabelText/LabelText.tsx";
import {scaleFontSize} from "../../Assets/ScalingUtility/ScalingUtility";
import LinearGradient from "react-native-linear-gradient";

const DashboardScreen = () => {
    const appsInstalled = '12';
    const dailyScreenTime = "3h 12m";
    const colorSchema = Appearance.getColorScheme();
    const darkModeGradientColorList = ['#0c0c0c', '#4C4E52', '#9FA2A8'];
    const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#97a1a3'];
    return (
        <SafeAreaView
            style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'}]}>

            <View style={Style.headerStatsContainer}>
                <View style={Style.appsInstalledStatsContainer}>
                    <LinearGradient
                        style={Style.appsInstalledStatsContainerGradient}
                        colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>
                        <View style={Style.appsInstalledHeaderStatsContainer}>
                            <SvgXml xml={VectorIcons.greenCheckVector}/>
                            <LabelText
                                text={'  Installed Apps'}
                                color={colorSchema === 'dark' ? '#FFF' : '#000'}
                                size={scaleFontSize(14)}/>
                        </View>

                        <View style={Style.appsInstalledCountStatsContainer}>
                            <Text
                                style={[Style.count, {color: colorSchema === 'dark' ? '#FFF' : '#000'}, {marginTop: 10}]}>
                                {appsInstalled}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={Style.dailyScreenTimeStatsContainer}>
                    <LinearGradient
                        style={Style.dailyScreenTimeStatsContainerGradient}
                        colors={colorSchema === 'dark' ? darkModeGradientColorList : lightModeGradientColorList}>
                        <View style={Style.dailyScreenTimeHeaderStatsContainer}>
                            <SvgXml xml={VectorIcons.clockVector}/>
                            <LabelText
                                text={'  Screen Time'}
                                color={colorSchema === 'dark' ? '#FFF' : '#000'}
                                size={scaleFontSize((14))}/>
                        </View>

                        <View style={Style.dailyScreenTimeCountStatsContainer}>
                            <Text
                                style={[Style.count, {color: colorSchema === 'dark' ? '#FFF' : '#000'}]}>
                                {dailyScreenTime}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default DashboardScreen;
