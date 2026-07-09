import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/home/japcode/PersonalProjects/ula-social-comunication/tina/__generated__/.cache/1783621793171', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  