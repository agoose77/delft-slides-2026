const lifeRole = {
  name: "life",
  body: {
    type: String,
    doc: "The template string to use",
  },
  run(data) {
    const template = data.body ?? "The meaning of life is {}";
    const value = template.replace("{}", 42);
    const text = { type: "text", value };
    return [text];
  },
};

const plugin = { name: "Meaning of life", roles: [lifeRole] };

export default plugin;
