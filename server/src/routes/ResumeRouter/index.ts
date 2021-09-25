import fs from 'fs';
import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { StatusCodes } from 'http-status-codes';
import { getPrivatePath } from '@shared/utils/GetPrivatePath';
import type { AuthRequestType } from './types';

const router = Router();
const { NO_CONTENT, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = StatusCodes;

const validKeyArray = fs.readFileSync(`${getPrivatePath()}/resume/authKeyList.txt`).toString().split('\n');
const paramError = { error: "The 'authKey' parameter is required." };
const authKeyError = { error: "Provided 'authKey' is not authorised." };

router.post('/auth', (req: Request, res: Response) => {
  const authRequest = req.body as AuthRequestType;
  if (authRequest.authKey === undefined) {
    return res.status(UNPROCESSABLE_ENTITY).contentType('json').send(JSON.stringify(paramError)).end();
  }
  const key = authRequest.authKey;
  if (validKeyArray.indexOf(key) > -1) {
    return res.status(NO_CONTENT).contentType('json').end();
  } else {
    return res.status(UNAUTHORIZED).contentType('json').send(JSON.stringify(authKeyError));
  }
});

router.post('/download', (req: Request, res: Response) => {
  const authRequest = req.body as AuthRequestType;

  if (authRequest.authKey === undefined) {
    return res.status(UNPROCESSABLE_ENTITY).contentType('json').send(JSON.stringify(paramError)).end();
  }
  const key = authRequest.authKey;
  if (validKeyArray.indexOf(key) > -1) {
    return res.download(`${getPrivatePath()}/resume/resume.pdf`);
  } else {
    return res.status(UNAUTHORIZED).contentType('json').send(JSON.stringify(authKeyError));
  }
});

export default router;
