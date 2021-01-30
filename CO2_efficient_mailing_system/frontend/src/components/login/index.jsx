import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useHistory } from "react-router-dom";
import {
    UserOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import list from "../../config";
import axios from "axios";

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
                his.replace("/unsubscribe");
            })
            .catch((err) => {
                console.error(err.message);
                setloading(false);
                message.error({ content: "Invalid credentials", key: "login" });
            });
    };
    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title level={2} style={{ textDecoration: "underline" }}>
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
                    style={{ width: "250px" }}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    className="input__login__element"
                    style={{ width: "250px" }}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        placeholder="App Password"
                    />
                </Form.Item>
                {/* <Row> */}
                <Form.Item style={{ margin: "0" }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <a
                        href="https://support.google.com/mail/answer/185833?hl=en"
                        target="blank"
                    >
                        Check out to generate App password
                    </a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
