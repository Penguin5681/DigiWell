import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SVG} from "../../Assets/Images/SVGs/SVGIcons.ts";
import PropTypes from "prop-types";

interface CustomIconProps {
	xml: string,
}

const CustomIcon = (props: CustomIconProps) => {
	return (
		<View>
			<SvgXml
				xml={props.xml}
				style={{width: 24, height: 24}}></SvgXml>
		</View>
	);
};

CustomIcon.propTypes = {
	xml: PropTypes.string.isRequired,
}

export default CustomIcon;
