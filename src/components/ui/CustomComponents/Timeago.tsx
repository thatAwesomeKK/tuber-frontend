"use client";
import React from "react";
import TimeAgo from "react-timeago";

interface Props {
  createdAt: Date | string;
}

const Timeago = ({ createdAt }: Props) => {
  return <TimeAgo date={createdAt} />;
};

export default Timeago;
