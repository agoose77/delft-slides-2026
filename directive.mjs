const quoteDirective = {
  name: "legit-quote",
  body: {
    type: "myst",
    doc: "The template string to use",
  },
  run(data) {
    const attribution = {
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "-- Einstein",
        },
      ],
    };
    const quote = { type: "blockquote", children: [...data.body, attribution] };
    return [quote];
  },
};

const plugin = { name: "Meaning of quote", directives: [quoteDirective] };

export default plugin;
