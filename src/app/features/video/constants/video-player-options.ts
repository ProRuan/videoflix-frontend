import { VideoPlayerOptions } from '../interfaces';

export const VIDEO_PLAYER_OPTIONS: VideoPlayerOptions = {
  controls: false,
  fluid: false,
  inactivityTimeout: 2000,
  responsive: true,
  autoplay: false,
  muted: false,
  preload: 'auto',
  playsinline: true,
  techOrder: ['html5'],
  sources: [],
  enableDocumentPictureInPicture: true,
  suppressNotSupportedError: false,
  playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
  userActions: {
    hotkeys: true,
  },
  html5: {
    nativeAudioTracks: false,
    nativeVideoTracks: false,
    vhs: {
      useDevicePixelRatio: true,
      enableLowInitialPlaylist: false,
      smoothQualityChange: true,
      handleManifestRedirects: true,
      limitRenditionByPlayerDimensions: true,
    },
  },
};
