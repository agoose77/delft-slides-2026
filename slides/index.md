---
authors:
  - name: Angus Hollands
    affiliations:
      - 2i2c
    orcid: 0000-0003-0788-3814
    github: agoose77
    bluesky: "@agoose77.bsky.social"
    mastodon: "@agoose77@fosstodon.org"
kernelspec:
  name: python3
  display_name: Python3
date: 2026-11-03
---

# Executable Notebooks in Scientific Publishing Workflows

::::{figure} /media/my-face.webp
:width: 768px

:::{div .m-text-3xl}
👋 I'm Angus Hollands

I'm an Open Source App/Infra Engineer at ![](/media/2i2c-logo.svg)!
:::
::::

## Foreword

I used Jupyter Book 1 to author my PhD thesis 🎓. {span .fragment .m-decoration-pink-500 .m-underline}`The content was questionable.` {span .fragment}`The subsequent journey was not!`

:::{iframe} https://agoose77.github.io/phd-thesis

:::

% graduated from user to contributor
% saw the project move from v1 to v2

## The Team

:::{aside .notes}

Of importance: pathway from user to contributor. We're an open project!

:::

::::{grid .m-max-w-3xl} 4 4 4 4

:::{card} Chris Holdgraf
![](/media/mugshots/chris.jpeg)
:::

:::{card} Serena Bonaretti
![](/media/mugshots/serena.webp)
:::

:::{card} Stefan van der Walt
![](/media/mugshots/stefan.jpeg)
:::

:::{card} Steve Purves
![](/media/mugshots/steve.jpeg)
:::

:::{card} Rowan Cockett
![](/media/mugshots/rowan.png)
:::

:::{card} Franklin Koch
![](/media/mugshots/franklin.jpeg)
:::

:::{card} Angus Hollands
![](/media/mugshots/angus.png)
:::

:::{card} Greg Caporaso
![](/media/mugshots/greg.jpeg)
:::

::::

# Scientists use Notebooks

Many scientists use Jupyter Notebooks to Do Science™ {span .fragment}``Notebooks are built from {span .m-text-red-500}`Markdown cells,` `` {span .fragment .m-text-green-500}`Code cells,` {span .fragment}``and {span .m-text-blue-500}`Kernels` that run code.``

:::::{exercise .fragment}
:label: ex:research
What does an actual research notebook look like?
::::{grid} 2 2 2 2
:::{card}
:link: http://localhost:8888/lab/tree/analysis/snakes-and-ladders.ipynb
![](/media/snek-cell.png)
:::

:::{card}
:link: http://localhost:8888/lab/tree/analysis/nettie-dog-flap-visits.ipynb
![](/media/dog-cell.png)
:::

::::
:::::

:::{solution .fragment} ex:research
Notebooks are _never_ clean. They're always {span .fragment}`rushed,` {span .fragment}`hacky,` {span .fragment}`` and called `untitled.ipynb`.``
:::

## Help, my Notebooks are Ugly!

:::::{exercise .fragment}
:label: ex:ugly
You have an ugly research notebook that others want to see 🖼️. Do you ...
::::{grid} 2 2 2 2
:::{card}
Share the ugly notebook, because you're confident 😎
:::

:::{card}
Absolutely do not do that 💀
:::

::::

:::{image} /media/ugly-meme.png
:width: 500px
:::
:::::
:::{solution .fragment} ex:ugly
There's another way ...

:::

(slide:superpowers)=

## But first ... MyST's SuperPowers 🦸‍♀️

:::{div #myst-superpowers}
There are quite a few documentation engines!

- {span .fragment}`Quarto`
- {span .fragment}`Sphinx`
- {span .fragment}`Typst`
  :::

{span .fragment}`We think that MyST has certain super-powers that make it stand out...`

# 🦸‍♀️ XRefs (🖇️): Links are Powerful

MyST can connect different parts of a project using cross-references.

```{preview}
See @slide:superpowers!
```

## 🦸‍♀️ XRefs (🖇️): Names create Targets

Adding a `name` makes something referenceable!

```{preview}
:::{figure} https://picsum.photos/500/150
:name: my-figure
:::

See @my-figure
```

## 🦸‍♀️ XRefs (🖇️): Labels are Smart

Different targets get different labels!

```{preview}
:::{math}
:name: my-eqn

E^2 = (mc^2)^2 + (pc)^2
:::

See @my-eqn and @my-figure

```

# 🦸‍♀️ Embeds (🖨️): XRefs-in-action

Content can be embedded in multiple places!

```{preview}
Here's the earlier equation:
![](#my-eqn)
```

## Ugly Notebooks 🦢, Beautiful Prose 💫

Let's put 🐕 and 🖇️ and 🖨️ together! {button}`Go to Notebook →<http://localhost:8888/lab/tree/analysis/nettie-dog-flap-visits.ipynb>`

```{preview .fragment}
Here's my consequential result concerning dog visits to the outside world... ![](#nettie-visits)
```

:::{div .notes}
Show what happens when we clear outputs of that cell.
:::

## Embeds (🖨️): Separate the Reading from the Doing

Using embeds, we can separate the {span .m-text-red-500}`reading of scientific results` from the {span .m-text-green-500}`work that we did to get them`.

These are two different mind-sets!

# 🦸‍♀️ Execution (⚡): Generate your outputs

We can execute in Markdown documents!

````{preview}
```{code-cell} ipython
start = "You were only supposed to"
end = " blow the bloody doors off 🚘💥"
print(start + end)
```
````

## 🦸‍♀️ Execution (⚡): Interpolate your Variables

Inline expressions can also be embedded in your prose:

```{preview}
It started like {eval}`start`
```

## 🦸‍♀️ Execution (⚡): Cache the Results

Jupyter Book remembers the inputs and stores the outputs for next time.

You can tweak this using the `cache` or `depends_on_env` [settings](xref:guide#execute-config).

## 🦸‍♀️ Execution (⚡): Use Complex Environments

Each file can use a different kernel.

Tools like Pixi _can_ be set-up to create separate environments with separate kernels.

## 🦸‍♀️ Execution (⚡): Use Remote Executors

You can [run your book execution remotely](xref:guide/execute-notebooks#manually-launch-a-jupyter-server) on a BinderHub or JupyterHub!

```bash
JUPYTER_BASE_URL=xxx JUPYTER_TOKEN=yyy jupyter book start --execute
```

# 🦸‍♀️ DOIs & Citations (🏷️): Directly use DOIs

```{preview}
{abbr}`DOI (Digital Object Indentifier)`s are Digital Object Identifiers.

The LIGO result was published with a DOI: <doi:10.1103/PhysRevLett.116.061102>
```

## 🦸‍♀️ DOIs & Citations (🏷️): Connect with BibTex

```{preview}
I also read something interesting in @theHiggsBoson
```

:::{div .fragment}

Citations can be narrowed to particular pages, like Pandoc:

```{preview }
Perhaps I saw it at [@theHiggsBoson, p23]?
```

:::

See [the guide](xref:guide/citations#markdown-citations) for more

## 🦸‍♀️ DOIs & Citations (🏷️): Use Remote Bibliographies

A project can use multiple bibligraphies, and they can be URLs!

```yaml
project:
  bibliography:
    - https://.../my-bibliography.bib
```

{span .fragment}`This makes it easy to share bibliographies between projects and departments.`

# Thank you

```{slide-authors}
:socials:
```

```{slide-socials}

```
