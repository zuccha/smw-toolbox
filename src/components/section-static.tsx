import { ReactNode } from "preact/compat";
import "./section.css";
import Section from "./section";

export type SectionStaticProps = {
  children: ReactNode;
  label: string;
};

export default function SectionStatic({ children, label }: SectionStaticProps) {
  return (
    <Section header={<div class="Section_Header">{label}</div>}>
      {children}
    </Section>
  );
}
