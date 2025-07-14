import SweetAlert from "react-bootstrap-sweetalert";
import React from "react";

const SweetAlertComponent = ({
  title,
  subtitle,
  confirm,
  cancel,
  type = "danger"
}) => {
  return (
    <SweetAlert
      style={{ zIndex: 1 }}
      title={title}
      onConfirm={confirm}
      onCancel={cancel}
      type={type}
      showCancel={true}
      confirmBtnStyle={{
        backgroundColor: "#024b98",
        color: "white",
        width: "80px",
        textDecoration: "none"
      }}
    >
      <h5>{subtitle}</h5>
    </SweetAlert>
  );
};

export default SweetAlertComponent;
