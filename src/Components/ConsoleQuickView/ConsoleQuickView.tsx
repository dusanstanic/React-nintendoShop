import React from "react";

import classes from "./ConsoleQuickView.module.css";

import ConsoleM from "../../shared/models/ConsoleM";

const ConsoleQuickView = (props: { console: ConsoleM }) => {
  return (
    <div className={classes["console-modal"]}>
      <div className={classes["console-modal-image-wrapper"]}>
        <img src={props.console.image} alt="console" />
        <img
          src={props.console.logo}
          className={classes["console-modal-image-wrapper-logo"]}
          alt="console-logo"
        />
      </div>
      <div className={classes["console-modal-type"]}>{props.console.type}</div>
      <div className={classes["console-modal-title"]}>
        {props.console.title}
      </div>
      <div className={classes["console-modal-price-content"]}>
        <div className={classes["console-modal-price-content-condition"]}>
          {props.console.condition.toUpperCase()}
        </div>
        <div className={classes["console-modal-price-content-current-price"]}>
          <span>{props.console.price}</span>
          <span> ,00 RSD</span>
        </div>
        <button className={classes["console-modal-add-to-cart-btn"]}></button>
      </div>
    </div>
  );
};

export default ConsoleQuickView;
