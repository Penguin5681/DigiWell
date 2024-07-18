import React from "react";
import {
    Alert,
    Animated, StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import {CurvedBottomBar} from "react-native-curved-bottom-bar";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import Style from "../Assets/BottomNavigationBarStyle/Style";
import {faClock, faGear, faHourglassHalf, faSearch, faUser, faWarning} from "@fortawesome/free-solid-svg-icons";
import {Routes} from "./Routes";
import DashboardScreen from "../Screens/DashboardScreen/DashboardScreen.tsx";
import AppUsageScreen from "../Screens/AppUsageScreen/AppUsageScreen.tsx";
import DetailedAppUsageScreen from "../Screens/DetailedAppUsageScreen/DetailedAppUsageScreen.tsx";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen.tsx";
import EditProfileScreen from "../Screens/EditProfileScreen/EditProfileScreen.tsx";
import ProfilePreviewScreen from "../Screens/ProfilePreviewScreen/ProfilePreviewScreen.tsx";
import AppLimitsScreen from "../Screens/AppLimitsScreen/AppLimitsScreen.tsx";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const BottomTabNavigation = ({navigation}: { navigation: any }) => {
    const _renderIcon = (routeName: any, selectedTab: any) => {
        let selectedTabIcon: IconProp = faWarning;

        switch (routeName) {
            case Routes.DashboardScreen:
                selectedTabIcon = faHome;
                break;
            case Routes.AppUsageScreen:
                selectedTabIcon = faClock;
                break;
            case Routes.AppLimitsScreen:
                selectedTabIcon = faHourglassHalf;
                break;
            case Routes.ProfileScreen:
                selectedTabIcon = faUser;
                break;
        }

        // @ts-ignore
        return (
            <FontAwesomeIcon
                icon={selectedTabIcon}
                size={25}
                color={routeName === selectedTab ? "black" : "gray"}
            />
        );
    };
    const renderTabBar = ({routeName, selectedTab, navigate}: {
        routeName: string,
        selectedTab: string,
        navigate: Function
    }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={Style.tabbarItem}
            >
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    return (
        <>
            <CurvedBottomBar.Navigator
                screenOptions={{headerShown: false}}
                type="DOWN"
                style={Style.bottomBar}
                shadowStyle={Style.shadow}
                height={60}
                circleWidth={50}
                bgColor="#292929"
                initialRouteName={Routes.DashboardScreen}
                borderTopLeftRight
                renderCircle={() => (
                    <Animated.View style={Style.btnCircleUp}>
                        <TouchableOpacity
                            style={Style.button}
                            onPress={() => {
                                navigation.navigate(Routes.ProfileSettingScreen)
                            }}
                        >
                            <FontAwesomeIcon icon={faGear} color="gray" size={25}/>
                        </TouchableOpacity>
                    </Animated.View>
                )}
                tabBar={renderTabBar}
            >
                <CurvedBottomBar.Screen
                    name={Routes.DashboardScreen}
                    position="LEFT"
                    component={DashboardScreen}/>
                <CurvedBottomBar.Screen
                    name={Routes.AppUsageScreen}
                    component={AppUsageScreen}
                    position="LEFT"/>
                <CurvedBottomBar.Screen
                    name={Routes.AppLimitsScreen}
                    position={"RIGHT"}
                    component={AppLimitsScreen}/>
                <CurvedBottomBar.Screen
                    name={Routes.ProfileScreen}
                    position={"RIGHT"}
                    component={ProfilePreviewScreen}/>

            </CurvedBottomBar.Navigator>
        </>
    );
};

export default BottomTabNavigation;
