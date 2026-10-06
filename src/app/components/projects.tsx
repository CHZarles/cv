import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";

type ProjectTags = readonly string[];

interface ProjectLinkProps {
  title: string;
  link?: string;
}

/**
 * Renders project title with optional link and status indicator
 */
function ProjectLink({ title, link }: ProjectLinkProps) {
  if (!link) {
    return <span>{title}</span>;
  }

  const displayUrl = link
    .replace("https://", "")
    .replace("www.", "")
    .replace("/", "");

  return (
    <div className="space-y-1">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:underline"
        aria-label={`${title} project (opens in new tab)`}
      >
        {title}
        <span
          className="size-1 rounded-full bg-green-500"
          title="Active project indicator"
          aria-hidden="true"
        />
      </a>
      <a
        className="block font-mono text-xs font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`Live: ${displayUrl}`}
      </a>
    </div>
  );
}

interface ProjectTagsProps {
  tags: ProjectTags;
}

/**
 * Renders a list of technology tags used in the project
 */
function ProjectTags({ tags }: ProjectTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul
      className="mt-2 flex list-none flex-wrap gap-1 p-0"
      aria-label="Technologies used"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Badge
            className="px-1 py-0 text-[10px] print:py-0.5 print:text-[8px] print:leading-tight"
            variant="secondary"
          >
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  highlights?: readonly string[];
  tags: ProjectTags;
  link?: string;
}

function HighlightLabel({ text }: { text: string }) {
  const separatorIndex = text.search(/[：:]/);

  if (separatorIndex === -1) {
    return text;
  }

  const label = text.slice(0, separatorIndex + 1);
  const content = text.slice(separatorIndex + 1);

  return (
    <>
      <strong className="font-semibold text-foreground">{label}</strong>
      {content}
    </>
  );
}

/**
 * Card component displaying project information
 */
function ProjectCard({
  title,
  description,
  highlights,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <Card className="border-none py-1 print:py-0">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base">
            <ProjectLink title={title} link={link} />
          </CardTitle>
          <ProjectTags tags={tags} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-xs text-foreground/80 print:mt-1 print:text-[10px] text-pretty">
          <HighlightLabel text={description} />
          {highlights && highlights.length > 0 && (
            <ul className="list-inside list-disc">
              {highlights.map((highlight) => (
                <li key={highlight}>
                  <HighlightLabel text={highlight} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ProjectsProps {
  projects: (typeof RESUME_DATA)["projects"];
}

/**
 * Section component displaying all side projects
 */
export function Projects({ projects }: ProjectsProps) {
  return (
    <Section className="scroll-mb-16">
      <h2 className="text-xl font-bold" id="side-projects">
        个人项目
      </h2>
      <div
        className="space-y-4 print:space-y-1"
        role="feed"
        aria-labelledby="side-projects"
      >
        {projects.map((project) => (
          <article key={project.title}>
            <ProjectCard
              title={project.title}
              description={project.description}
              highlights={project.highlights}
              tags={project.techStack}
              link={project.link?.href}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
