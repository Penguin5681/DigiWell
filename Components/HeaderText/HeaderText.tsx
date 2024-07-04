import {Text} from "react-native";
import PropTypes from "prop-types";
import Style from "./Style";

interface HeaderTextProps {
    text: string,
    textColor: string,
}

const HeaderText = (props: HeaderTextProps) => {
    return (
        <Text
            style={[Style.headerTextStyle, {color: props.textColor}]}>
            {props.text}
        </Text>
    );
};

HeaderText.propTypes = {
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string
};

export default HeaderText;
