---
layout: post
title: Pandoc
tag: ['Software']
---



# Pandoc
> A Haskell library to turn everything to everything

## [Install](https://pandoc.org/installing.html) 

1. Download and install it.
2. Terminal input `pandoc --version` to ensure install truely.

## [Usage](https://pandoc.org/getting-started.html)

### Usage In Terminal

#### Open terminal and use it
```shell
// Input pandoc and hit enter
pandoc
// Type follow word
Hello *pandoc*!

- one
- two
// Type `ctrl+d` to end type
<p>Hello <em>pandoc</em>!</p>
<ul>
<li>one</li>
<li>two</li>
</ul>
```

#### How to Turn Html to Markdown
```shell
pandoc -f html -t markdown
```
`-f` is mean from;
`-t` is

### Usage in file
1. Type a markdown file
2. Open terminal and `cd` the file directory and type
```shell
pandoc test1.md -f markdown -t html -s -o test1.html
```
`test1.md` is the origin file;
`-s` is to create a 'standalone' file;
`-o test1.html` is to put the output in the file test1.html

