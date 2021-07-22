import React from "react";

import ButtonBases from "../../components/Leftbutton";
import Leftsidecontainer from "./styles";

function Leftsidebar() {
	return (
		<Leftsidecontainer>
			<ButtonBases btnName="진행중인    일정"></ButtonBases>
			<ButtonBases btnName="오늘 일정"></ButtonBases>
			<ButtonBases btnName="일정 변경"></ButtonBases>
			<ButtonBases btnName="타이머/ 스탑워치"></ButtonBases>
		</Leftsidecontainer>
	);
}

export default Leftsidebar;
