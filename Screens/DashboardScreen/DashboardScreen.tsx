import {Appearance, SafeAreaView, Text, ToastAndroid, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import Style from "./Style";
import {SvgXml} from "react-native-svg";
import {VectorIcons} from "../../Assets/Images/VectorIcons";
import LabelText from "../../Components/LabelText/LabelText.tsx";
import {scaleFontSize} from "../../Assets/ScalingUtility/ScalingUtility";
import LinearGradient from "react-native-linear-gradient";
import OptionsHeaderText from "../../Components/OptionsHeaderText/OptionsHeaderText.tsx";
import {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DashboardScreen = () => {
    const appsInstalled = '12';
    const dailyScreenTime = "3h 12m";
    const colorSchema = Appearance.getColorScheme();
    const darkModeGradientColorList = ['#0c0c0c', '#4C4E52', '#9FA2A8'];
    const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#97a1a3'];
    const currentAppListView = 'Today';
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [dropDownItems, setDropDownItems] = useState([
        {label: 'Today', value: 'today'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Monthly', value: 'monthly'},
    ]);
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

            <View style={Style.appUsageStatsContainer}>
                <View style={Style.appUsageStatsHeaderViewContainer}>
                    {/*    IDEA: Add the {current app view and a kind of dropdown menu (filter) }*/}
                    {/*    Also categorize the apps into: Social Media, Entertainment */}
                    <OptionsHeaderText
                        text={currentAppListView}
                        color={colorSchema === 'light' ? '#000' : '#FFF'}
                        fontSize={scaleFontSize(18)}
                        marginBottom={0}
                        onPress={() => null}/>

                    <View style={Style.dropDownMenuContainer}>
                        <DropDownPicker
                            theme={colorSchema === 'dark' ? 'DARK' : 'LIGHT'}
                            dropDownDirection={'BOTTOM'}
                            style={{justifyContent: 'center'}}
                            setValue={setDropDownValue}
                            value={dropDownValue}
                            items={dropDownItems}
                            open={isOpen}
                            setOpen={setIsOpen}
                            placeholder={'Sort By'}
                            onSelectItem={(item) => {
                                ToastAndroid.show("Showing: " + item.label, ToastAndroid.SHORT);
                            }}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default DashboardScreen;
