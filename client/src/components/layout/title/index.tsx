import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

import { quinky } from "../../../assets"

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple style={{ marginTop: "35px", marginBottom: "10px" }}>
      <Link to="/">
        {collapsed ? (
          <img src={quinky} alt="Refine" width="50px" />
        ) : (
          <img src={quinky} alt="Refine" width="90px" />
        )}
      </Link>
    </Button>
  );
};
