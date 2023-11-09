import { Ai } from '@cloudflare/ai';
import { html } from './template.js';
export default {
	async fetch(request, env, ctx) {
		// return new Response('Hello MeenatCodes!');
		const url = new URL(request.url);
		if(request.method === 'POST' && url.pathname === '/ai'){
			// Create an instance of the AI using the provided environment variable.
			const ai = new Ai(env.AI);

			const body = await request.json();
			const userMessage = body.message;
			const messages = [
				{ role: 'system', content: 'You are an friendly assistant.' },
				{ role: 'user', content: userMessage },
			]

			const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
				messages,
			});

			// Present the response as a JSON string.
			return new Response(JSON.stringify(response));
		}

		return new Response(html, {
			headers: {
				'content-type': 'text/html',
			}
		})
	},
};
