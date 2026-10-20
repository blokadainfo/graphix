import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { JSONFilePreset } from 'lowdb/node';
import { Server } from 'socket.io';
import type { HttpServer, ViteDevServer } from 'vite';
import { defaultData, defaultGraphicData, type Data } from './types';
import type { UpdateGraphicMessage, VariableUpdatedMessage } from '$lib/shared/types';

const db = await JSONFilePreset<Data>('graphix_db.json', defaultData);

export async function getGraphics() {
	await db.read();
	return db.data.graphics;
}

export async function getGraphicVariables(id: string) {
	await db.read();
	return db.data.graphics[id].variables;
}

export async function main(server: HttpServer) {
	// Reset to default data if data version is lower
	await db.read();
	if (db.data.version < defaultData.version) {
		db.data = defaultData;
		await db.write();
	}

	const graphicsPath = 'graphics';
	if (existsSync(graphicsPath)) {
		// Clean up old graphic data
		const dir = await readdir(graphicsPath);
		const graphicIDs = Object.keys(db.data.graphics);
		for (const id of graphicIDs) {
			if (!dir.includes(id)) {
				delete db.data.graphics[id];
			}
		}

		dir.forEach((itemName) => {
			const basePath = `${graphicsPath}/${itemName}`;
			if (
				!Object.hasOwn(db.data.graphics, itemName) &&
				existsSync(`${basePath}/graphix_info.json`) &&
				existsSync(`${basePath}/views/View.svelte`)
			) {
				db.data.graphics[itemName] = structuredClone(defaultGraphicData);
			}
		});
	} else {
		db.data.graphics = {};
	}
	await db.write();

	const webSocketIO = new Server(server);
	webSocketIO.on('connection', async (socket) => {
		socket.on('UpdateGraphic', async (receivedMsg: UpdateGraphicMessage) => {
			const message: VariableUpdatedMessage = {
				value: receivedMsg.value,
				variable: receivedMsg.variable
			};
			webSocketIO.emit(`VariableUpdated_${receivedMsg.graphic}`, message);

			const currentVars = db.data.graphics[receivedMsg.graphic].variables;
			const newVars = Object.assign({}, currentVars, { [receivedMsg.variable]: receivedMsg.value });
			db.data.graphics[receivedMsg.graphic].variables = newVars;
			await db.write();
		});
	});
}

export async function mainVite(devServer: ViteDevServer) {
	if (!devServer.httpServer) return;

	await main(devServer.httpServer);
}
