import {Image, Pressable, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Style from "./Style";
import PropTypes from "prop-types";

interface BackButtonProps {
    onPress: any,
    buttonBackgroundColor: string,
    backArrowColor: string,
}

const BackButton = (props: BackButtonProps) => {
    return (
        <Pressable
            onPress={props.onPress}
        >
            <View
                style={[Style.backButtonBackground, {backgroundColor: props.buttonBackgroundColor}]}>
                <FontAwesomeIcon
                    style={Style.icon}
                    icon={faArrowLeft}
                    color={props.backArrowColor}
                />
            </View>
        </Pressable>
    );
}

BackButton.propTypes = {
    onPress: PropTypes.any.isRequired,
    buttonBackgroundColor: PropTypes.string,
    backArrowColor: PropTypes.string,
}

export default BackButton;
