import { StyleSheet } from "react-native";
import { scaleFontSize } from "../../Assets/ScalingUtility/ScalingUtility";
import { getUrbanistFontFamily } from "../../Assets/Fonts/helper";


const Styles = StyleSheet.create({
  background: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
  },
  settingCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  settingProf: {
    marginLeft: 235,
    marginRight: 32,
    marginTop: 25,
  },
  settingHeader: {
    justifyContent: "flex-start",
    position: "absolute",
    left: 30,
    top: 70,
    fontSize: scaleFontSize(30),
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    color: "#309CFF",
  },
  settingAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
  accountName: {
    marginLeft: 15,
    fontSize: scaleFontSize(22),
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    color: "#309CFF",
  },
  accountInfo: {
    marginLeft: 30,
    marginTop: 15,
    fontSize: scaleFontSize(22),
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    color: "#FFF",
  },
  settingNotification: {
    marginTop: 40,
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationName: {
    marginLeft: 15,
    fontSize: scaleFontSize(22),
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    color: "#309CFF",
  },
  notificationInfo: {
    marginLeft: 30,
    marginTop: 15,
    fontSize: scaleFontSize(22),
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    color: "#FFF",
  },
  settingOther: {
    marginTop: 40,
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  otherName: {
    marginLeft: 15,
    fontSize: scaleFontSize(22),
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    color: "#309CFF",
  },
  otherInfo: {
    marginLeft: 30,
    marginTop: 15,
    fontSize: scaleFontSize(22),
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    color: "#FFF",
  },

  notification_accountSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageSetting: {
    marginRight:30,
    backgroundColor:'rgb(63,63,64)',
    color: "#C9C9C9",
    fontFamily: getUrbanistFontFamily("Urbanist", "700"),
    borderRadius:20,
    width:73,
    height:28,
    padding:3,
    textAlign:"center",
    marginTop:15,
  },

});

export default Styles;
