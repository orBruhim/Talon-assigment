export interface TalonEvent {
  user: TalonUser;
  os: TalonOs;
  eventType: TalonEventType;
  severity: TalonSeverity;
  time: string;
}

export interface TalonUser {
  email: string;
  password: string;
}

export type TalonOs = 'windows' | 'mac' | '';

export type TalonSeverity = 'high' | 'medium' | 'low' | '';

export type TalonEventType =
  | 'login'
  | 'logout'
  | 'openBrowser'
  | 'fileDownload'
  | 'fileUpload'
  | '';
