/*-----------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the EPL v2.0 License. See LICENSE file in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/

import { RSP_PROVIDER_ID, RSP_PROVIDER_NAME } from './constants';
import { ExtensionAPI } from './extensionApi';
import * as vscode from 'vscode';
import { extension, RSPController, RSPServer, ServerState } from 'vscode-server-connector-api';

export async function activate(context: vscode.ExtensionContext): Promise<RSPController> {

    const api: ExtensionAPI = new ExtensionAPI();

    const rsp: RSPServer = {
        state: ServerState.UNKNOWN,
        type: {
            id: RSP_PROVIDER_ID,
            visibilename: RSP_PROVIDER_NAME
        }
    };
    const serverConnector = await extension.manager.unwrapped;

    if (serverConnector.available) {
        serverConnector.api.registerRSPProvider(rsp).catch((x: string) =>
            console.log('error' + x));
    }

    return api;
}

// this method is called when your extension is deactivated
export async function deactivate() {
    const serverConnector = await extension.manager.unwrapped;

    if (serverConnector.available) {
        serverConnector.api.deregisterRSPProvider(RSP_PROVIDER_ID);
    }
}
