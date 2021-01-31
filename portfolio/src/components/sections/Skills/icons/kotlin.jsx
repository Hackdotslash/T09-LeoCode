import React from "react"
import Style from "../skills.module.scss"

const Kotlin = () => {
    return (
        <div className={Style.svg__container}>
            <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={Style.svg__links}
            >
                <title>Kotlin</title>
                <path d="M1.3 24l11.3-11.5L24 24zM0 0h12L0 12.5zM13.4 0L0 14v10l12-12L24 0z" />
            </svg>
            <p>Kotlin</p>
        </div>
    )
}

export default Kotlin
