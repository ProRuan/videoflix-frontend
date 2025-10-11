import { computed, inject, Injectable, signal } from '@angular/core';

import { VideoPlayerFacade } from './video-player-facade';

import QualityLevel from 'videojs-contrib-quality-levels/dist/types/quality-level';
import QualityLevelList from 'videojs-contrib-quality-levels/dist/types/quality-level-list';

/**
 * Class representing a quality level controller service.
 *
 * Controls a video´s source and quality levels.
 */
@Injectable({
  providedIn: 'root',
})
export class QualityLevelController {
  private facade = inject(VideoPlayerFacade);

  player = computed(() => this.facade.player());
  sources = computed(() => this.facade.sources());

  hasMasterSource = signal(true);
  qualityLevelList = signal<QualityLevelList | null>(null);
  qualityLevels = signal<QualityLevel[]>([]);
  qualityLevelId = signal(0);
  hasQualityLevels = signal(false);
  optimizingPercent = signal(0);

  /**
   * Check the video´s current quality level by id.
   * @param id - The id to be matched.
   * @returns True if the id matches the current quality level id,
   *          otherwise false.
   */
  isCurrentQualityLevel(id: number) {
    return this.qualityLevelId() === id;
  }

  /**
   * Update the video quality level by id.
   * @param id - The quality level id.
   */
  updateQualityLevel(id: number) {
    this.qualityLevelId.set(id);
    this.facade.pause();
    const currentTime = this.facade.getCurrentTime();
    this.updateSource(id);
    this.updateOptimizingPercent(id);
    this.player()?.load();
    this.player()?.ready(() => {
      this.facade.setCurrentTime(currentTime);
      this.facade.play();
    });
  }

  /**
   * Update the video´s current source.
   * @param id - The quality level id.
   */
  private updateSource(id: number) {
    const source = this.sources()[id];
    const enabled = id === 0 ? true : false;
    this.player()?.updateSourceCaches_(source.src);
    this.hasMasterSource.update(() => enabled);
  }

  /**
   * Update the video´s optimizing percent.
   * @param id - The quality level id.
   * @returns Void if the master source is enabled.
   */
  private updateOptimizingPercent(id: number) {
    if (id === 0) return;
    const levelId = id - 1;
    const level = this.qualityLevels()[levelId];
    const height = document.body.clientHeight;
    const percent = Math.round((level.height / height) * 100);
    this.optimizingPercent.set(percent);
  }

  /**
   * Set the available quality levels.
   * @returns Void if the video quality levels are already set.
   */
  setQualityLevels() {
    if (this.hasQualityLevels()) return;
    const list = this.getQualityLevelList();
    const levels = this.getQualityLevelArrayCopy(list.levels_);
    this.qualityLevels.set(levels);
    this.hasQualityLevels.set(true);
  }

  /**
   * Get a video´s quality level list.
   * @returns The video´s quality level list.
   */
  private getQualityLevelList(): QualityLevelList {
    const player = this.player() as any;
    return player.qualityLevels();
  }

  /**
   * Get a copy from the quality level array.
   * @param levels - The quality level array.
   * @returns The copy from the quality level array.
   */
  private getQualityLevelArrayCopy(levels: QualityLevel[]): QualityLevel[] {
    return levels.map((level: QualityLevel) => this.getQualityLevelCopy(level));
  }

  /**
   * Get a quality level copy.
   * @param level - The quality level.
   * @returns The quality level copy.
   */
  private getQualityLevelCopy(level: QualityLevel): QualityLevel {
    return {
      id: level.id,
      label: level.label,
      width: level.width,
      height: level.height,
      bitrate: level.bitrate,
      frameRate: level.frameRate,
      enabled_: (value?: boolean) => level.enabled_(value),
    };
  }
}
