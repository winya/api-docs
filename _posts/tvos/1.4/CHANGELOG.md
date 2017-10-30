# Changelog

## [1.4] - 2017-10-26
### Added
- `USPrebufferingController` to support faster playback start.
- `USMediaDescriptor` to represent a playable content.
- `- (void)playMedia:(USMediaDescriptor *)mediaDescriptor` added to `USUstreamPlayer`.
- Added new property `broadcastStartDate` and delegate method `playerBroadcastStartDateDidChange:` for reporting the start date of live broadcasts.

### Changed
- `- (void)playChannel:(NSString *)channelId` deprecated in `USUstreamPlayer` in favor of `- (void)playMedia:(USMediaDescriptor *)mediaDescriptor`.
- `- (void)playRecorded:(NSString *)recordedId` deprecated in `USUstreamPlayer` in favor of `- (void)playMedia:(USMediaDescriptor *)mediaDescriptor`.
- Improved the quality of stream versions targeted for low bandwidth networks.
- Starting playback with a stream version that fits better to network conditions.
- We fixed a bug related to subtitle handling.

[1.4]: ../1.4/
