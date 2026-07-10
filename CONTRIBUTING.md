

# Contributing to Rubby

First off, thank you for considering contributing to Rubby! Every new feature, joke, or duck sprite makes coding a little more fun for everyone.

## Development Setup

Getting started with the codebase is simple. The project is a standard VS Code Extension written in TypeScript, paired with a lightweight webview front-end.

1. **Clone the repository:**
   ```bash
   git clone <your-fork-url>
   cd rubber-duck-debugger
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the compiler in watch mode:**
   ```bash
   npm run watch
   ```
4. **Launch the Extension Development Host:**
   Open the project in VS Code and press `F5`. This will open a new VS Code window with the extension loaded and ready to test.

## Project Structure & Architecture

Rubby is built using two main components communicating via message passing:

- **The Extension Host (`src/`)**: 
  - `extension.ts`: The main entry point. Registers listeners (diagnostics, configuration, text edits, debug sessions) and dispatches updates. We heavily use the `context.subscriptions.push()` pattern to ensure all disposables are properly cleaned up on deactivation.
  - `DuckController.ts`: The bridge logic. It determines *what* state the duck should be in based on error thresholds and editor activity, then sends that state to the webview.
  - `RubbyViewProvider.ts`: The webview container. It injects the local media file URIs into the HTML template securely.

- **The Webview Front-End (`media/`)**:
  - `duck-control.js`: The client-side state machine. It listens to state messages from the extension host, updates the DOM `<img src="...">`, and drives animations.
  - `phrases.js`: All duck speech pools are kept here rather than inline inside the logic files.
  - `index.html` & `style.css`: The UI markup and layout.

## How to Add a New Duck State or Sprite

Want to add a new mood or behavior? Follow this existing pattern:

1. **Add the Sprite:** Place your new `.png` pixel art file into the `media/` folder.
2. **Expose the URI:** In `src/RubbyViewProvider.ts`, create a new webview-safe URI for your sprite and inject it into the HTML using a `{{placeholder}}`.
3. **Add Data Attribute:** In `media/index.html`, add a `data-yourstate="{{placeholder}}"` attribute to the `<img id="duck">` element.
4. **Register the State:** In `media/duck-control.js`, map the new data attribute inside the `sprites` object and add a new constant to the `DuckState` enum.
5. **Handle the State:** Update the `switch (state)` block in `setState()` inside `duck-control.js` to change the `duck.src` and trigger any related CSS animations.
6. **Trigger It:** Finally, update `src/DuckController.ts` or `src/extension.ts` to post your new state message to the webview when the correct condition is met.

## How to Add Phrases and Jokes

If you just want to make Rubby smarter or funnier, open `media/phrases.js`. You can simply append your text to the relevant arrays (like `jokes`, `cool`, or the error-specific functions).

## Submitting a Pull Request

Before submitting your PR, please make sure to:
1. **Lint your code:** Run `npm run lint` and fix any warnings or errors.
2. **Compile cleanly:** Ensure `npm run compile` succeeds with zero TypeScript errors.
3. **Test thoroughly:** Launch the extension (F5) and manually test that your changes work seamlessly without breaking the existing states (like walking, sleeping, or F5 cool transitions).

Thank you for contributing!
