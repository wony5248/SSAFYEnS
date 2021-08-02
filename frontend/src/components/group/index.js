import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@material-ui/core";
import Wrapper from "./styles";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";


const Group = () => {
 
  return (
    <Wrapper>
      <Grid container justifyContent="center">
        <Grid container justifyContent="space-around" style={{ width: "20%" }}>
          <Grid item>
            <IconButton>
              <KeyboardArrowLeftIcon
                fontSize="large"
                style={{ color: "#A3CCA3" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <div
              style={{
                background: "#A3CCA3",
                width: "130px",
                height: "30px",
                textAlign: "center",
                paddingTop: "5px",
                marginTop: "10px",
                borderRadius: 45,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              {2}
            </div>
          </Grid>
          <Grid item>
            <IconButton>
              <KeyboardArrowRightIcon
                fontSize="large"
                style={{ color: "#A3CCA3" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <table style={{ borderStyle: "solid", borderColor: "#A3CCA3" }}>
          <tr>1</tr>
          <tbody>2</tbody>
        </table>
      </Grid>
    </Wrapper>
  );
};

export default Group;
