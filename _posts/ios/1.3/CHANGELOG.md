# Changelog

## [1.3.2] - 2017-09-12
### Changed
- Improved the quality of lowest bitrate stream version. A 192 Kbps stream version is required by Apple on mobile networks. (Affects both VOD and live streams)
- Avoid playing low quality 192 Kbps stream version on WiFi. (Affects VOD-playback only)
- Faster playback start for live content on mobile networks with lower supported bandwidth. (Affects live streams only, there were no such issues for VOD)
- A subtitle-related crash fixed.

## [1.3] - 2017-07-20
### Added
- Added new property `broadcastStartDate` and delegate method `playerBroadcastStartDateDidChange:` for reporting the start date of live broadcasts.

[1.3]: ../1.3/
[1.3.2]: ../1.3/
