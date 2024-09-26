import {Dimensions, StyleSheet} from "react-native";

const Style = StyleSheet.create({
    imageBackground: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 2.5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});

export default Style;
