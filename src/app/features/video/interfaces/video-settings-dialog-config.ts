/**
 * Interface representing a video settings dialog configuration.
 */
export interface VideoSettingsDialogConfig {
  id: string;
  title: string;
  values: string[] | number[];
  isSelected: (value: number) => void;
  onClick: (value: number) => void;
}
