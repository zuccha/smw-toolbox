import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

//------------------------------------------------------------------------------
// Types
//------------------------------------------------------------------------------

const ChangelogSchema = z.array(
  z.object({
    version: z.string(),
    date: z.string(),
    added: z.array(z.string()).optional(),
    changed: z.array(z.string()).optional(),
    removed: z.array(z.string()).optional(),
    fixed: z.array(z.string()).optional(),
  }),
);

type Changelog = z.infer<typeof ChangelogSchema>;

//------------------------------------------------------------------------------
// Utilities
//------------------------------------------------------------------------------

const htmlToMd = (html: string) =>
  html
    .replace(/<b>/g, "**")
    .replace(/<\/b>/g, "**")
    .replace(/<i>/g, "_")
    .replace(/<\/i>/g, "_")
    .replace(/<kbd>/g, "`")
    .replace(/<\/kbd>/g, "`");

//------------------------------------------------------------------------------
// MD Templates
//------------------------------------------------------------------------------

const mdEntryTemplate = (entry: string) => `\
- ${htmlToMd(entry)}`;

const mdEntriesTemplate = (title: string, entries: string[]) => `\
### ${title}

${entries.map(mdEntryTemplate).join("\n")}`;

const mdReleaseTemplate = (release: Changelog[0]) => `\
## [${release.version}] - ${release.date}

${[
  release.added ? mdEntriesTemplate("Added", release.added) : "",
  release.changed ? mdEntriesTemplate("Changed", release.changed) : "",
  release.fixed ? mdEntriesTemplate("Fixed", release.fixed) : "",
  release.removed ? mdEntriesTemplate("Removed", release.removed) : "",
]
  .filter(Boolean)
  .join("\n\n")}`;

const mdChangelogTemplate = (changelog: Changelog) => `\
# Changelog

${changelog.map(mdReleaseTemplate).join("\n\n")}
`;

//------------------------------------------------------------------------------
// TS Templates
//------------------------------------------------------------------------------

const tsEntryTemplate = (entry: string) => `\
      "${entry}",`;

const tsEntriesTemplate = (title: string, entries: string[]) => `\
    ${title}: [
${entries.map(tsEntryTemplate).join("\n")}
    ],`;

const tsReleaseTemplate = (release: Changelog[0]) => `\
  {
    version: "${release.version}",
    date: "${release.date}",
${[
  release.added ? tsEntriesTemplate("added", release.added) : "",
  release.changed ? tsEntriesTemplate("changed", release.changed) : "",
  release.fixed ? tsEntriesTemplate("fixed", release.fixed) : "",
  release.removed ? tsEntriesTemplate("removed", release.removed) : "",
]
  .filter(Boolean)
  .join("\n")}
  },`;

const tsChangelogTemplate = (changelog: Changelog) => `\
import { ChangelogRelease } from "../../components/changelog";

const changelog: ChangelogRelease[] = [
${changelog.map(tsReleaseTemplate).join("\n")}
];

export default changelog;
`;

//------------------------------------------------------------------------------
// Generate
//------------------------------------------------------------------------------

const changelogJsonString = await Deno.readTextFile("./assets/changelog.json");
const changelogJson = JSON.parse(changelogJsonString);
const changelog = ChangelogSchema.parse(changelogJson);

const filenameMd = "./CHANGELOG.md";
const filenameTs = "./src/modules/app-info/changelog.ts";

await Deno.writeTextFile(filenameMd, mdChangelogTemplate(changelog));
await Deno.writeTextFile(filenameTs, tsChangelogTemplate(changelog));
