import React, {useContext} from "react";
import { Context } from "../../context";
import Centerlayout from "./styles";

function Center(props) {
	const {pages} = props
	const {
		state:{
		  isDark
		}
	  } = useContext(Context)
	return (
		<Centerlayout isdark = {isDark}>
		{pages}
		</Centerlayout>
	);
}

export default Center;
