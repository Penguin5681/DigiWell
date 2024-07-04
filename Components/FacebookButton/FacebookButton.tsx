import {Image, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
interface FacebookButtonProps {
    buttonBackgroundColor: string,
}

const FacebookButton = (props: FacebookButtonProps) => {
    return (
        <View
            style={[GlobalStyle.globalAppLogoContainer, {backgroundColor: props.buttonBackgroundColor}]}>
            <FontAwesomeIcon icon={faFacebookF} color={"#0072ff"} size={24}/>
        </View>
    );
};

FacebookButton.propTypes = {
    buttonBackgroundColor: PropTypes.string,
}


export default FacebookButton;
