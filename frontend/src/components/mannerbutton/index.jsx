import React from "react";
import Mannerbtn from "./styles";
import SwitchStyle from "./switch";

const Button = (props) => {
  const { btnName } = props;

  return (
    <Mannerbtn>
      {
        <div>
          <div>매너모드</div>
          <div>
            <SwitchStyle></SwitchStyle>
          </div>
        </div>
      }
    </Mannerbtn>
  );
};
export default Button;
