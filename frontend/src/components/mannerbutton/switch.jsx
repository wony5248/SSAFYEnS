import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';

const SwitchStyle = () => {
  const [toggled, setToggled] = React.useState(false);
  const switchStyles = useIosSwitchStyles();
  return (
    <div>
      <Switch
        classes={switchStyles}
        checked={toggled}
        onChange={e => setToggled(e.target.checked)}
      />
    </div>
  );
};

export default SwitchStyle;