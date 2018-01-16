# Changelog

## [1.5.1] - 2018-01-16
### Changed
- Improved handling of low network bandwidth related player stall events.

## [1.5] - 2017-12-05
### Added
- Added new property `isLive` and delegate method `- (void)playerLiveStateDidChange:(USUstreamPlayer *)player` for reporting if the player is playing a channel with live content in it.

### Changed
- `isPlayingLiveStream` deprecated in `USUstreamPlayer` in favor of `mediaDescriptor.isChannel`.
- `isLive` deprecated in `USMediaDescriptor` in favor of `isChannel`.
- `+ (instancetype)liveDescriptorWithID:(NSString *)channelID` deprecated in `USMediaDescriptor` in favor of `+ (instancetype)channelDescriptorWithID:(NSString *)channelID`.

## [1.4] - 2017-10-02
### Added
- `USPrebufferingController` to support faster playback start.
- `USMediaDescriptor` to represent a playable content.
- `- (void)playMedia:(USMediaDescriptor *)mediaDescriptor` added to `USUstreamPlayer`.

### Changed
- `- (void)playChannel:(NSString *)channelId` deprecated in `USUstreamPlayer` in favor of `- (void)playMedia:(USMediaDescriptor *)mediaDescriptor`.
- `- (void)playRecorded:(NSString *)recordedId` deprecated in `USUstreamPlayer` in favor of `- (void)playMedia:(USMediaDescriptor *)mediaDescriptor`.
- New sample (Newsfeed Sample) added to demonstrate the usage of `USPrebufferingController`.

## [1.3.2] - 2017-09-12
### Changed
- Improved the quality of stream versions targeted for low bandwidth networks.
- Starting playback with a stream version that fits better to network conditions.
- We fixed a bug related to subtitle handling.

## [1.3] - 2017-07-20
### Added
- Added new property `broadcastStartDate` and delegate method `playerBroadcastStartDateDidChange:` for reporting the start date of live broadcasts.

[1.3]: ../1.3/
[1.3.2]: ../1.3/
[1.4]: ../1.4/
[1.5]: ../1.5/
