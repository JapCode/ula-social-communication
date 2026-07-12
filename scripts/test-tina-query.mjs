import { createClient } from "tinacms/dist/client";
import { queries } from "../tina/__generated__/types.js";

const client = createClient({ 
  url: 'http://localhost:4001/graphql', 
  token: '4c679c00ee39bbefb2d5966e8d106d4f0e453095', 
  queries, 
});

const result = await client.queries.pages({ relativePath: 'academics-course-content.md' });
const pageData = result.data.pages;
console.log("title:", JSON.stringify(pageData.title));
console.log("blocks count:", pageData.blocks ? pageData.blocks.length : "UNDEFINED");

if (pageData.blocks) {
  pageData.blocks.forEach((b, i) => {
    console.log(`\nBlock ${i}:`);
    console.log("  keys:", Object.keys(b));
    console.log("  __typename:", b.__typename);
    console.log("  _template:", b._template);
    if (b.title) console.log("  title:", JSON.stringify(b.title));
    if (b.heading) console.log("  heading:", JSON.stringify(b.heading));
    if (b.body) console.log("  body (first 50):", JSON.stringify(b.body.substring(0, 50)));
    if (b.label) console.log("  label:", JSON.stringify(b.label));
  });
}

// Now apply the same transform used in the catch-all route
console.log("\n\n=== After __typename → _template transform ===");
const transformed = (pageData.blocks || []).map(block => {
  const t = block.__typename;
  if (t && t.startsWith('PagesBlocks')) {
    const templateName = t.charAt(11).toLowerCase() + t.slice(12);
    return { ...block, _template: templateName };
  }
  return block;
});
transformed.forEach((b, i) => {
  console.log(`Block ${i}: _template=${b._template}`);
});
