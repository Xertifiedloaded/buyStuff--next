import React from 'react'

export default function Today({Today}) {
  return (
    <div className="flex  gap-4 items-center mt-4">
    <div className="bg-[#DB4444] w-[20px] h-[20px]"></div>
    <h1 className="text-xs font-bold text-[#DB4444]">{Today}</h1>
  </div>
  )
}
