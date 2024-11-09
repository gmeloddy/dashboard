import React from 'react'
import { ColorRing } from 'react-loader-spinner'


type ArgumentProps = {
  isvisible: boolean;
  size: string;
}

export const ColorRingComponent = ({isvisible, size}: ArgumentProps ) => {
  return (
    <>
      <ColorRing
        visible={isvisible}
        height={size}
        width={size}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["black", "black", "black", "black", "black"]}
      />
    </>
  )
}
