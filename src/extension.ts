import * as vscode from 'vscode';

// Enum to distinguish between file and folder types
enum ItemType {
    File = 'file',
    Folder = 'folder'
}

// Interface for file system items (both files and folders)
interface FileSystemItem {
    type: ItemType;
    path: string;
    content?: string;
}

// Interface for the final copy information structure
interface CopyInfo {
    items: FileSystemItem[];
    timestamp: string;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Recursive Content Copy extension is now active!');

    let disposable = vscode.commands.registerCommand('recursive-content-copy.copy', async (uri: vscode.Uri, uris: vscode.Uri[]) => {
        const selectedUris = uris || (uri ? [uri] : []);
        if (selectedUris.length === 0) {
            showTemporaryMessage('No files or folders selected in the file explorer.');
            return;
        }

        const items: FileSystemItem[] = [];
        for (const selectedUri of selectedUris) {
            const stat = await vscode.workspace.fs.stat(selectedUri);
            if (stat.type === vscode.FileType.Directory) {
                items.push(...await getFolderContents(selectedUri));
            } else {
                const content = await vscode.workspace.fs.readFile(selectedUri);
                items.push({
                    type: ItemType.File,
                    path: vscode.workspace.asRelativePath(selectedUri),
                    content: content.toString()
                });
            }
        }

        const copyInfo: CopyInfo = {
            items: removeDuplicates(items),
            timestamp: new Date().toISOString()
        };

        await vscode.env.clipboard.writeText(JSON.stringify(copyInfo, null, 2));
        showTemporaryMessage(`Contents of ${copyInfo.items.length} unique item(s) copied to clipboard in JSON format!`);
    });

    context.subscriptions.push(disposable);
}

async function getFolderContents(folderUri: vscode.Uri): Promise<FileSystemItem[]> {
    const items: FileSystemItem[] = [{
        type: ItemType.Folder,
        path: vscode.workspace.asRelativePath(folderUri)
    }];

    const entries = await vscode.workspace.fs.readDirectory(folderUri);

    for (const [name, type] of entries) {
        const childUri = vscode.Uri.joinPath(folderUri, name);
        if (type === vscode.FileType.Directory) {
            items.push(...await getFolderContents(childUri));
        } else {
            const content = await vscode.workspace.fs.readFile(childUri);
            items.push({
                type: ItemType.File,
                path: vscode.workspace.asRelativePath(childUri),
                content: content.toString()
            });
        }
    }

    return items;
}

function removeDuplicates(items: FileSystemItem[]): FileSystemItem[] {
    const uniqueItems: FileSystemItem[] = [];
    const seenPaths = new Set<string>();

    for (const item of items) {
        if (!seenPaths.has(item.path)) {
            seenPaths.add(item.path);
            uniqueItems.push(item);
        }
    }

    return uniqueItems;
}

function showTemporaryMessage(message: string, duration: number = 3000) {
    const disposable = vscode.window.setStatusBarMessage(message);
    setTimeout(() => disposable.dispose(), duration);
}

export function deactivate() {}