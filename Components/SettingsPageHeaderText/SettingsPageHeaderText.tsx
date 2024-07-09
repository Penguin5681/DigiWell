import {Text} from "react-native";
import PropTypes from "prop-types";
import Style from "./Style";

interface HeaderPropTypes {
    text: string,
}

const SettingsPageHeaderText = (props: HeaderPropTypes) => {
    return (
        <Text style={Style.textStyle}>
            {props.text}
        </Text>
    );
};

SettingsPageHeaderText.propTypes = {
    text: PropTypes.string.isRequired,
}

export default SettingsPageHeaderText;
