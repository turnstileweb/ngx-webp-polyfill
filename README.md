#ngx-webp-polyfill

A Webp Polyfill for Angular, using `webp-hero`.

## Installation

Install with the following
`yarn add ngx-webp-polyfill`

## Contributing

Fork and send use a pull request. Consider discussing the change with us before committing the code.

### Development

The library follows semantic versioning principles, which is automated using conventional commit messages. To commit:

`yarn commit`

### Release
1. Generate new version and tag with `yarn release && git push --follow-tags master`
2. Builds and package the library `yarn package:library`
3. Publish the library to NPM `cd dist/ngx-webp-polyfill && npm publish`
