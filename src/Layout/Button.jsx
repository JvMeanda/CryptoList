import React from 'react'

export const Button = ({text, onClick}) => {
  return (
    <div>
      <button className=" bg-primary px-6 py-2 radius shadow-md
       text-text2 rounded-tl-[20px]
        rounded-br-[20px] rounded-sm whitespace-nowrap" onClick={onClick}>
          {text}
        </button>
    </div>
  )
}

export const ButtonHome = ({text, onClick}) => {
  return (
    <div>
      <button className=" bg-primary px-6 py-2 radius shadow-md
       text-text2 rounded-tl-[20px]
        rounded-br-[20px] rounded-sm whitespace-nowrap sm:w-auto w-80" onClick={onClick}>
          {text}
        </button>
    </div>
  )
}

export const ButtonLogin = ({text, onClick, onKeyDown}) => {
  return (
    <div className='w-full'>
      <button className="bg-primary px-6 py-2 radius shadow-md
       text-text2 rounded-xl whitespace-nowrap w-full" onClick={onClick} onKeyDown={onKeyDown}>
          {text}
        </button>
    </div>
  )
}
