import {Image, Pressable, View} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
interface FacebookButtonProps {
    onPress: any;
    buttonBackgroundColor: string,
}

const FacebookButton = (props: FacebookButtonProps) => {
    return (
        <Pressable
        onPress={props.onPress}
        >

        <View
            style={[GlobalStyle.globalAppLogoContainer, {backgroundColor: props.buttonBackgroundColor}]}>
            <FontAwesomeIcon icon={faFacebookF} color={"#0072ff"} size={24}/>
        </View>
        </Pressable>
    );
};

FacebookButton.propTypes = {
    buttonBackgroundColor: PropTypes.string,
    onPress: PropTypes.any.isRequired,
}


export default FacebookButton;
