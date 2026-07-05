import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { JSONFilePreset } from 'lowdb/node';
import { Server } from 'socket.io';
import type { HttpServer, ViteDevServer } from 'vite';

type UpdateGraphicMessage = {
	graphic: string;
	data: GraphicVariables;
};

type GraphicVariables = {
	[name: string]: unknown;
};

type GraphicData = {
	variables: GraphicVariables;
};

type Data = {
	graphics: {
		[id: string]: GraphicData;
	};
};

const default_data: Data = { graphics: {} };
const db = await JSONFilePreset('graphix_db.json', default_data);
const graphics_path = 'graphics';

export function get_graphics() {
	return db.data.graphics;
}

export async function get_graphic_variables(id: string) {
	await db.read();
	return db.data.graphics[id].variables;
}

export async function main(server: HttpServer) {
	if (existsSync(graphics_path)) {
		const dir = await readdir(graphics_path);

		for (const id of Object.keys(db.data.graphics)) {
			if (!dir.includes(id)) {
				delete db.data.graphics[id];
			}
		}

		dir.forEach((item_name) => {
			const base_path = `${graphics_path}/${item_name}`;
			if (
				!Object.hasOwn(db.data.graphics, item_name) &&
				(existsSync(`${base_path}/View.svelte`) || existsSync(`${base_path}/Panel.svelte`))
			) {
				db.data.graphics[item_name] = { variables: {} };
			}
		});
	} else {
		db.data.graphics = {};
	}
	await db.write();

	const io = new Server(server);

	io.on('connection', async (socket) => {
		socket.on('update_graphic', async (message: UpdateGraphicMessage) => {
			io.emit(`graphics_updated_${message.graphic}`, message.data);
			const preexisting_variables = db.data.graphics[message.graphic].variables;
			db.data.graphics[message.graphic].variables = Object.assign({}, preexisting_variables, message.data);
			await db.write();
		});
	});
}

export async function main_vite(dev_server: ViteDevServer) {
	if (!dev_server.httpServer) return;

	await main(dev_server.httpServer);
}
