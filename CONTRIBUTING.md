# How to: Contribution

To ensure a smooth contribution process, please follow the guidelines outlined below:

## Create an issue

To keep track of our work we use GitHub Issues. If you find a bug, have a feature request, or want to discuss something related to the project, please create an issue. When creating an issue, provide as much detail as possible, including steps to reproduce the problem (if applicable), expected behavior, and any relevant screenshots or logs. When you create an issue, it is automatically added to the project board.

## Create a branch and start working

When starting work on an issue, create a branch via the issue panel in GitHub. The name of the created branch will follow the pattern:
`##-<issue-title>` where `##` is the issue number and `<issue-title>` is a brief description of the issue (e.g., `123-fix-login-bug`). If the issue name is too long, you can shorten it to a more concise version (e.g., `123-fix-login-bug-when-using-email` -> `123-fix-login`).

### Project and kanban board

We use GitHub Projects to manage our work. When you start working on an issue, assign yourself to the issue and move it to the "In Progress" column. Preferrably, you choose an issue from the "Todo"-column, as these are issues marked as ready for development.

## Pull Requests

When you have completed your work on a branch, create a pull request (PR) to merge your changes into the main branch. The title of the PR should be the same as the issue or branch title with a prefix of `#XX` where `XX` is the issue number (e.g., `#123 Fix login bug`).

After creating the PR, assign one or more reviewers to look throguh your suggested changes. Once the PR is approved, you can merge it into the main branch.

### Resolve merge conflicts

If there are merge conflicts, you will need to resolve them before merging your PR. Resolve by rebasing your branch with the main branch and fixing the conflicts manually. After resolving the conflicts, push the changes to your branch and update the PR.

Use **Squash and merge** option when merging your PR to keep the commit history clean.

## Collaboration on branches

The person who creates and is assigned the issue, is responsible for making the primary changes to that branch. While collaboration and feedback from reviewers are encouraged, the branch owner should incorporate suggestions and maintain the direction of the work. Provide constructive feedback through open discussions if you have suggestions.

If you have an idea for a different approach to solving the issue, you can branch from the issue branch and propose your idea. However, the final decision on which approach to take will be made by the branch owner in collaboration with the reviewers.
