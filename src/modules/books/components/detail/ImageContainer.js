import React from "react";
import Image from "next/image";

export default function ImageContainer({ thumbnail }) {
  return (
    <div>
      <Image width={320} height={460} src={thumbnail} alt="" />
    </div>
  );
}
