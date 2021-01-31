import React from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";

const UnsubscribeCard = ({ item, onUnsubscribe, onDelete }) => {
    return (
        <Card
            title={item.account_name}
            bordered={false}
            actions={[
                <Button className="ant-action-button">
                    <a
                        href={item.link}
                        target="blank"
                        onClick={() => onUnsubscribe(item.link)}
                    >
                        Unsubscribe
                    </a>
                </Button>,
                <Button
                    onClick={() => onDelete(item.account_email)}
                    className="ant-action-button"
                >
                    Delete All Emails
                </Button>,
            ]}
            headStyle={{ color: "#fff" }}
            className="unsubscribe__card"
        >
            <span>
                <b>Email: </b>
                {item.account_email}
            </span>
        </Card>
    );
};

export default UnsubscribeCard;
