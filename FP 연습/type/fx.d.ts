import { CurriedFunction2, CurriedFunction3 } from "lodash";
import { ErrorCheckType, FormErrorChecker, FormErrorInfo } from "../fx";
import { AxiosError } from "axios";

export interface errorChecker {
  (t: any): FormErrorChecker[];
}

export interface generateErrorCheckr {
  (errorChecker: FormErrorInfo[]): FormErrorChecker[];
}

export interface parsedFormatter {
  (errorChecker: FormErrorInfo): FormErrorChecker;
}

export interface curreidFormError {
  (fieldOption: FormErrorInfo, setError: Error): CurriedFunction2<
    FormErrorInfo,
    Error,
    void
  >;
}

export interface isFormErrorMatching {
  (reg: RegExp, error: AxiosError): CurriedFunction2<
    RegExp,
    AxiosError,
    boolean
  >;
}

export interface curriedHandleFormError {
  (
    formCheckers: FormErrorChecker[],
    setError: Error,
    error: AxiosError
  ): CurriedFunction3<FormErrorChecker[], Error, AxiosError, void>;
}

export interface curriedFormErrorMatch {
  (errorCheckers: ErrorCheckType[], error: AxiosError): CurriedFunction2<
    ErrorCheckType[],
    AxiosError,
    boolean
  >;
}
