import * as React from "react";

function LogoOutline(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={24} cy={24} r={23} stroke="currentcolor" strokeWidth={2} />
      <path
        d="M18.52 32a.648.648 0 01-.476-.196.648.648 0 01-.196-.476V18.14c0-.187.065-.345.196-.476a.61.61 0 01.476-.224h2.268c.205 0 .373.065.504.196.13.13.196.299.196.504v1.148a4.441 4.441 0 011.68-1.372c.69-.317 1.475-.476 2.352-.476h1.148c.205 0 .364.065.476.196.13.112.196.27.196.476v2.016a.648.648 0 01-.196.476c-.112.13-.27.196-.476.196h-2.184c-.877 0-1.568.252-2.072.756s-.756 1.195-.756 2.072v7.7a.648.648 0 01-.196.476.682.682 0 01-.504.196H18.52z"
        fill="currentcolor"
        stroke="none"
      />
      <circle cx={29.5} cy={29.5} r={2.5} fill="currentcolor" stroke="none" />
    </svg>
  );
}

export default LogoOutline;