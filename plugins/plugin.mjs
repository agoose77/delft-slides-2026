const previewDirective = {
  name: "preview",
  doc: "Preview in-build content.",
  arg: {
    type: String,
    doc: "Filename",
  },
  body: {
    type: String,
    doc: "The content to render",
  },
  options: {
    class: { type: String, doc: "Class of output node" },
  },
  run(data, vfile, ctx) {
    console.log(data.body, ctx);
    const { children } = ctx.parseMyst(data.body);
    const code = {
      type: "code",
      lang: "markdown",
      value: data.body,
      filename: data.arg,
    };
    const result = {
      type: "div",
      children: children,
    };
    return [
      {
        type: "div",
        class: `${data.options?.class ?? ""} m-border-dashed m-border-2 m-border-purple-700 m-px-2 m-px-2`,
        children: [code, result],
      },
    ];
  },
};

const plugin = { name: "Lorem Picsum Images", directives: [previewDirective] };

export default plugin;
