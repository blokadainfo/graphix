import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	globalThis.WebSocketIO.emit('FireArmed');
	return new Response(String('OK'));
};
