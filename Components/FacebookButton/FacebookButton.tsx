import {Image, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import PropTypes from "prop-types";

interface FacebookButtonProps {
    buttonBackgroundColor: string,
}

const FacebookButton = (props: FacebookButtonProps) => {
    return (
        <View
            style={[GlobalStyle.globalAppLogoContainer, {backgroundColor: props.buttonBackgroundColor}]}>
            <Image
                source={require('../../Assets/Images/facebook_logo_24px.png')}/>
        </View>
    );
};

FacebookButton.propTypes = {
    buttonBackgroundColor: PropTypes.string,
}


export default FacebookButton;
