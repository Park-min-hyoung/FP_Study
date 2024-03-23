import { curry, find } from "lodash";

/**
 * @type {import ("./type/fx").curreidFormError}
 */
const curreidFormError = curry(
  ({ name, type, message, shouldFocus }, setError) =>
    setError(name, { type, message }, { shouldFocus })
);

/**
 * @type {import ("./type/fx").parsedFormatter}
 */
const parsedFormatter = (errorChecker) => ({
  ...errorChecker,
  handle: curreidFormError(errorChecker),
});

/**
 * @type {import ("./type/fx").generateErrorCheckr}
 */
const generateErrorCheckr = (errorChecker) => errorChecker.map(parsedFormatter);

/**
 * @type {import ("./type/fx").isFormErrorMatching}
 */
const isFormErrorMatching = curry((reg, error) => reg.test(error || ""));

const C_ERR_DB_ALREADY_EXIST_RECORD_CHECK =
  isFormErrorMatching(/'이미 존재 해유'/);

const C_ERR_DB_ALREADY_EXIST_RECORD_CHECK2 =
  isFormErrorMatching(/'한글로 쓰지 마유'/);

const C_ERR_DB_ALREADY_EXIST_RECORD_CHECK3 =
  isFormErrorMatching(/'공백은 안되유'/);

/**
 * @type {import ("./type/fx").errorChecker}
 */
const errorChecker = (t) =>
  generateErrorCheckr([
    {
      name: "name",
      message: t("errors.ERR_DB_ALREADY_EXIST_RECORD", {
        name: t("common.category"),
      }),
      reg: C_ERR_DB_ALREADY_EXIST_RECORD_CHECK,
    },
  ]);

/**
 * @type {import ("./type/fx").curriedHandleFormError}
 */
const curriedHandleFormError = curry((formCheckers, setError, error) => {
  const formChecker = find(formCheckers, ({ reg }) => reg.test(error));
  if (!formChecker) return;

  formChecker.handle(setError);
  if (formChecker.customHandle) formChecker.customHandle(error);
});

/**
 * @type {import ("./type/fx").curriedFormErrorMatch}
 */
const curriedFormErrorMatch = curry((errorCheckers, error) =>
  errorCheckers.some((handle) => handle(error))
);

const NAME_PIPE = curriedFormErrorMatch([
  C_ERR_DB_ALREADY_EXIST_RECORD_CHECK,
  C_ERR_DB_ALREADY_EXIST_RECORD_CHECK2,
  C_ERR_DB_ALREADY_EXIST_RECORD_CHECK3,
]);

const PASSWORD_PIPE = curriedFormErrorMatch([
  C_ERR_DB_ALREADY_EXIST_RECORD_CHECK,
  C_ERR_DB_ALREADY_EXIST_RECORD_CHECK3,
]);

const validateHandle = curriedFormErrorMatch([NAME_PIPE, PASSWORD_PIPE]);
