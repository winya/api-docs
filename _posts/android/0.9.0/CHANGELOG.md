# Changelog

## [0.9.2] - 2017-07-20
### Changed
- MetaData class' `mediaDate` field's value is now always in UTC timezone. Previously it was PST for *RECORDED* and UTC for *LIVE*.
- In a scenario when the client is connected to an offline channel (the SDK is in the `WaitingForContent` state) and the channel goes live.
    The `mediaDate` is now updated with the new value.
- Disabled eCDN support for now.

## [0.9.0] - 2017-07-04
### Added
- Support for multiple players on the same Activity. In order for this to work the API had to be changed.
    More specifically, the creation of the player changed from `PlayerView.getUstreamPlayer()` to a Factory based implementation:
    ```java
    private final UstreamPlayerFactory ustreamPlayerFactory = new UstreamPlayerFactory(USTREAM_PLAYER_SDK_KEY, context);
    // Where playerId is the identifier of our player. Must be persisted in order to retrieve the same instance 
    // in case of a configuration change.
    // IUstreamPlayer interface is changed to UstreamPlayerAndroid.
    UstreamPlayerAndroid ustreamPlayer = ustreamPlayerFactory.createUstreamPlayer(playerId);
    if (!ustreamPlayer.isInitialized()) {
        ustreamPlayer.initWithContent(contentDescriptor);
    }
    ...
    ```
    The `playerView` must be set along with the listeners.
    This enables the player to be initialized (and to be buffered) without a view to render on.
    This can come in handy when implementing a news feed like application, where the content is in a `RecyclerView`.
    It can reduce the time your users need to wait in order to see the video.
    ```java
    ...
    ustreamPlayer.setPlayerListener(listener);
    ustreamPlayer.setErrorListener(errorListener);
    ...
    ustreamPlayer.setPlayerView(playerView);
    ustreamPlayer.attach();
    ```
    For further information, see the documentation.
- Support for eCDN.

### Changed
- Various bugfixes include:
    - Inconsistent player init when a process is restarted from `savedInstanceState` by the Android framework.
      After a process restart the player is no longer implicitly initialized.
      Calling `ustreamPlayer.isInitialized()` will return `false`, and the player needs to be initialized manually.
    - No more crash if the Activity's context is `ContextThemeWrapper`.
    - No more crash on certain devices on Android 4.2 with Qualcomm 800 SoCs, where the renderer reported negative video size.

## [0.7.0] - 2017-05-15
### Changed
- Joda-Time dependency has been removed from the sample application (was added in [0.5.0])

## [0.6.0] - 2017-04-19
### Added
- Track selection API:
    - Ability to manage subtitles, audio, video tracks
    - Ability to select specific video formats (resolution, bitrate)
	- Track selection example in the sample application
	- Default subtitles are selected and displayed by default

## [0.5.1] - 2017-03-01
### Changed
- Sample application dependencies changed: Joda-Time added.
- Player SDK deployment moved from local Maven repo to AAR file. We are switching to the simple AAR file deploy until
a proper artifact repository is available.
- Bug fixes and stability improvements

### Removed
- Removed Joda-Time dependency from the user facing interface for greater flexibility. Though Joda-Time is still used
inside the Player SDK for now, therefore it must be included as a dependency.

## [0.4.0] - 2016-05-31
### Added
- Added `IUstreamPlayer.isInitialized()` method to check whether the player is already initialized. This is most useful
on a configuration change event. The information representing the init state of the player does not need to be manually
saved anymore.

### Changed
- Tweaks around `IUstreamPlayer.destroy()`. This is not bound to Android lifecycle anymore, can be called anywhere
after initialization.
- Bugfixes and stability improvements

[0.9.2]: ../0.9.0/
[0.9.0]: ../0.9.0/
[0.7.0]: ../0.7.0/
[0.6.0]: ../0.6.0/
[0.5.1]: ../0.5.0/
[0.4.0]: ../0.4.0/
