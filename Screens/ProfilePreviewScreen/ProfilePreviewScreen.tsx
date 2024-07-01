import React from "react";
import Style from "./Style";
import { Button, FlatList, Image, SafeAreaView, Text, View } from "react-native";
import ProfileContainer from "../../Components/ProfileContainer/ProfileContainer.tsx";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import ActivityProfile from "../../Components/ActivityProfile/ActivityProfile.tsx";

const ProfilePreviewScreen = () => {
  const profileLinks = [
    {
      name: "Your Favorite",
      linkImage: require("../../Assets/Images/favourite.png")
    },
    {
      name: "Payment",
      linkImage: require("../../Assets/Images/payment.png")
    },
    {
      name: "Tell Your Friends",
      linkImage: require("../../Assets/Images/send.png")
    },
    {
      name: "Promotions",
      linkImage: require("../../Assets/Images/promotions.png")
    },
    {
      name: "Settings",
      linkImage: require("../../Assets/Images/settings.png")
    },
    {
      name: "Log Out",
      linkImage: require("../../Assets/Images/logout.png")
    }
  ];
  return (
    <SafeAreaView>
      <View style={Style.background}>
        <View style={Style.profileCont}>
          <View>
            <ProfileContainer profilePhoto={require("../../Assets/Images/Ellipse.png")} imageDimensions={113} />
          </View>
          <View style={Style.infoContainer}>
            <Text style={Style.userName}>Jatin Dhobi</Text>
            <Text style={Style.Info}>India</Text>
            <Text style={Style.Info}>Since 2005</Text>
          </View>
        </View>
        <View style={Style.profButton}>
        <LoginSignUpButton text={"Edit profile"} textColor={"#FFFFFF"} buttonColor={"#34ADE1"} onPress={() => {
          console.log("Click");
        }} isEnabled={true} topMargin={10} buttonRadius={30} buttonHeight={60}/>
        </View>
        <View style={Style.activities}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={profileLinks}
            renderItem={({ item }) => (<ActivityProfile activityName={item.name} activityImage={item.linkImage} />)} />
        </View>
      </View>
    </SafeAreaView>
  );
};


export default ProfilePreviewScreen;
