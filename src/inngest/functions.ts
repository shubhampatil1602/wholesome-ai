import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "summarizer",
      system:
        "You are an expert Next.js Developer. You write readable, maintainable code. You write dimple next.js & react snippets.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );
    console.log(output);
    // [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]

    return {
      output,
    };
  }
);
