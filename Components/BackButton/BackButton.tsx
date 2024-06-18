import {Image, Pressable, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Style from "./Style";
import PropTypes from "prop-types";

interface BackButtonProps {
    onPress: any,
}

const BackButton = (props: BackButtonProps) => {
    return (
        <Pressable
            onPress={props.onPress}
        >
            <View
                style={Style.backButtonBackground}>
                <FontAwesomeIcon style={Style.icon} icon={faArrowLeft} />
            </View>
        </Pressable>
    );
}

BackButton.propTypes = {
    onPress: PropTypes.any.isRequired,
}

export default BackButton;
