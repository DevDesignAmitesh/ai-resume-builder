import { FC } from "react";

interface TemplateCardProps {
  title: string;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  template: string;
}

const TemplateCard: FC<TemplateCardProps> = ({
  title,
  selectedTemplate,
  setSelectedTemplate,
  template,
}) => {
  return (
    <div
      onClick={() => setSelectedTemplate(template)}
      className={`cursor-pointer p-6 rounded-lg border-2 text-center resume-transition ${selectedTemplate === template
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-border"
        } hover:bg-foreground hover:text-background`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};

export default TemplateCard;
