import { Request, Response, NextFunction } from "express";
import config from "../config";
import { maxage } from "../utils";

const packageInfo = require("../../package.json");
const baseEntipicUrl = require("entipic.url");

const toWebp = (url: string) => url.replace(/\.jpg$/, ".webp");

const entipicUrl: any = function (
  name: any,
  size?: string,
  lang?: string,
  country?: string
) {
  return toWebp(baseEntipicUrl(name, size, lang, country));
};
entipicUrl.picture = (id: string, size?: string) =>
  toWebp(baseEntipicUrl.picture(id, size));

const util = {
  format: require("util").format
};

export default function (_req: Request, res: Response, next: NextFunction) {
  res.locals.util = util;
  res.locals.entipicUrl = entipicUrl;
  res.locals.site = {
    name: config.name,
    head: {
      title: config.name
    }
  };

  res.locals.project = {
    version: packageInfo.version,
    name: config.name
  };

  maxage(res, 60);

  next();
}
