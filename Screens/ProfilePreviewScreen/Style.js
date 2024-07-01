import { StyleSheet } from 'react-native';
import { getUrbanistFontFamily } from "../../Assets/Fonts/helper";
import { getFontScale } from "react-native-device-info";
import { scaleFontSize } from "../../Assets/ScalingUtility/ScalingUtility";

const Style = StyleSheet.create({

  background :{
    backgroundColor:'#000000',
    width: '100%',
    height: '100%',
  },
  profileCont: {
    flexDirection: 'row',
  },
  activities: {
    width:'90%',
    height:'55%',
    borderWidth:0.4,
    borderRadius:30,
    borderColor:'#D9D9D9',
    alignSelf:'center',
    marginTop:17,
    backgroundColor:'#rgba(217, 217, 217, 0.1)',
  },
  userName: {
    fontFamily:getUrbanistFontFamily('Urbanist','700'),
    fontSize:scaleFontSize(26),
    color:'#309CFF',
    marginLeft:14,
  },
  Info: {
    fontFamily:getUrbanistFontFamily('Urbanist','700'),
    fontSize:scaleFontSize(18),
    marginLeft:14,
  },
  infoContainer: {
    marginTop:53,
  },
  profButton: {
    marginRight:90,
    marginLeft:90,
  },

});

export default Style;
