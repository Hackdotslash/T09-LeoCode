import React from "react";
import { Avatar, Card, Row } from "antd";
import _ from "lodash";
const { Meta } = Card;

const CardLoading = ({ number }) => {
    return (
        <>
            <Row justify="center">
                {_.times(number, (i) => (
                    <Card
                        key={i}
                        bordered={false}
                        style={{
                            width: 400,
                            backgroundColor: "#202020",
                            marginTop: 16,
                            marginRight: 16,
                        }}
                        loading={true}
                    >
                        <Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                ))}
            </Row>
        </>
    );
};

export default CardLoading;
