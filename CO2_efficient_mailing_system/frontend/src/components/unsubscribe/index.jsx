import React, { useEffect, useState } from "react";
import { Divider, Empty, message, Row, Typography } from "antd";
import CardLoading from "./cardLoading";
import UnsubscribeCard from "./unsubscribeCard";
import "antd/dist/antd.css";
import axios from "axios";
import list from "../../config";

const Unsubscribe = () => {
    const [unsubscribeList, setUnsubscribeList] = useState([1, 2, 3, 4, 5, 6]);
    const [loading, setloading] = useState(true);

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
        var index = unsubscribeList.findIndex((item) => item["link"] === link);
        if (index != -1) {
            var prev = [...unsubscribeList];
            prev.splice(index, 1);
            setUnsubscribeList(prev);
        }
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
        <div>
            {loading ? (
                <CardLoading number={4} />
            ) : (
                <>
                    {unsubscribeList !== undefined &&
                    unsubscribeList.length !== 0 ? (
                        <div
                            style={{
                                margin: "0px auto",
                                padding: "20px 10px",
                            }}
                        >
                            <Typography.Title level={2}>
                                Unsubscribe List
                            </Typography.Title>
                            <Divider />
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
