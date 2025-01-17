import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Typography,
    message,
    Row,
    Col,
    Divider,
} from "antd";
import { useHistory } from "react-router-dom";
import {
    LockOutlined,
    WarningOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    MailOutlined,
    FileAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import list from "../../config";
import axios from "axios";
import Hed from "./hed.png";

const Login = () => {
    const [loading, setloading] = useState(false);
    const his = useHistory();
    const onLogin = (value) => {
        message.loading({ content: "Logging you in.....", key: "login" });
        const backend_url = list["backend_url"];
        axios
            .post(`${backend_url}/login`, value)
            .then((res) => {
                console.log(res.data);
                setloading(false);
                message.success({ content: "Logged in", key: "login" });
                localStorage.setItem("email", value["email"]);
                localStorage.setItem("password", value["password"]);
                localStorage.setItem("count", 0);
                his.replace("/unsubscribe");
            })
            .catch((err) => {
                console.error(err.message);
                setloading(false);
                message.error({ content: "Invalid credentials", key: "login" });
            });
    };
    return (
        <div className="login__container">
            <div className="login__hero">
                <Row>
                    <Col style={{ width: "100%" }}>
                        <Row align="middle">
                            <img
                                src={Hed}
                                width="80"
                                style={{
                                    display: "block",
                                    marginRight: "1rem",
                                    marginBottom: "1rem",
                                }}
                            />
                            <h1>Hed Mail</h1>
                        </Row>
                        <Divider
                            style={{
                                backgroundColor: "#5ec4ac",
                                margin: "0",
                                marginBottom: "1.5rem",
                            }}
                        />
                    </Col>
                    <Col>
                        <span style={{ color: "#bbb" }}>
                            once an email has been sent it’s out there forever,
                            somewhere…
                            <br />
                            As the email travels across the internet, each
                            server will use some electricity to temporarily
                            store it, before passing it on. Sending 65 emails is
                            roughly equivalent to driving 1km in a car. In a
                            year, an average person in the developed world adds
                            136kg of CO2 to their carbon footprint from the
                            emails they send and receive. This is equivalent to
                            an extra 320km driven in a car.
                            <br></br>
                            <br />
                            Below are the average carbon footprints of different
                            emails:
                        </span>
                    </Col>
                    <Row style={{ width: "100%", marginTop: "2rem" }}>
                        <Col
                            style={{
                                width: "30%",
                                textAlign: "center",
                                padding: "10px",
                                marginRight: "10px",
                            }}
                        >
                            <MailOutlined
                                style={{
                                    fontSize: "24px",
                                    color: "#5ec4ac",
                                    marginBottom: "1rem",
                                }}
                            />
                            <h5 style={{ color: "#eee", margin: "0" }}>
                                Normal Mail
                            </h5>
                            <span
                                style={{
                                    color: "#aaa",
                                    fontSize: "13px",
                                    lineHeight: "1.2px",
                                }}
                            >
                                Responsible for <b>4 grams</b> of CO2 emission
                            </span>
                        </Col>
                        <Col
                            style={{
                                width: "30%",
                                textAlign: "center",
                                padding: "10px",
                                marginRight: "10px",
                            }}
                        >
                            <WarningOutlined
                                style={{
                                    fontSize: "28px",
                                    color: "#5ec4ac",
                                    marginBottom: "1rem",
                                }}
                            />
                            <h5 style={{ color: "#eee", margin: "0" }}>
                                Spam Mail
                            </h5>
                            <span
                                style={{
                                    color: "#aaa",
                                    fontSize: "13px",
                                    lineHeight: "1.2px",
                                }}
                            >
                                Responsible for <b>0.3 grams</b> of CO2 emission
                            </span>
                        </Col>
                        <Col
                            style={{
                                width: "30%",
                                textAlign: "center",
                                padding: "10px",
                            }}
                        >
                            <FileAddOutlined
                                style={{
                                    fontSize: "28px",
                                    color: "#5ec4ac",
                                    marginBottom: "1rem",
                                }}
                            />
                            <h5 style={{ color: "#eee", margin: "0" }}>
                                Mail with Attachment
                            </h5>
                            <span
                                style={{
                                    color: "#aaa",
                                    fontSize: "13px",
                                    lineHeight: "1.2px",
                                }}
                            >
                                Responsible for <b>50 grams</b> of CO2 emission
                            </span>
                        </Col>
                    </Row>
                </Row>
            </div>
            <div style={{ padding: "20px" }} className="login__form">
                <Typography.Title
                    level={2}
                    style={{
                        color: "#5ec4ac",
                    }}
                >
                    Login
                </Typography.Title>

                <Form
                    name="normal_login"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        marginTop: "1rem",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onLogin}
                >
                    <Form.Item
                        className="input__login__element"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input
                            style={{
                                backgroundColor: "transparent",
                            }}
                            prefix={
                                <MailOutlined
                                    className="site-form-item-icon"
                                    style={{ color: "#5ec4ac" }}
                                />
                            }
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        className="input__login__element"
                        style={{ backgroundColor: "transparent" }}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            style={{ backgroundColor: "transparent" }}
                            prefix={
                                <LockOutlined
                                    className="site-form-item-icon"
                                    style={{ color: "#5ec4ac" }}
                                />
                            }
                            type="password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone style={{ color: "#5ec4ac" }} />
                                ) : (
                                    <EyeInvisibleOutlined
                                        style={{ color: "#5ec4ac" }}
                                    />
                                )
                            }
                            placeholder="App Password"
                        />
                    </Form.Item>
                    {/* <Row> */}
                    <Form.Item style={{ margin: "0" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login__button"
                            loading={loading}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a
                            href="https://support.google.com/mail/answer/185833?hl=en"
                            target="blank"
                            style={{ color: "#5ec4ac" }}
                        >
                            Check out to generate App password
                        </a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
