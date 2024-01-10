import { AiConnector } from '../../jam-tools/iso/AiConnector.js';

let ai = new AiConnector(
  'org-AcdMrEmtepUXgMZCm98r1fcI',
  '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',
  'gpt-4-1106-preview'
);

let resp = await ai.text('Hello AI! This is a test API request.');
console.log(resp);