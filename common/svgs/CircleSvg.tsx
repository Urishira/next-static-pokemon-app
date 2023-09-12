import React from 'react'

function CircleSvg(props: React.SVGProps<SVGGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={40} viewBox="0 0 100 100">
      <g
        {...props}
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4"
      >
        <path d="M64.641 31.942c5.27 4.25 8.64 10.76 8.64 18.058 0 12.806-10.381 23.188-23.188 23.188a23.11 23.11 0 01-8.658-1.671M35.926 68.357c-5.487-4.241-9.02-10.886-9.02-18.357 0-12.806 10.381-23.188 23.188-23.188 3.202 0 6.252.649 9.026 1.822"></path>
        <path d="M48.777 36.733l9.78-6.847a1.996 1.996 0 00.487-2.783l-7.149-10.211M51.829 63.79l-9.78 6.847a1.996 1.996 0 00-.487 2.783l7.149 10.211"></path>
      </g>
    </svg>
  )
}

export default CircleSvg
