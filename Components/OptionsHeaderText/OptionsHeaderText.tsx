import {Text} from "react-native";
import Style from "./Style";
import PropTypes from "prop-types";

interface OptionsHeaderTextPropTypes {
    text: string,
    color: string,
    fontSize: number,
    marginBottom: number,
    onPress: Function,
}

const OptionsHeaderText = (props: OptionsHeaderTextPropTypes) => {
    return (
        <Text
            onPress={() => {}}
            style={
                [Style.textStyle, {color: props.color}, {fontSize: props.fontSize}, {marginBottom: props.marginBottom}]
            }>
            {props.text}
        </Text>
    );
};

OptionsHeaderText.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    marginBottom: PropTypes.number.isRequired,
    onPress: PropTypes.func
};

export default OptionsHeaderText;
