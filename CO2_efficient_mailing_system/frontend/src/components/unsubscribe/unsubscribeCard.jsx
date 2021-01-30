import React from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";

const UnsubscribeCard = ({ item, onUnsubscribe, onDelete }) => {
    return (
        <Card
            title={item.account_name}
            bordered={true}
            actions={[
                <Button>
                    <a
                        href={item.link}
                        target="blank"
                        onClick={() => onUnsubscribe(item.link)}
                    >
                        Unsubscribe
                    </a>
                </Button>,
                <Button onClick={() => onDelete(item.account_email)}>
                    Delete All Emails
                </Button>,
            ]}
            style={{ width: 400, margin: "10px" }}
        >
            <span>
                <b>Email: </b>
                {item.account_email}
            </span>
        </Card>
    );
};

export default UnsubscribeCard;
