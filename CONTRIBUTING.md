# How to: Contribution

To ensure a smooth contribution process, please follow the guidelines outlined below:

## Project and Kanban Board

We use GitHub Projects to manage our work. The project board is organized into columns such as "To Do," "In Progress," and "Done." When you start working on an issue, please move it to the "In Progress" column. Once you have completed the work, move it to the "Done" column. This helps us keep track of the progress and ensures that everyone is aware of the current status of each task.

## Issues

To keep track of the work being done, needs to be done, and is done, we use GitHub Issues. If you find a bug, have a feature request, or want to discuss something related to the project, please create an issue. When creating an issue, please provide as much detail as possible, including steps to reproduce the problem (if applicable), expected behavior, and any relevant screenshots or logs.
Following is a checklist to create an issue:

- 1. Clear and descriptive title (e.g., "Bug: Application crashes when clicking the submit button")
- 2. Detailed description of the issue or feature request
- 3. Steps to reproduce (if applicable)
- 4. Expected behavior
- 5. Actual behavior (if applicable)
- 6. Screenshots or logs (if applicable)

After creating an issue, ensure it is added to the project board in the appropriate column. This helps us prioritize and manage our work effectively.

## Branches

When staring work on an issue, create a branch via the issue panel in GitHub. This will automatically link the branch to the issue, making it easier to track the progress and associate the changes with the corresponding issue. The branch name should follow the pattern:
`##-<issue-title>` where `##` is the issue number and `<issue-title>` is a brief description of the issue (e.g., `123-fix-login-bug`). If possible use the same branch name as the issue title to maintain consistency and clarity. If issue name is too long, you can shorten it while still keeping it descriptive.

## Pull Requests

When you have completed your work on a branch, please create a pull request (PR) to merge your changes into the main branch. The title of the PR should be the same as the issue or branch title with a prefix of `(#XX)` where `XX` is the issue number (e.g., `#123 Fix login bug`).

A PR template is provided to ensure that all necessary information is included. Please fill out the template completely, providing a description of the changes you have made and any relevant screenshots or logs. This will help reviewers understand your changes and provide constructive feedback.

The PR template includes the following sections:

- 1. **Summary**: Description of the changes made. Be clear and concise, explaining the purpose of the changes and how they address the issue or implement the feature.
- 2. **Features Added** (if applicable): List of new features implemented.
- 3. **Screenshots** (if UI): Visual representation of the changes
- 4. **Changes** (if applicable): List of changes made to existing features
- 5. **Notice**: Any important information or warnings related to the PR
  - A checklist if `npm install` needs to be run after merging the PR and in which directories (e.g., `client`, `server`, `root`)
- 6. **Checklist**: A checklist to ensure that all necessary steps have been completed before merging the PR. This may include items such as:
  - [ ] I swear I have rebased - Make sure there are no merge conflicts and the branch is up to date with the main branch
  - [ ] I swear I have run `npm run lint` - Ensure that the code is properly formatted and adheres to the project's coding standards
  - [ ] I swear I have run `npm run build` - Ensure that the code compiles successfully and there are no build errors
  - [ ] I swear I have tested my solution, it works like a charm - Verify that the changes work as intended and do not introduce any new issues

After creating the PR, it will be reviewed by other contributors. Please be open to feedback and make any necessary changes based on the reviewers' comments. Once the PR is approved, you can merge it into the main branch.

## TLDR;

- Use GitHub Projects to manage work and move issues to the appropriate columns
- Create detailed issues with clear titles and descriptions
- Create branches linked to issues with descriptive names
- Use the PR template when creating pull requests and provide all necessary information
- Be open to feedback during the review process and make necessary changes based on reviewers' comments
- Ensure that all checklist items are completed before merging the PR.

### How to: Start work on an issue

#### If you create a new issue:

1. Create issue with a clear and descriptive title and detailed description.
2. Add the issue to the project board.

#### Start work:

1. Click on "Create a branch" under Development in the right sidebar.
2. Branch name will be automatically generated. Make sure it follows the pattern `##-<issue-title>`.
3. Make sure to commit your changes regularly and push them to the remote repository.
4. When complete, create a pull request according to template.
