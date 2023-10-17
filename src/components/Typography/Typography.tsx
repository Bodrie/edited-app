import React, { ReactNode, CSSProperties, createElement } from "react";

type TagVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TypographyProps {
  tag?: TagVariants;
  children: ReactNode;
}

const Typography = ({
  children,
  tag = "p",
  ...props
}: TypographyProps & CSSProperties) => {
  return createElement(tag, props, children);
};

export default Typography;
