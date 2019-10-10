import { join } from 'path';
import { readFile, writeFile } from 'fs';

const PACKAGE_NAME = 'ngx-webp-polyfill';

export interface PackageInfo {
  version: string;
}

export function libraryPackagePath(): string {
  return join(process.cwd(), 'projects', PACKAGE_NAME, 'package.json');
}

export function libraryPackage(): Promise<PackageInfo> {
  return new Promise((resolve, reject) => {
    readFile(libraryPackagePath(), (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        return reject(err);
      }
      const packageInfo: PackageInfo = JSON.parse(data.toString());
      return resolve({ ...packageInfo, version: packageInfo.version });
    });
  });
}

export function updateLibraryPackage(libraryPackageInfo: PackageInfo): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(
      libraryPackagePath(),
      JSON.stringify(libraryPackageInfo, null, 2),
      (err: NodeJS.ErrnoException) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      },
    );
  });
}
