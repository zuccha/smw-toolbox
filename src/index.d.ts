import React from "preact/compat";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      dim: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
