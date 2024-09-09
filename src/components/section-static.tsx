import { ReactNode } from "preact/compat";
import "./section.css";
import Section from "./section";
import IconButton, { IconButtonProps } from "./icon-button";

export type SectionStaticProps = {
  actions?: {
    icon: IconButtonProps["Icon"];
    onClick: IconButtonProps["onClick"];
    tooltip: IconButtonProps["tooltip"];
  }[];
  children: ReactNode;
  label: string;
};

export default function SectionStatic({
  actions,
  children,
  label,
}: SectionStaticProps) {
  return (
    <Section
      header={
        <div class="Section_Header">
          <span>{label}</span>

          <div class="Section_Header_Actions App_SectionCluster">
            {actions?.map((action) => (
              <IconButton
                Icon={action.icon}
                onClick={action.onClick}
                tooltip={action.tooltip}
              />
            ))}
          </div>
        </div>
      }
    >
      {children}
    </Section>
  );
}
