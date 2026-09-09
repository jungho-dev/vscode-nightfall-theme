# Urban-Theme

Urban-Theme is a VS Code color theme built on the GitHub Dark Dimmed palette and tuned to match the syntax coloring of
the `github.com` soft-dark code view. It replaces per-user `settings.json` color overrides with a single distributable
theme, and adds key/value separation, in-string bracket emphasis, and nested-quote emphasis that the base theme does
not provide.

## Features

- Web-aligned palette: identifiers and strings default to `#D1D7E0`, property access and operators to blue, functions to
  purple, types to orange, keywords to red, numbers to green.
- Key/value distinction: JSON keys, JS/TS object-literal keys, and CSS property names render blue so they no longer
  match their values.
- In-string brackets: `()`, `[]`, and `{}` characters inside string literals render yellow through an injection grammar.
  This also applies inside HTML `<script>` and `<style>` blocks and inside template `${...}` expressions.
- Nested quotes: a quote nested inside a string literal renders tan like a template literal, through an HTML injection
  grammar. A `'...'` inside a double-quoted value, or `"..."` inside a single-quoted value, is covered. This includes
  Thymeleaf attributes such as `th:id="${'formData'}"` and `th:value="${MODEL['notice_title']}"`.
- Mixed-language templates: `html`, `css`, `scss`, `less`, `sql`, `json`, and `sh`/`bash`/`shell`/`zsh` tagged templates
  in JS/TS are parsed with the real language grammar, so embedded code keeps the colors it has in its own file. A
  comment hint such as ``/* html */`...` `` works the same way.
- Semantic highlighting disabled: colors come from TextMate rules only, matching the web renderer.
- 94 token color rules: 49 inherited from GitHub Dark Dimmed plus 45 project rules.

## Palette

| Role | Color | Applies to |
| --- | --- | --- |
| Default text | `#D1D7E0` | identifiers, parameters, strings, CSS values |
| Blue | `#6CB6FF` | property access, operators, JSON keys, object-literal keys, CSS property names |
| Purple | `#CBA6F7` | function names and calls |
| Orange | `#F69D50` | types, classes, selectors, attribute names |
| Red | `#F47067` | keywords, storage, markup tags, at-rules |
| Green | `#63EC63` | numeric literals |
| Comment green | `#7CA964` | comments and comment punctuation |
| Tan | `#F4D4AE` | template literals, nested quotes inside strings |
| Yellow | `#F2CC60` | brackets inside string literals |

## Usage

| Step | Action |
| --- | --- |
| 1 | Install the extension. |
| 2 | Run `Preferences: Color Theme`. |
| 3 | Select **Urban Theme**. |

Remove any `editor.tokenColorCustomizations`, `editor.semanticTokenColorCustomizations`, and
`workbench.colorCustomizations` entries from `settings.json`; this theme owns them.

Or run the `Urban Theme: Apply and Clean Conflicts` command from the Command Palette to select the theme and remove
those user-settings entries in one step.

## Base

Token colors extend the Dark Dimmed variant of `github.github-vscode-theme`. Workbench colors are unchanged except
`editor.foreground`, which is raised to `#D1D7E0`.
