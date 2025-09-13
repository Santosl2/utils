## My utils project

This project contains reusable functions that I frequently use in my daily development workflow. The goal is to streamline development by centralizing useful methods in one place.

### Publishing new version
To publish a new version of the package, follow these steps:
1. Make sure you have committed all your changes and are on the main branch.
2. Update the version number in `package.json` according to semantic versioning (major, minor, patch).
3. Run the following command to publish the package to npm:
   ```bash
   npm publish --access public
   ```
4. Verify that the package has been published successfully by checking the npm registry.

To publish in GitHub Packages, add the following to your `.npmrc` file:
```bash
@santosl2:registry=https://npm.pkg.github.com/
```

### Docs

[Publishing and installing a package with GitHub Actions
](https://docs.github.com/en/packages/managing-github-packages-using-github-actions-workflows/publishing-and-installing-a-package-with-github-actions)

[Automatic token authentication
](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)

[Workflow syntax for GitHub Actions - Permissions](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions)
