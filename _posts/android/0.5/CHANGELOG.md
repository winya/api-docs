# Changelog

## [0.5.0] - 2017-02-09
### Changed
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

[0.5.0]: ../0.5/
[0.4.0]: ../0.4/
