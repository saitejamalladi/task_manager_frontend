import React from "react";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";

const Card = styled(MuiCard)`
  box-shadow: 0px 3px 6px #0000000a;
  border-radius: 12px;
`;
const CardContent = styled(MuiCardContent)`
  position: relative;
  min-height: 170px;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const CardHeader = styled(Typography)`
  color: #537178;
  font-weight: bold;
`;

const CardComponent = ({ children, header }) => {
  return (
    <Card>
      <CardContent>
        <CardHeader variant={"h4"}>{header}</CardHeader>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
