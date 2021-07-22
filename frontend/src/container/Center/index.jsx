import React from "react";

import ButtonBases from "../../components/Leftbutton";
import Centerlayout from "./styles";

function Center(props) {
	const {pages} = props
	return (
		<Centerlayout>
		{pages}
		</Centerlayout>
	);
}

export default Center;
