const ResumeDisplay = ({ resume }: { resume: any }) => {
  return (
    <div className="resume-transition p-8 glass rounded-xl">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-foreground">{resume?.content[0]?.name}</h2>
        <p className="text-xl text-muted-foreground mb-4">{resume?.content[0]?.title}</p>
        <div className="text-sm text-muted-foreground">
          <p>{resume?.content[0]?.contact[0]?.email}</p>
          <p>{resume?.content[0]?.contact[0]?.phone}</p>
        </div>
      </header>

      {/* About Myself */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-foreground">About Myself</h3>
        <p className="text-muted-foreground">
          {resume?.content[0]?.summary}
        </p>
      </section>

      {/* LinkedIn & GitHub */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-foreground">Profiles</h3>
        <p className="text-muted-foreground">
          <a href={resume?.content[0]?.contact[0]?.linkedin} className="text-blue-500" target="_blank">
            LinkedIn
          </a> | {" "}
          <a href={resume?.content[0]?.contact[0]?.github} className="text-blue-500" target="_blank">
            GitHub
          </a>
        </p>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resume?.content[0]?.skills?.map((skill: any, index: any) => (
            <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Projects</h3>
        {resume?.content[0]?.projects?.map((prj: any) => <div key={prj.id} className="mb-6">
          <h4 className="font-medium text-foreground">{prj.name}</h4>
          <p className="text-muted-foreground">
            {prj.description}
          </p>
          <div className="flex flex-wrap mt-2 gap-2">
            {prj?.tech?.map((tech: any, i: any) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>)}
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Education</h3>
        {resume?.content[0]?.education?.map((edu: any) => <div key={edu.id} className="mb-4">
          <div className="flex justify-between">
            <div>
              <h4 className="font-medium text-foreground">{edu.school}</h4>
              <p className="text-muted-foreground">{edu.degree}</p>
            </div>
            <span className="text-sm text-muted-foreground">{edu.duration}</span>
          </div>
        </div>)}

      </section>
    </div>
  );
};

export default ResumeDisplay;
