import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import Style from "./style.module.scss"
import logo from "../../logo.png"

const Header = ({ siteTitle }) => (
    <header>
        <div className={Style.header__main}>
            <div className="title">
                <Link to="/" className={Style.home__link}>
                    <img
                        style={{ height: "50px", width: "90px" }}
                        src={logo}
                        alt="hedwig logo"
                    />
                </Link>
            </div>
            <div className={Style.menu}>
                <ul className="menu_list">
                    <li className="memu_list_item">
                        <Link to="#about">About Hedwig</Link>
                    </li>
                    <li className="memu_list_item">
                        <Link to="#life">Timeline</Link>
                    </li>
                    <li className="memu_list_item">
                        <Link to="#contact">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
