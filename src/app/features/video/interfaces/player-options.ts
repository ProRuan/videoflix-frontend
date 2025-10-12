import { PlayerSource } from './player-source';

/**
 * Interface representing player options.
 */
export interface PlayerOptions {
  controls: boolean;
  fluid: boolean;
  inactivityTimeout: number;
  responsive: boolean;
  autoplay: boolean;
  muted: boolean;
  preload: string;
  playsinline: boolean;
  techOrder: string[];
  sources: PlayerSource[];
  enableDocumentPictureInPicture: boolean;
  suppressNotSupportedError: boolean;
  playbackRates: number[];
  userActions: {
    hotkeys: boolean;
  };
  html5: {
    nativeAudioTracks: boolean;
    nativeVideoTracks: boolean;
    vhs: {
      useDevicePixelRatio: boolean;
      enableLowInitialPlaylist: boolean;
      smoothQualityChange: boolean;
      handleManifestRedirects: boolean;
      limitRenditionByPlayerDimensions: boolean;
    };
  };
}
