# AI Agent Browser Extension

A universal browser extension that empowers LLMs (ChatGPT, Claude, Copilot, Ollama, etc.) to autonomously control web pages. Click buttons, fill forms, navigate sites—all at the direction of your chosen AI model.

## What This Does

The extension acts as a bridge between your LLM and any webpage:
- **LLM Sees** the page structure (DOM, accessibility tree, optional screenshots)
- **LLM Decides** what action to take ("Click the green button", "Type 'password' in the login field")
- **Extension Executes** the command in real-time
- **Feedback Loop** continues until the task is complete

## Key Features

✅ **Universal Browser Support** - Chrome, Firefox, Edge, Brave, and more  
✅ **Any LLM Provider** - OpenAI (ChatGPT), Anthropic (Claude), Copilot, Ollama, local models  
✅ **Full Web Control** - Click, type, submit forms, scroll, navigate, wait  
✅ **Rich Perception** - DOM accessibility trees + optional visual snapshots  
✅ **Secure by Default** - Localhost-only by default, configurable permissions  
✅ **Easy Setup** - No coding required for basic use  

## Quick Start

### Prerequisites
- Node.js (>=16)
- A modern browser (Chrome, Firefox, Edge)
- An LLM API key or local LLM running

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/simon-drury/browser_bridge_-sfl-playground-extension_sjd_datascapes.git
   cd browser_bridge_-sfl-playground-extension_sjd_datascapes
   ```

2. **Load the extension into your browser**
   - **Chrome/Edge/Brave:**
     - Open `chrome://extensions/` (or `edge://extensions/`)
     - Enable "Developer mode" (top right)
     - Click "Load unpacked"
     - Select the `extension/` folder
   
   - **Firefox:**
     - Open `about:debugging#/runtime/this-firefox`
     - Click "Load Temporary Add-on"
     - Select `extension/manifest.json`

3. **Start the local receiver (optional but recommended)**
   ```bash
   cd server
   npm install
   npm start
   ```
   The receiver listens on `http://localhost:3000` by default.

4. **Configure your LLM**
   - Click the extension icon in your browser
   - Select your LLM provider (OpenAI, Claude, Ollama, etc.)
   - Add your API key or local endpoint
   - Click "Save"

5. **Start controlling web pages**
   - Open any website
   - Click the extension icon and type a task: *"Log into Gmail"*, *"Fill out the form with my details"*, *"Search for cats"*
   - Watch the LLM take control

## Project Structure

```
browser_bridge_-sfl-playground-extension_sjd_datascapes/
├── extension/                    # Browser extension source
│   ├── manifest.json             # Extension manifest (V3)
│   ├── background.js             # Service worker (message routing)
│   ├── content.js                # Content script (page interaction)
│   ├── popup/
│   │   ├── popup.html            # Extension popup UI
│   │   └── popup.js              # Popup logic
│   ├── sidebar/                  # Optional: Sidebar dashboard
│   │   ├── sidebar.html
│   │   └── sidebar.js
│   ├── utils/
│   │   ├── dom-extractor.js      # Extract page structure
│   │   ├── command-executor.js   # Execute browser commands
│   │   └── llm-connector.js      # LLM API integration
│   ├── styles/
│   │   └── ui.css
│   └── icons/                    # Extension icons
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── server/                       # Optional local receiver
│   ├── server.js                 # Express.js receiver
│   ├── prompts.js                # LLM system prompts
│   ├── package.json
│   └── README.md
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md           # Technical design
│   ├── SUPPORTED_LLMS.md         # LLM provider guide
│   ├── PROMPT_ENGINEERING.md     # How LLM instructions work
│   ├── SECURITY.md               # Security guidelines
│   └── API_REFERENCE.md          # Extension API
├── examples/                     # Example workflows
│   ├── gmail_login.md
│   ├── form_filling.md
│   └── web_search.md
├── .github/
│   ├── ISSUE_TEMPLATE.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline
├── LICENSE                       # MIT License
├── .gitignore
└── README.md                     # This file
```

## Supported LLM Providers

- **OpenAI** (ChatGPT, GPT-4) - via API key
- **Anthropic** (Claude, Claude 3) - via API key
- **Microsoft** (Copilot, OpenAI integration) - via Azure endpoints
- **Ollama** (Local models) - via local endpoint
- **LM Studio** - via local API
- **Manual Mode** - Paste LLM responses into extension UI

## How It Works

### 1. **Perception Phase**
The extension extracts the current page state and sends it to the LLM:
```json
{
  "url": "https://example.com",
  "title": "Example Domain",
  "elements": [
    { "id": 1, "type": "button", "text": "Click me", "xpath": "//*[@id='btn-submit']" },
    { "id": 2, "type": "input", "placeholder": "Enter text", "xpath": "//*[@name='email']" }
  ],
  "screenshot": "base64-encoded-image-optional"
}
```

### 2. **LLM Decision**
The LLM analyzes the page and decides:
```json
{
  "reasoning": "I see a login form. I need to fill in email and password.",
  "actions": [
    { "action": "type", "element_id": 2, "text": "user@example.com" },
    { "action": "type", "element_id": 3, "text": "password123" },
    { "action": "click", "element_id": 1 }
  ]
}
```

### 3. **Execution Phase**
The extension executes each command:
- Clicks the element
- Types text into fields
- Submits forms
- Waits for navigation
- Captures new page state

### 4. **Feedback Loop**
- New page state is sent back to LLM
- Process repeats until task is complete

## Configuration

### API Keys
Create a `.env` file in the extension popup settings or in `server/.env`:

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OLLAMA_ENDPOINT=http://localhost:11434
```

### Security
- The extension defaults to `localhost:3000`
- CORS is restricted to localhost origins
- API keys are stored securely in browser storage (encrypted)
- All communication is HTTPS (when deployed remotely)

## Examples

### Example 1: Log Into Gmail
```
User: "Log into my Gmail account with email simon@example.com and password MyPassword123"

LLM:
1. Navigates to gmail.com
2. Sees login form
3. Clicks email field
4. Types email
5. Clicks password field
6. Types password
7. Clicks "Sign in" button
8. Waits for redirect
9. Reports: "Logged in successfully"
```

### Example 2: Fill Out a Form
```
User: "Fill out the contact form with my name (Simon Drury), email (simon@example.com), and message (Hello, this is a test)"

LLM:
1. Extracts form fields
2. Clicks each field in order
3. Types appropriate data
4. Submits form
5. Confirms success
```

## Troubleshooting

### Extension not loading?
- Check `manifest.json` is valid
- Ensure you're using the correct browser folder
- Clear browser cache and reload

### LLM not responding?
- Verify API key is correct
- Check network connection
- Ensure LLM endpoint is reachable
- Check browser console for errors

### Commands not executing?
- Verify the page fully loaded
- Check element selectors in console
- Try clicking elements manually first to ensure they're accessible

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

See `CONTRIBUTING.md` for detailed guidelines.

## Security

**Important:** This extension is designed for **local use by default**. 

- The receiver binds to `localhost:3000`
- The extension only sends to localhost by default
- Never expose the receiver to the internet without authentication
- Do not commit API keys or secrets to the repository

For production use, see `docs/SECURITY.md`.

## Roadmap

- [ ] Visual element highlighting and manual selection
- [ ] Persistent session management
- [ ] Multi-step workflow templates
- [ ] Browser history and replay
- [ ] Mobile support
- [ ] Native browser integration for Manifest V4

## License

MIT License - see `LICENSE` file for details.

## Support

- **Issues & Bugs:** [GitHub Issues](https://github.com/simon-drury/browser_bridge_-sfl-playground-extension_sjd_datascapes/issues)
- **Discussions:** [GitHub Discussions](https://github.com/simon-drury/browser_bridge_-sfl-playground-extension_sjd_datascapes/discussions)
- **Documentation:** See `docs/` folder

## Authors

- **Simon Drury** - Initial concept and development

## Acknowledgments

Inspired by:
- Comet Browser (multi-modal browser agent)
- BrowserGPT and similar projects
- The open-source browser automation community
