import React, {useEffect } from 'react'

const Alert = ({alert, setAlert}) => {

    useEffect(() => {
        if(alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3400);
            return () => clearTimeout(timer);
        }
    }, [alert, setAlert])

    const alertClasses = {
        success: 'bg-green-200 text-green-800',
        error: 'bg-red-200 text-red-800',
      };

  return (
    <div>
      {alert && (
        <div
        className={`fixed top-0 left-0 right-0 p-2 z-50
         text-center font-semibold ${alertClasses[alert.type]}`}>
            <p>{alert.message}</p>
        </div>
      )} 
    </div>
  )
}

export default Alert
