import { libraryPackage, PackageInfo, updateLibraryPackage } from './lib/package';

const projectPackage = require('../package.json');

async function syncLibraryVersion(): Promise<string> {
  try {
    const libraryPackageInfo: PackageInfo = await libraryPackage();
    libraryPackageInfo.version = projectPackage.version;
    await updateLibraryPackage(libraryPackageInfo);
    return libraryPackageInfo.version;
  } catch (err) {
    return Promise.reject(err);
  }
}

syncLibraryVersion()
  .then((version) => console.log(`Synced library version to ${version}`))
  .catch((err) => console.error(err));
