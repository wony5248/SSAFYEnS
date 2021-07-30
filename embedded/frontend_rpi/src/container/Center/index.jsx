import React from "react";


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
