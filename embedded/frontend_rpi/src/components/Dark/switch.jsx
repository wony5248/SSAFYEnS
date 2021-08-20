import React from "react";
import Switch from "@material-ui/core/Switch";
import { useIosSwitchStyles } from "@mui-treasury/styles/switch/ios";
import { useUserContext } from "../../context";
const SwitchStyle = () => {
  var mode = window.localStorage.getItem("istoggle");
  mode = JSON.parse(mode);
  const [toggled, setToggled] = React.useState(mode);
  const switchStyles = useIosSwitchStyles();
  const { isdarked, setIsdarked } = useUserContext();
  return (
    <div>
      <Switch
        classes={switchStyles}
        checked={toggled}
        onChange={(e) => {
          setToggled(e.target.checked);
          window.localStorage.setItem("istoggle", e.target.checked);
          setIsdarked(e.target.checked);
          window.localStorage.setItem("isdark", e.target.checked);
          // console.log(isdarked)
        }}
      />
    </div>
  );
};

export default SwitchStyle;
