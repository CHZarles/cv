import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

type WorkExperience = (typeof RESUME_DATA)["work"][number];
type WorkBadges = readonly string[];

interface BadgeListProps {
  className?: string;
  badges: WorkBadges;
}

function BadgeList({ className, badges }: BadgeListProps) {
  if (badges.length === 0) return null;

  return (
    <ul
      className={cn("inline-flex list-none gap-x-1 p-0", className)}
      aria-label="Technologies used"
    >
      {badges.map((badge) => (
        <li key={badge}>
          <Badge
            variant="secondary"
            className="align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
          >
            {badge}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface WorkPeriodProps {
  start: WorkExperience["start"];
  end?: WorkExperience["end"];
}

/**
 * Displays the work period in a consistent format
 */
function WorkPeriod({ start, end }: WorkPeriodProps) {
  return (
    <div
      className="text-sm tabular-nums text-gray-500"
      title={`Employment period: ${start} to ${end ?? "Present"}`}
    >
      {start} - {end ?? "Present"}
    </div>
  );
}

interface CompanyLinkProps {
  company: WorkExperience["company"];
  link: WorkExperience["link"];
}

/**
 * Renders company name with optional link
 */
function CompanyLink({ company, link }: CompanyLinkProps) {
  return (
    <a
      className="hover:underline"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${company} company website`}
    >
      {company}
    </a>
  );
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

interface WorkExperienceItemProps {
  work: WorkExperience;
}

/**
 * Individual work experience card component
 * Handles responsive layout for badges (mobile/desktop)
 */
function WorkExperienceItem({ work }: WorkExperienceItemProps) {
  const {
    company,
    employmentType,
    link,
    badges,
    title,
    start,
    end,
    description,
    highlights,
  } = work;

  return (
    <Card className="border-slate-200 p-4 shadow-sm print:border-none print:p-0 print:shadow-none md:p-5">
      <CardHeader className="gap-y-2 print:space-y-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-x-3">
          <h3 className="inline-flex items-center gap-x-2 font-semibold leading-none">
            <CompanyLink company={company} link={link} />
            {employmentType && (
              <Badge
                variant="secondary"
                className="px-1.5 py-0 text-[10px] font-medium text-muted-foreground"
              >
                {employmentType}
              </Badge>
            )}
          </h3>
          <WorkPeriod start={start} end={end} />
        </div>

        <h4 className="text-sm font-semibold leading-snug text-slate-700 dark:text-slate-200">
          {title}
        </h4>
        <BadgeList className="flex-wrap gap-1" badges={badges} />
      </CardHeader>

      <CardContent className="font-sans">
        <div className="mt-4 text-[13px] leading-6 text-foreground/75 print:mt-1 print:text-[10px] print:leading-normal md:leading-7">
          {description && (
            <p className="rounded-md border-l-2 border-slate-300 bg-slate-50 px-3 py-2 text-foreground/65 print:border-none print:bg-transparent print:p-0">
              <HighlightLabel text={description} />
            </p>
          )}
          {highlights && highlights.length > 0 && (
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-slate-400 print:mt-1 print:space-y-0 md:space-y-3">
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

interface WorkExperienceProps {
  work: (typeof RESUME_DATA)["work"];
}

/**
 * Main work experience section component
 * Renders a list of work experiences in chronological order
 */
export function WorkExperience({ work }: WorkExperienceProps) {
  return (
    <Section>
      <h2
        className="border-b border-slate-200 pb-2 text-xl font-bold tracking-tight"
        id="work-experience"
      >
        工作经历
      </h2>
      <div
        className="space-y-5 print:space-y-1"
        role="feed"
        aria-labelledby="work-experience"
      >
        {work.map((item) => (
          <article key={`${item.company}-${item.title}-${item.start}`}>
            <WorkExperienceItem work={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
