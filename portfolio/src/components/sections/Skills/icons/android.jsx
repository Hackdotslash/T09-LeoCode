import React from "react"
import Style from "../skills.module.scss"

const Android = () => {
    return (
        <div className={Style.svg__container}>
            <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={Style.svg__links}
            >
                <title>Android</title>
                <path d="M24 19.005H0a13.6 13.6 0 012.21-6.07 11.2 11.2 0 013.66-3.53l.41-.23-2.02-3.41a.51.51 0 01.17-.7.5.5 0 01.69.18l2.08 3.5a12.62 12.62 0 014.84-.9 12.2 12.2 0 014.75.9l2.07-3.5a.5.5 0 01.7-.17.51.51 0 01.16.7l-2.02 3.42.5.28a11.38 11.38 0 013.63 3.62 14.48 14.48 0 012.17 5.91zm-7.5-4.48a1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1 1 1 0 00-1 1zm-11 0a1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1 1 1 0 00-1 1z" />
            </svg>
            <p>Android</p>
        </div>
    )
}

export default Android
