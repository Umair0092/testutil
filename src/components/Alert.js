import React from "react";

export default function Alert(Props) {
  return (
    Props.Alert && (
      <div
        className={`alert alert-${Props.Alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{Props.Alert.msg}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    )
  );
}
