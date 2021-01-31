import React, { useEffect, useState } from "react";
import {
    Button,
    Divider,
    Empty,
    message,
    Row,
    Skeleton,
    Typography,
} from "antd";
import CardLoading from "./cardLoading";
import { useHistory } from "react-router-dom";
import UnsubscribeCard from "./unsubscribeCard";
import "antd/dist/antd.css";
import axios from "axios";
import list from "../../config";

const Unsubscribe = () => {
    const [unsubscribeList, setUnsubscribeList] = useState([1, 2, 3, 4, 5, 6]);
    const [loading, setloading] = useState(true);
    const [count, setcount] = useState(parseInt(localStorage.getItem("count")));
    const his = useHistory();

    useEffect(() => {
        const backend_url = list["backend_url"];
        let data = {
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password"),
            count: 80,
        };
        axios
            .post(`${backend_url}/getUnsubscribeList`, data)
            .then((res) => {
                console.log(res.data);
                setUnsubscribeList(res.data.data);
                setloading(false);
            })
            .catch((err) => {
                console.error(err.message);
                setloading(false);
            });
    }, []);

    const onUnsubscribe = (link) => {
        console.log(link);
        // var index = unsubscribeList.findIndex((item) => item["link"] === link);
        // if (index != -1) {
        //     var prev = [...unsubscribeList];
        //     prev.splice(index, 1);
        //     setUnsubscribeList(prev);
        // }
    };

    const onDelete = (account_mail) => {
        var data = {
            account_mail,
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password"),
            count: 400,
        };

        const backend_url = list["backend_url"];
        message.loading({
            content: `Deleting ${account_mail} mails from your account!`,
            key: "delete",
            duration: 10000,
        });
        axios
            .post(`${backend_url}/deleteAllMails`, data)
            .then((res) => {
                console.log(res.data);
                let tempCount = count + 2 * 4;
                setcount(tempCount);
                localStorage.setItem("count", tempCount);
                message.success({
                    content: `Deleted ${
                        res.data.count
                    } mails! Congratulation, you have freed ${
                        res.data.count * 4
                    } g of CO2`,
                    key: "delete",
                    duration: 3,
                });
            })
            .catch((err) => {
                console.log(err);
                message.error({
                    content: `Something went wrong!`,
                    key: "delete",
                    duration: 1,
                });
            });
    };

    return (
        <div style={{ maxWidth: "64rem", margin: "0px auto" }}>
            {loading ? (
                <div
                    style={{
                        margin: "0px auto",
                        padding: "20px 10px",
                    }}
                >
                    <Skeleton active paragraph={{ rows: 0 }} />
                    <CardLoading number={8} />
                </div>
            ) : (
                <>
                    {unsubscribeList !== undefined &&
                    unsubscribeList.length !== 0 ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                marginTop: "20px",
                            }}
                        >
                            <div className="carbon_emission_dashboard">
                                <div className="carbon_emission_dashboard2">
                                    <div className="carbon_emission_value">
                                        <div
                                            style={{
                                                border: "3px solid #5ec4ac",
                                                width: "140px",
                                                height: "140px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "70px",
                                            }}
                                        >
                                            <h1>{count}g</h1>
                                            <span style={{ color: "#ccc" }}>
                                                Carbon Save
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            flex: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "1rem",
                                        }}
                                    >
                                        <h4 style={{ color: "#fff" }}>
                                            Welcome{" "}
                                            <span style={{ color: "#5ec4ac" }}>
                                                {localStorage.getItem("email")}!
                                            </span>
                                        </h4>
                                        <span style={{ color: "#bbb" }}>
                                            Do you know ? emails are responsible
                                            for as much CO2 globally as seven
                                            million extra cars. <br></br>It is
                                            likely that you have received one
                                            unwanted email so far today, or even
                                            10 or more! Help the environment by
                                            reducing the carbon emission in tech
                                            world
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Row
                                justify="space-between"
                                align="middle"
                                style={{ width: "100%" }}
                            >
                                <h1 style={{ marginLeft: "1rem" }}>
                                    Unsubscribe List
                                </h1>
                                <Button
                                    className="logout__button"
                                    onClick={() => {
                                        localStorage.clear();
                                        his.replace("/");
                                    }}
                                >
                                    Logout
                                </Button>
                            </Row>
                            <Divider
                                style={{
                                    backgroundColor: "#5ec4ac",
                                    margin: "0",
                                    marginBottom: "1.5rem",
                                }}
                            />
                            <Row justify="center">
                                {unsubscribeList.map((item, index) => (
                                    <UnsubscribeCard
                                        key={index}
                                        item={item}
                                        onUnsubscribe={onUnsubscribe}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </Row>
                        </div>
                    ) : (
                        <Empty
                            style={{ marginTop: "2.5rem" }}
                            description={"No record found"}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Unsubscribe;
