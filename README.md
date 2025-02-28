# VSCode Error Extractor

A simple VSCode extension that copies file errors with context to your clipboard.

## What It Does

This extension adds a command to VSCode that extracts all errors/warnings from your current file along with the file content, making it easy to share with AI assistants or colleagues.

## Installation

1. Download the `.vsix` file from the releases
2. In VSCode, go to Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
3. Click the "..." menu in the top-right corner
4. Select "Install from VSIX..." and choose the downloaded file

## Usage

When you have errors in your file:

1. Open the command palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Copy Errors with Context" and select it
3. The errors and file content are now on your clipboard

Note: The right-click context menu approach isn't currently working. Use the command palette instead.

## Why It's Useful

- Share errors with AI assistants like ChatGPT
- Get help from teammates with full error context
- Save time compared to manually copying errors

## Requirements

- VSCode 1.60.0 or higher

## Example Output

```
# File: /path/to/your/file.js

# All File Content:
```
function example() {
  console.log("Hello")
  return x + 5;
}
```

# Errors with Context:

Error 1:
Line 3: Cannot find name 'x'.
Code:   return x + 5;
        ^
```

## Contributing

Feel free to open issues or submit PRs if you find bugs or have enhancement ideas.

## License

MIT