import Svg, {G, Path} from "react-native-svg";
import {Image, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import PropTypes from "prop-types";
import {horizontalScale} from "../../Assets/ScalingUtility/ScalingUtility";

interface GoogleButtonProps {
    rightMargin: number,
}

const GoogleButton = (props: GoogleButtonProps) => {
    return (
        <View
            style={
            [GlobalStyle.globalAppLogoContainer, {marginRight: horizontalScale((props.rightMargin))}]
        }>
            <Image
                source={require('../../Assets/Images/google_logo_24px.png')}/>
        </View>
    );
};

GoogleButton.propTypes = {
    rightMargin: PropTypes.number.isRequired,
}

export default GoogleButton;
