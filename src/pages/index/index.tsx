import React, { FC } from "react";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.scss";

const Index: FC<{}> = () => {
  let button = (
    <Button type="primary">
      <LoadingOutlined />
      Index
    </Button>
  );
  return (
    <div className="index-page">
      index page
      <br />
      {button}
    </div>
  );
};

export default Index;
