import React from "react";
import { useUserContext } from "../../context";
import Centerlayout from "./styles";

function Center(props) {
	const {pages} = props
	const { isdarked } = useUserContext();
	return (
		<Centerlayout isdark = {isdarked}>
		{pages}
		</Centerlayout>
	);
}

export default Center;
