import { search } from "npm:duck-duck-scrape"; async function run() { const results = await search("latest openai news"); console.log(results.results.map(r => r.title)); } run();
