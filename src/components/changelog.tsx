import "./changelog.css";

export type ChangelogRelease = {
  version: string;
  date: string;
  added?: string[];
  changed?: string[];
  removed?: string[];
  fixed?: string[];
};

type ChangelogReleaseSectionProps = {
  items?: string[];
  title: string;
};

function ChangelogReleaseSection({
  items,
  title,
}: ChangelogReleaseSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div class="Changelog_Release_Section">
      <div>{`${title}:`}</div>
      <ul>
        {items.map((item) => (
          <li dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </div>
  );
}

export type ChangelogProps = {
  changelog: ChangelogRelease[];
};

export default function Changelog({ changelog }: ChangelogProps) {
  return (
    <div class="Changelog">
      {changelog.map((release) => (
        <div class="Changelog_Release" key={release.version}>
          <div class="Changelog_Release_Title">
            {release.date
              ? `[${release.version}] — ${release.date}`
              : `[${release.version}]`}
          </div>
          <ChangelogReleaseSection items={release.added} title="Added" />
          <ChangelogReleaseSection items={release.changed} title="Changed" />
          <ChangelogReleaseSection items={release.removed} title="Removed" />
          <ChangelogReleaseSection items={release.fixed} title="Fixed" />
        </div>
      ))}
    </div>
  );
}
