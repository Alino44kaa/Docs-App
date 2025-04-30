import { Request, Response } from 'express';
import {
  handleSuccessResponse,
  handleErrorResponse,
} from '../utils/handleResponse.js';
import {
  changePasswordRequest,
  createRegisteredUserRequest,
  loginUserRequest,
  refreshTokenRequest,
} from '../services/authServices.js';

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      throw { code: 400, message: 'Требуются имя и пароль.' };
    }

    const { user, accessToken, refreshToken } =
      await createRegisteredUserRequest(name, password);
    handleSuccessResponse(res, {
      user: { id: user.id, name: user.name },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Не удалось зарегистрировать пользователя.',
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      throw { code: 400, message: 'Требуются имя и пароль.' };
    }

    const { accessToken, refreshToken, user } = await loginUserRequest(
      name,
      password
    );
    handleSuccessResponse(res, { accessToken, refreshToken, user });
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Не удалось войти.',
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw { code: 400, message: 'Требуется обновить токен.' };
    }

    const tokens = await refreshTokenRequest(refreshToken);
    handleSuccessResponse(res, tokens);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Не удалось обновить токен.',
    });
  }
};

const getProfile = (req: Request, res: Response) => {
  const user = (req as any).user;

  handleSuccessResponse(res, { id: user.id, name: user.name });
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { oldPassword, newPassword } = req.body;

    await changePasswordRequest(userId, oldPassword, newPassword);

    handleSuccessResponse(res, { message: 'Пароль успешно изменен.' });
  } catch (error) {
    handleErrorResponse({ res, error, message: 'Не удалось сменить пароль.' });
  }
};

export { registerUser, loginUser, refreshToken, getProfile, changePassword };
