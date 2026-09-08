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
```

The extension contributes no activation code. It has no `main` entry and no `activationEvents`; VS Code reads the theme
and grammar declarations directly from `package.json`. Nothing is compiled, so `out/` is absent by design.

## Source Map

```text
themes/
`-- urban-color-theme.json              name, semanticHighlighting flag, colors, tokenColors, semanticTokenColors
syntaxes/
|-- bracket-in-string.tmLanguage.json   injection grammar scoping brackets inside string literals
`-- tagged-template.tmLanguage.json     injection grammar embedding real language grammars in tagged templates
logo.webp                               marketplace icon, 1024x1024
```

## Color Resolution Order

```text
GitHub Dark Dimmed base rules (index 0-48)
  -> project rules (index 49-90)
  -> later rule wins on equal scope specificity
```

Project rules are appended after the base rules so they override them without editing inherited entries. Order matters
for two pairs: generic string rules precede the object-literal key rules, and the in-string bracket rule is last so it
survives the broad `string.quoted` overrides.

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

Each rule opens on the tag (or comment hint) plus a backtick, closes on the next backtick, and includes the target
grammar. `${...}` is matched first so interpolated code is tokenized as JavaScript instead of being consumed by the
embedded grammar.

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
