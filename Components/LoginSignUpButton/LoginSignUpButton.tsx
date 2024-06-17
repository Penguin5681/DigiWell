import {Pressable, Text} from "react-native";
import Style from "./Style";
import PropTypes from "prop-types";

interface ButtonProps {
    text: string,
    textColor: string,
    buttonColor: string,
    onPress: any,
    isEnabled: boolean,
}

const LoginSignUpButton = (props: ButtonProps) => {
    return (
        <Pressable
            style={[Style.buttonLayout, {backgroundColor: props.buttonColor}, {opacity: props.isEnabled ? 1 : 0.5}]}
            onPress={props.onPress}
            disabled={!props.isEnabled}
        >
            <Text style={[Style.buttonText, {color: props.textColor}]}>
                {props.text}
            </Text>
        </Pressable>
    );
};

LoginSignUpButton.propTypes = {
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
    onPress: PropTypes.any.isRequired,
    isEnabled: PropTypes.bool.isRequired,
};

export default LoginSignUpButton;
