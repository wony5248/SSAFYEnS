import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';

const SwitchStyle = () => {
  const [toggled, setToggled] = React.useState(false);
  const switchStyles = useN01SwitchStyles();
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