import React from "react"
import Style from "./footer.module.scss"

const Footer = () => {
    return (
        <div
            className="main__container"
            style={{
                marginBottom: "0",
                padding: "1rem 1rem",
                paddingTop: "4.5rem",
            }}
        >
            <div className={`main__container__title ${Style.container}`}>
                <div>
                    <span>
                        Made with
                        {" "}
                        <span role="img" aria-label="love">
                            💙
                        </span>{" "}
                        by Team LeoCode
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer
