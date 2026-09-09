# urban-theme Architecture

## Runtime Surface

```text
package.json contributes.themes
  -> themes/urban-color-theme.json
  -> VS Code color registry (workbench colors)
  -> VS Code TextMate token color registry (tokenColors)

package.json contributes.grammars (injectTo)
  -> syntaxes/bracket-in-string.tmLanguage.json
  -> injectionSelector L:string
  -> scope punctuation.bracket.in-string
  -> tokenColors rule -> #F2CC60

package.json contributes.commands + main
  -> out/extension.js (CommonJS, compiled from src/extension.ts)
  -> command urban-theme.apply: set workbench.colorTheme + clear conflicting *Customizations
  -> activationEvents onCommand:urban-theme.apply (lazy; idle startup unaffected)
```

The theme and grammar contributions are fully declarative; VS Code reads them directly from `package.json` with no
code. One optional command, `urban-theme.apply`, adds an activation entry (`main` -> `out/extension.js`,
`activationEvents` -> `onCommand:urban-theme.apply`). Activation is lazy: the entry runs only when the command is
invoked, so idle startup is unaffected. Almost all `src/` TypeScript is a build-time generator, never shipped; the one
exception is `src/extension.ts`, compiled to CommonJS through `tsconfig.extension.json` and shipped as `out/extension.js`
via a `.vscodeignore` exception.

## Source Map

```text
src/
|-- build.ts                 generator entry: assemble, validate, write (or --check)
|-- extension.ts             runtime entry: urban-theme.apply command (shipped as out/extension.js)
|-- palette.ts               single-source palette (9 project colors)
|-- validate.ts              hex, palette, in-string-last, grammar-reference checks
|-- logger.ts                build log output
|-- types.ts                 theme/grammar type contracts
|-- theme/
|   |-- vendor.ts            inherited GitHub Dark Dimmed workbench colors + base tokens (verbatim)
|   |-- tokens.ts            project token rules referencing palette
|   `-- theme.ts             assembles the theme manifest
|-- grammars/
|   |-- languages.ts        embedded-language table (tagged templates)
|   |-- bracket-in-string.ts in-string bracket injection builder
|   |-- nested-quote-in-string.ts nested-quote injection builders (single-in-double, double-in-single)
|   `-- tagged-template.ts   tagged-template injection builder (table-driven)
scripts/
`-- bootstrap.ts             one-time: derive vendor.ts + tokens.ts from the shipped theme
bench/
|-- tokenize-bench.mjs       tokenization behavior-parity + speed harness
`-- baseline/               committed grammar snapshot used as the parity fixture
themes/, syntaxes/           generated artifacts (shipped)
out/                         compiled output (tsc), git-ignored; only out/extension.js is shipped (vsix exception)
```

## Build Pipeline

```text
src/palette.ts + theme/*.ts + grammars/*.ts
  -> src/build.ts
  -> validate (hex, palette membership, in-string-last, grammar references)
  -> serialize (2-space JSON, existing EOL preserved)
  -> themes/urban-color-theme.json
  -> syntaxes/bracket-in-string.tmLanguage.json
  -> syntaxes/tagged-template.tmLanguage.json
  -> syntaxes/nested-quote-single-in-double.tmLanguage.json
  -> syntaxes/nested-quote-double-in-single.tmLanguage.json
```

Commands: `bun run generate` writes the artifacts, `bun run validate` checks them against disk without writing,
`bun run typecheck` type-checks the generator and the runtime entry, `bun run compile:extension` emits
`out/extension.js` (CommonJS), and `bun run vscode:prepublish` regenerates artifacts then compiles the entry before
packaging. `bun run bench` proves the generated grammars tokenize identically to the committed baseline and reports
throughput. The generated theme and in-string grammar are byte-identical to the
prior shipped artifacts; the tagged-template grammar is regenerated from `languages.ts` with identical tokenization
behavior.

## Color Resolution Order

```text
GitHub Dark Dimmed base rules (index 0-48)
  -> project rules (index 49-93)
  -> later rule wins on equal scope specificity
```

Project rules are appended after the base rules so they override them without editing inherited entries. Order matters
for two pairs: generic string rules precede the object-literal key rules, and the in-string bracket rule is last so it
survives the broad `string.quoted` overrides. `validate.ts` enforces that the in-string bracket rule stays last.

## Injection Grammar: In-String Brackets

```text
injectionSelector: L:string -string.regexp -comment
match:             [\[\](){}]
name:              punctuation.bracket.in-string
```

The selector limits matching to string contexts, so brackets in code, comments, and regular-expression literals keep
their normal colors. `meta.embedded` is deliberately not excluded: HTML places `<script>` and `<style>` content under
`meta.embedded.block.html`, and template interpolation under `meta.embedded.line.js`, so excluding it would silently
disable the rule in every mixed-language file.

## Injection Grammar: Tagged Templates

```text
tag or hint            content scope                              grammar
html`` /* html */``    meta.embedded.block.html text.html.basic    text.html.basic
css``  /* css */``     meta.embedded.block.css source.css          source.css
scss`` /* scss */``    meta.embedded.block.scss source.css.scss    source.css.scss
less`` /* less */``    meta.embedded.block.less source.css.less    source.css.less
sql``  /* sql */``     meta.embedded.block.sql source.sql          source.sql
json`` /* json */``    meta.embedded.block.json source.json        source.json
sh``   /* bash */``    meta.embedded.block.shell source.shell      source.shell
```

Each language contributes a tag rule and a comment-hint rule generated from `languages.ts`. Both open on the tag (or
comment hint) plus a backtick, close on the next backtick, and include the target grammar. `${...}` is matched first so
interpolated code is tokenized as JavaScript instead of being consumed by the embedded grammar. The rule count is kept
at fourteen on purpose: vscode-textmate compiles all injection begin rules into one scanner, so merging rules does not
reduce scan cost and measured slightly slower in `bench/tokenize-bench.mjs`.

Two details make this work with the theme:

```text
no name on the block   -> the block is not string.template, so the tan template rule cannot flatten it
contentName carries    -> meta.embedded.block.<lang> AND the language root scope (source.css, text.html.basic, ...)
the language root         so theme rules keyed on source.css / text.html match embedded code too
```

Without the language root scope in `contentName`, an included grammar contributes its rules but not its own root scope,
and embedded code falls back to base theme colors instead of the project rules.

## Semantic Highlighting

```text
themes/urban-color-theme.json semanticHighlighting: false
  -> language servers stop contributing token colors
  -> TextMate rules become the only color source
semanticTokenColors.comment: #7CA964
  -> applies only where a language enables semantic highlighting explicitly
```
