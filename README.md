# Recursive Content Copy for VS Code

## Overview
Recursive Content Copy is a Visual Studio Code extension that allows users to copy the content of selected files or folders recursively and output it into the clipboard in a structured JSON format. This extension is particularly useful for developers who need to quickly capture and share file structures and contents.

## Features
- Copy contents of single or multiple files
- Recursively copy contents of folders
- Output copied content in a structured JSON format
- Remove duplicate entries automatically
- Provide temporary status messages for user feedback

## Installation
1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Recursive Content Copy"
4. Click Install

Alternatively, you can install it from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=YourPublisherName.recursive-content-copy).

## Usage
1. Select one or more files or folders in the VS Code file explorer
2. Right-click and select "Copy Contents (Recursive)" from the context menu
3. The contents will be copied to your clipboard in JSON format

## JSON Structure
The copied content will be in the following JSON structure:
```json
{
  "items": [
    {
      "type": "file" | "folder",
      "path": "relative/path/to/item",
      "content": "file content (only for files)"
    },
    ...
  ],
  "timestamp": "ISO 8601 timestamp"
}
```

## Development
### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Setup
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/recursive-content-copy.git
   ```
2. Install dependencies:
   ```
   cd recursive-content-copy
   npm install
   ```

### Running Tests
To run the unit tests:
```
npm run test:unit
```

To run the full test suite (including integration tests):
```
npm test
```

### Building
To compile the extension:
```
npm run compile
```

### Packaging
To package the extension for publication:
```
npm run package
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
If you encounter any problems or have any questions, please [open an issue](https://github.com/yourusername/recursive-content-copy/issues) on our GitHub repository.