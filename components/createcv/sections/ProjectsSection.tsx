import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { ReactSortable } from "react-sortablejs";
import ProjectInput from "../inputs/ProjectInput";
import Section from "../Section";

const ProjectsSection = () => {
  const { cvObject, deleteListItem, addNewSection, changeListOrder } = useCV();
  const { t } = useTranslation(["create-cv", "common"]);

  const deletePtoject = (id: string) => {
    deleteListItem('projects', id)
  };



  return (
    <Section
      deletable
      objectKey="projects"
      title={t("projects")}
      onClick={() => addNewSection("projects")}
    >
      <ReactSortable
        className="flex flex-col [&>*:last-child]:border-none"
        list={cvObject.projects}
        setList={(v) => {
          changeListOrder('projects', v)
        }}
        handle=".handle"
      >
        {cvObject.projects &&
          cvObject.projects.map((el) => (
            <ProjectInput
              {...el}
              edit={el.edit || false}
              onDelete={() => deletePtoject(el.id)}
              key={el.id}
            ></ProjectInput>
          ))}
      </ReactSortable>
    </Section>
  );
};

export default ProjectsSection;
