export type ErrorCheckType = (code: string) => boolean;

export interface FormErrorInfo {
  name: string;
  type?: string;
  message: string;
  shouldFocus?: boolean;
  reg: ErrorCheckType;
  customHandle?: (error: any) => void;
}

export interface FormErrorChecker extends FormErrorInfo {
  handle: (setError: any) => void;
}
