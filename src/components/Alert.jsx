const Alert = ({ type = "warning", text }) => {
  const types = {
    warning: {
      className: "alert alert-warning",
      svgPath:
        "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      defaultText: "Something went wrong!!!",
    },
    danger: {
      className: "alert alert-error",
      svgPath:
        "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      defaultText: "Something went wrong!!!",
    },
    success: {
      className: "alert alert-success",
      svgPath:
        "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      defaultText: "Success!",
    },
  };

  const alertType = types[type] || types.warning;

  return (
    <div role="alert" className={alertType.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={alertType.svgPath}
        />
      </svg>
      <span>{text || alertType.defaultText}</span>
    </div>
  );
};

export default Alert;
