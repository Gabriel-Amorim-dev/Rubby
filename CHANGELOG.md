# Change Log

All notable changes to the "rubber-duck-debugger" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added
- **Sleep mode:** Rubby falls asleep after a period of editor inactivity (configurable via `rubby.idleSleepMinutes`).
- **Idle Chat:** Rubby cracks duck jokes periodically when walking without any active errors.
- **Cool State:** Earn sunglasses by kicking off a debug session (F5) with zero active errors.
- **Configurable Thresholds:** Users can customize when Rubby gets sad or scared via `rubby.sadThreshold` and `rubby.scaredThreshold`. Includes a dedicated command to open these settings (`Rubby: Configure Thresholds`).
- Base states (Walking, Happy, Sad, Scared) that react dynamically to the severity and count of active workspace diagnostics.