import { Handler } from "express";
import { resHelper } from "../helpers/res.helper";
import validation from "../helpers/validation";

export const validateReq: Handler = (req, resF, next) => {
  const res = resHelper(resF);
  console.log(req);
  const path = req.path.replace("/", "") as keyof typeof validation;

  if (!validation[path]) return next();

  validation[path]
    .isValid(req.body)
    .then((valid) => (console.log(req.body), valid ? next() : res()))
    .catch(() => res());
};
