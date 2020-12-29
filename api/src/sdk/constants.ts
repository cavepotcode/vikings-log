 
export class StatusConstants {
  static ACTIVE: string = 'ACTIVE';
  static UNVALIDATED: string = 'UNVALIDATED';
  static DELETED: string = 'DELETED';
  static REJECTED: string = 'REJECTED';
  static DISABLED: string = 'DISABLED';
}

export class ResponseCode {
  static OK = 0;
  static ERROR = 1;
  static WARNING = 2;
}

export class LevelsCode {
  static INFO = 'info';
  static ERROR = 'error';
  static WARNING = 'warning';
}
export const levels = [LevelsCode.INFO, LevelsCode.ERROR, LevelsCode.WARNING];

