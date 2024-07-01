import React, { useState } from "react";
import Styles from "./Style";
import { Image, SafeAreaView, Switch, Text, View } from "react-native";
import ProfileContainer from "../../Components/ProfileContainer/ProfileContainer.tsx";

const ProfileSettingsScreen = () => {
  const [notificationSwitchOn, setNotificationSwitchOn] = useState(false);
  const [updateSwitchOn, setUpdateSwitchOn] = useState(false);
  const [darkModeSwitchOn, setDarkModeSwitchOn] = useState(false);
  return (
    <SafeAreaView>
      <View style={Styles.background}>
        <View style={Styles.settingCont}>
          <View style={Styles.settingProf}>
            <ProfileContainer profilePhoto={require("../../Assets/Images/Ellipse.png")} imageDimensions={95} />
          </View>
          <Text style={Styles.settingHeader}>Settings</Text>
        </View>
        <View>
          <View style={Styles.settingAccount}>
            <Image source={require("../../Assets/Images/Account.png")} />
            <Text style={Styles.accountName}>Account</Text>
          </View>
          <Text style={Styles.accountInfo}>Edit Profile</Text>
          <Text style={Styles.accountInfo}>Change Password</Text>
          <Text style={Styles.accountInfo}>Privacy</Text>
        </View>

        <View>
          <View style={Styles.settingNotification}>
            <Image source={require("../../Assets/Images/Notifications.png")} />
            <Text style={Styles.notificationName}>Notification</Text>
          </View>
          <View style={Styles.notification_accountSwitch}>
            <Text style={Styles.notificationInfo}>Notification</Text>
            <Switch value={notificationSwitchOn} onValueChange={value => {
              setNotificationSwitchOn(value);
              console.log("Notification");
            }} style={{ marginTop: 20, marginRight: 20 }}></Switch>
          </View>
          <View style={Styles.notification_accountSwitch}>
            <Text style={Styles.notificationInfo}>Updates</Text>
            <Switch value={updateSwitchOn} onValueChange={value => {
              setUpdateSwitchOn(value);
              console.log("Updates");
            }} style={{ marginTop: 20, marginRight: 20 }}></Switch>
          </View>
        </View>

        <View>
          <View style={Styles.settingOther}>
            <Image source={require("../../Assets/Images/Other.png")} />
            <Text style={Styles.otherName}>Account</Text>
          </View>
          <View style={Styles.notification_accountSwitch}>
            <Text style={Styles.otherInfo}>Dark Mode</Text>
            <Switch value={darkModeSwitchOn} onValueChange={value => {
              setDarkModeSwitchOn(value);
              console.log("Dark Mode");
            }} style={{ marginTop: 15, marginRight: 20 }}></Switch>
          </View>
          <View style={Styles.notification_accountSwitch}>
            <Text style={Styles.otherInfo}>Language</Text>
            <Text style={Styles.languageSetting}>English</Text>
          </View>
          <View style={Styles.notification_accountSwitch}>
            <Text style={Styles.otherInfo}>Region</Text>
            <Text style={Styles.languageSetting}>India</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
