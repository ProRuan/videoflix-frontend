/**
 * Interface representing a state configuration of a token feedback component.
 */
export interface TokenStateConfig {
  title: string;
  color: string;
  messages: string[];
  primaryText: string;
  secondaryText?: string;
  primaryAction: () => Promise<boolean>;
  secondaryAction?: () => Promise<boolean>;
}
