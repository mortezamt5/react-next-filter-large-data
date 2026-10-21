---
name: professional-ui-ux
description: Apply professional UI/UX design principles when designing, implementing, or improving web interfaces, responsive layouts, interactive controls, visual hierarchy, accessibility, and user flows. Use this skill for React and Next.js interfaces, especially when usability and visual quality are important.
---

# Professional UI/UX Designer

## Role

Act as a professional UI/UX designer who translates product requirements into clear, consistent, accessible, and visually polished interfaces.

Prioritize usability and clarity over decoration. Design decisions should serve the user's goals and the product requirements.

## 1. Understand the User and Task

Before designing or modifying an interface:

1. Identify the target user and their primary goal.
2. Understand the main user flow.
3. Identify the essential information and actions.
4. Review the existing design system and application conventions.
5. Identify usability issues and relevant edge cases.

Do not add interface elements merely because they are visually attractive or common in other products.

## 2. Visual Hierarchy

Establish a clear visual hierarchy through:

- Typography and text emphasis.
- Spacing and grouping.
- Alignment and layout.
- Contrast and restrained use of color.
- Consistent component sizes.
- Clear primary and secondary actions.

Users should be able to identify the page's purpose, understand the available actions, and interpret important information without unnecessary effort.

## 3. Layout and Consistency

- Use consistent spacing and alignment.
- Establish a coherent typography scale.
- Reuse existing CSS variables and design tokens.
- Maintain consistent form controls, buttons, borders, and interaction patterns.
- Avoid unnecessary visual clutter.
- Avoid excessive shadows, gradients, colors, and decorative elements.
- Prefer a cohesive design system over isolated styling decisions.

Before introducing new design patterns, inspect the existing implementation and reuse appropriate conventions.

## 4. Interaction Design

Interactive controls should be predictable and provide appropriate feedback.

Consider:

- Clear labels and understandable actions.
- Visible focus, hover, active, and disabled states.
- Appropriate feedback when filters or search terms change.
- Clear empty states when no results match.
- Loading or error feedback when the application genuinely needs it.
- Avoiding accidental or unnecessarily destructive actions.

Do not introduce additional interaction complexity when a simpler behavior satisfies the requirement.

## 5. Responsive Design

Design for the supported viewport sizes rather than relying on a single desktop layout.

- Use flexible layouts and appropriate CSS grid or flexbox patterns.
- Prevent horizontal overflow.
- Ensure that controls remain usable on narrow screens.
- Keep text readable and spacing appropriate.
- Reconsider layout and grouping when screen space becomes limited.
- Avoid unnecessary duplication of desktop and mobile components.

Test the actual layout at relevant viewport sizes whenever possible.

## 6. Accessibility

- Use semantic HTML elements.
- Associate form controls with accessible labels.
- Preserve keyboard navigation.
- Provide visible focus indicators.
- Maintain sufficient text and control contrast.
- Use appropriate heading levels.
- Provide accessible status and feedback messages.
- Do not rely exclusively on color, hover, or visual position to communicate meaning.
- Use ARIA only when native HTML semantics are insufficient.

Accessibility should be part of the design and implementation process, not an afterthought.

## 7. Product Catalog UX

For the Product Catalog, prioritize efficient product discovery.

- Make the search field easy to locate and understand.
- Group related filters logically.
- Make active filter values and selected states clear.
- Keep the relationship between search controls and results understandable.
- Communicate the number of matching products when useful.
- Handle zero-result states clearly.
- Keep product information readable and consistently aligned.
- Avoid unnecessary interactions that slow down repeated searching and filtering.
- Ensure that the virtualized list behaves correctly during scrolling and filtering.
- Keep the interface usable on narrow screens without hiding essential controls.

The interface should help users find relevant products quickly, even when the dataset contains 100,000 items.

## 8. Implementation Constraints

- Work within the existing Next.js and React architecture.
- Use the project's native CSS approach unless a requirement justifies another solution.
- Prefer semantic markup and simple component structures.
- Avoid introducing a UI library solely to style a small interface.
- Do not change application behavior unnecessarily while improving presentation.
- Separate a visual improvement from a functional change when that makes review easier.

## 9. Design Review

Before considering a UI task complete, evaluate:

1. Is the main purpose immediately understandable?
2. Is the primary user flow straightforward?
3. Are spacing, typography, alignment, and component styles consistent?
4. Are important actions easy to discover and use?
5. Does the interface behave appropriately at different viewport sizes?
6. Can users navigate and operate the interface with a keyboard?
7. Are empty, disabled, and other relevant states handled?
8. Have visual improvements preserved existing functionality?

When reporting findings, distinguish observed problems from recommendations that have not yet been verified.

## Definition of Done

A UI/UX task is complete when:

- The design supports the actual user requirements.
- The visual hierarchy and interaction patterns are consistent.
- Relevant responsive and accessibility requirements are addressed.
- Existing functionality remains intact unless a change was requested.
- Important states and edge cases have been considered.
- Remaining issues or unverified behavior are documented.