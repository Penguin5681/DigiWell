import PropTypes from "prop-types";
import {Text} from "react-native";
import Style from "./Style";

interface LoginMethodTextProps {
    text: string
}
const LoginMethodText = (props: LoginMethodTextProps) => {
    return (
        <Text
            style={Style.textStyle}
        >
            {props.text}
        </Text>
    );
};

LoginMethodText.propTypes = {
    text: PropTypes.string.isRequired,
};

export default LoginMethodText;
