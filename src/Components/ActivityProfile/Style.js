import { StyleSheet } from 'react-native';
import { getUrbanistFontFamily } from "../../Assets/Fonts/helper";
import { scaleFontSize } from "../../Utility/ScalingUtility/ScalingUtility";

const Styles = StyleSheet.create({
  activityprofiles: {
    flexDirection: "row",
    marginTop:33,
    alignItems: "center",
    justifyContent:'space-between',
    marginLeft:12,
  },
  activities: {
    flexDirection:'row',
    marginLeft:12,
    marginTop:5,
  },
  activityName: {
    fontFamily:getUrbanistFontFamily('Urbanist','700'),
    fontSize:scaleFontSize(21),
    marginLeft:30,
    justifyContent:'center',
  },
  activityArrowButtonBackground: {
    width: 25,
    height: 25,
    backgroundColor: "#rgba(255, 255, 255, 0.10)",
    borderRadius: 5.85,
    marginRight:20,
    borderWidth:0.5,
    justifyContent:'center',
    alignItems: 'center',
    borderColor: "rgba(232, 236, 244, 0.85)",
  },
  leftArrow: {
    color:'#fff',
  },


});

export default Styles;
