const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('errorExtractor.copyErrorsWithContext', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage('No active editor found');
                return;
            }

            const document = editor.document;
            const filePath = document.uri.fsPath;
            const fileContent = document.getText();
            const diagnostics = vscode.languages.getDiagnostics(document.uri);
            
            if (!diagnostics || diagnostics.length === 0) {
                vscode.window.showInformationMessage('No errors found in this file');
                return;
            }

            let output = `# File: ${filePath}\n\n`;
            output += `# All File Content:\n\`\`\`\n${fileContent}\n\`\`\`\n\n`;
            output += `# Errors with Context:\n\n`;

            diagnostics.forEach((diagnostic, index) => {
                const lineNumber = diagnostic.range.start.line;
                const startChar = diagnostic.range.start.character;
                const endChar = diagnostic.range.end.character;
                const errorLine = document.lineAt(lineNumber).text;
                
                output += `Error ${index + 1}:\n`;
                output += `Line ${lineNumber + 1}: ${diagnostic.message}\n`;
                output += `Code: ${errorLine}\n`;
                
                // Create a pointer to the exact error position
                const pointer = ' '.repeat(startChar) + '^'.repeat(Math.max(1, endChar - startChar));
                output += `${pointer}\n\n`;
            });

            await vscode.env.clipboard.writeText(output);
            vscode.window.showInformationMessage('Errors with context copied to clipboard');
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
