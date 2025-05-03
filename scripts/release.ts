import { Command } from 'commander';
const releaseStandardVersion = require('standard-version');

const program = new Command();

program
  .option('-n, --name [name]', 'Package name', '')
  .option('-i, --identifier [identifier]', 'Release identifier', '')
  .parse(process.argv);

/**
 * Release script
 *  1. After prerelease script has run to bump versions, continue with other standard-version tasks
 *  2. Commits staged changes
 *  3. Tag with custom pattern
 */

const { identifier, name } = program.opts();

releaseStandardVersion({
  commitAll: true,
  prerelease: identifier ? identifier : undefined,
  scripts: {
    postbump: 'npm run release:version:sync',
    precommit: `git add package.json projects/${name}/package.json`,
  },
}).catch((err: Error) => {
  console.error(`standard-version failed with message: ${err.message}`);
});
