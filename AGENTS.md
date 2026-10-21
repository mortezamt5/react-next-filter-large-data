# Project Instructions

## Project Context

This project is a product catalog built with Next.js, React, TypeScript, and native CSS.

The application supports searching and filtering a locally generated dataset of 100,000 products. Product results are rendered using virtualization to avoid creating unnecessary DOM elements.

Before making changes, inspect the existing codebase, `package.json`, and relevant source files. Treat the actual implementation and project configuration as the source of truth.

## Core Engineering Principles

- Keep the implementation simple, maintainable, and aligned with the task requirements.
- Prefer focused changes over broad refactoring.
- Preserve the existing architecture unless a change is justified by a concrete requirement.
- Avoid introducing dependencies when the existing stack can solve the problem effectively.
- Follow the existing naming conventions, directory structure, and coding style.
- Use TypeScript effectively and preserve strict type safety.
- Separate UI components, domain logic, and data-generation responsibilities.
- Do not introduce abstractions that add complexity without providing meaningful value.

## Next.js and React

- Follow the existing Next.js App Router architecture.
- Use Server Components by default where appropriate.
- Add `"use client"` only when client-side interactivity or browser APIs require it.
- Keep client-side state as local as practical.
- Avoid unnecessary effects, duplicated state, and derived state that can be calculated directly.
- Provide stable keys for rendered collections.
- Avoid unnecessary re-renders and expensive calculations.
- Follow React and Next.js conventions for rendering, data flow, and component composition.

## Product Catalog Rules

- Preserve the separation between product types, data generation, filtering logic, and UI components.
- Keep filtering logic in the domain layer rather than embedding business rules in presentation components.
- Keep the filtering function pure when possible.
- Preserve case-insensitive search and the existing combined-filter behavior.
- Keep product IDs unique and stable within a generated dataset.
- Avoid regenerating the product dataset on every render.
- Preserve the existing client-side data-generation strategy unless a requirement justifies changing it.
- Preserve list virtualization using `@tanstack/react-virtual` unless there is a demonstrated reason to change it.
- Remember that virtualization reduces rendering and DOM work; it does not reduce the cost of scanning the dataset during filtering.

## UI and Styling

- Use the project's existing native CSS approach.
- Reuse existing design tokens and CSS patterns where appropriate.
- Maintain responsive behavior across supported screen sizes.
- Prefer semantic HTML and accessible interactive controls.
- Preserve existing functionality while improving presentation.
- Avoid adding a styling framework or component library without a clear justification.

## Testing and Validation

- Review relevant tests before changing behavior.
- Add or update tests when implementing or modifying domain logic.
- Prefer focused tests for filtering rules, combined filters, and important edge cases.
- Inspect `package.json` before selecting validation commands.
- Run applicable checks, such as linting, type checking, tests, and production builds, when practical.
- Investigate failures instead of silently ignoring them.
- Do not claim that a test, lint check, or build passed unless it was actually executed and its result was observed.
- Do not claim complete validation when only a subset of checks has been performed.

## Performance and Benchmarking

- Base optimization decisions on measurable costs and actual requirements.
- Avoid adding debouncing, deferred updates, memoization, or other optimization mechanisms without a concrete justification.
- Distinguish pure filtering performance from React rendering and browser performance.
- Do not invent benchmark results or generalize measurements beyond the environment in which they were collected.
- Preserve the reproducibility of existing benchmark procedures when modifying performance-related code.

## Scope and Safety

- Do not modify unrelated files.
- Do not remove existing functionality unless explicitly required.
- Do not introduce new dependencies without explaining their purpose.
- Never expose secrets, credentials, or sensitive environment configuration.
- Ask for clarification only when an ambiguity materially affects the implementation and cannot be resolved from the existing project.

## Required Workflow

For each non-trivial task:

1. Analyze the request and identify the acceptance criteria.
2. Inspect the relevant code and propose a focused implementation approach.
3. Implement the smallest maintainable change that meets the requirements.
4. Review the resulting diff for correctness and unintended changes.
5. Run the relevant validation commands.
6. Summarize the implementation, important decisions, validation results, and remaining limitations.

For very small changes, use a proportionate version of this workflow rather than introducing unnecessary process.

## Final Response

After completing a task, report:

- What changed and why.
- Important technical decisions.
- Tests and validation commands actually executed, with their observed results.
- Known limitations or behavior that remains unverified.