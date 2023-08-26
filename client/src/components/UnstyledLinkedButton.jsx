import { Button } from "@mui/material";

import UnstyledLink from "./UnstyledLink";

export default function UnstyledLinkedButton({
  linkProps,
  buttonProps,
  children,
}) {
  return (
    <UnstyledLink {...linkProps}>
      <Button {...buttonProps}>{children}</Button>
    </UnstyledLink>
  );
}
