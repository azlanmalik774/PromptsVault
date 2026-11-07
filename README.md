# Prompt Vault AI Video Prompts

Master prompts for AI video ideas. 220 prompts, 11 genres (20 per genre), favorites, copy and "Try on Gemini".
Built with Vite + Capacitor (Android).

## Get the APK (no Android Studio needed)
1. Create an empty repo on GitHub and push this project to the `main` branch.
2. Open the repo > **Actions** > **Build Android APK**. It runs on every push, or click **Run workflow**.
3. When it finishes (about 5 minutes), open the run and download **PromptVault-debug-apk** under *Artifacts*.
4. Unzip it, copy `app-debug.apk` to your phone and install it (allow "install unknown apps").

## Change the app id or name
Edit `capacitor.config.json` (`appId`, `appName`). Icons and splash come from the `assets/` folder and are generated automatically in the build.. Use your own id before publishing, e.g. `com.yourname.promptvault`.

## Add or edit prompts
Prompts live in `src/prompts.js`. The prompt text template is shown there in full for each item.

## Run locally
```
npm install
npm run dev
```

## Play Store release
The workflow builds a debug APK, which is fine for sharing and testing. For the Play Store you need a signed release
AAB: run `npx cap add android` locally, open `android/` in Android Studio and use Build > Generate Signed Bundle.
