import PropTypes from "prop-types";
import {Text} from "react-native";

interface LabelTextProps {
    text: string,
    color: string,
    size: number,
}

const LabelText = (props: LabelTextProps) => {
    return (
        <Text style={{color: props.color, fontSize: props.size, fontWeight: '500'}}>
            {props.text}
        </Text>
    );
};

LabelText.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
}

export default LabelText;
