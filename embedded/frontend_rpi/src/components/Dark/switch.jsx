import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { useIosSwitchStyles } from "@mui-treasury/styles/switch/ios";
import { Context } from "../../context";
import { IS_DARK } from "../../context/actionTypes";
const SwitchStyle = () => {
  const [toggled, setToggled] = React.useState(false);
  const switchStyles = useIosSwitchStyles();
  const {
    state: { isdark },
    dispatch,
  } = useContext(Context);
  const handleToggle = (e) => {
    setToggled(e.target.value);
    dispatch({
      type: IS_DARK,
      payload: { isdark: toggled },
    });
    console.log(e.target.value)
  };
  return (
    <div>
      <Switch
        classes={switchStyles}
        checked={toggled}
        onChange={(e) => handleToggle(e.target.checked)}
      />
    </div>
  );
};

export default SwitchStyle;
