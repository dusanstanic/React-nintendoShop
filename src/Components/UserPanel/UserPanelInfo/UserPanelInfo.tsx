import React, { FunctionComponent, useEffect, useState } from "react";

import classes from "./UserPanelInfo.module.css";

import Aux from "../../../hoc/Auxiliary";
import { UserInfo } from "../../../shared/models/UserInfo";

interface PropsI {
  userRole: string;
  userInfo: UserInfo;
}

const UserPanelInfo: FunctionComponent<PropsI> = ({ userRole, userInfo }) => {
  return (
    <Aux>
      <div className={classes["row"]}>
        <h1>Personal Data</h1>
      </div>
      <div className={classes["row"]}>
        <div className={classes["column"] + " " + classes["column-info"]}>
          Name
        </div>
        <div className={classes["column"]}>
          <span>
            {userInfo ? userInfo.firstName + " " + userInfo.lastName : ""}
          </span>
        </div>
      </div>
      <div className={classes["row"]}>
        <div className={classes["column"] + " " + classes["column-info"]}>
          Email
        </div>
        <div className={classes["column"] + " " + classes["column-info"]}>
          <span>{userInfo?.email}</span>
        </div>
      </div>
      <div className={classes["row"]}>
        <div className={classes["column"] + " " + classes["column-info"]}>
          Phone Number
        </div>
        <div className={classes["column"]}>
          <span>{userInfo?.phone}</span>
        </div>
      </div>
      <div className={classes["row"]}>
        <div className={classes["column"] + " " + classes["column-info"]}>
          City
        </div>
        <div className={classes["column"]}>
          <span>{userInfo?.city}</span>
        </div>
      </div>
      <div className={classes["row"]}>
        <div className={classes["column"] + " " + classes["column-info"]}>
          Street
        </div>
        <div className={classes["column"]}>
          <span>{userInfo?.street}</span>
        </div>
      </div>
      <div className={classes["row"]}>
        <div className={classes["column"] + " " + classes["column-info"]}>
          Street Number
        </div>
        <div className={classes["column"]}>
          <span>{userInfo?.streetNumber}</span>
        </div>
      </div>
    </Aux>
  );
};

export default UserPanelInfo;
