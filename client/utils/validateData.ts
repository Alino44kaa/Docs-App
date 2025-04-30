const validateData = (data: Record<string, unknown>): void => {
  if ('name' in data) {
    const name = data.name as string;
    if (!name || name.trim() === '') {
      throw new Error('Требуется имя');
    }
    if (name.length < 2) {
      throw new Error('Имя должно быть длиной не менее 2 символов.');
    }
    if (name.length > 20) {
      throw new Error('Имя не должно превышать 20 символов.');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      throw new Error(
        'Имя может содержать только буквы, цифры и символы подчеркивания.'
      );
    }
  }

  if ('password' in data) {
    const password = data.password as string;
    if (!password || password.trim() === '') {
      throw new Error('Требуется пароль');
    }
    if (password.length < 8) {
      throw new Error('Пароль должен быть длиной не менее 8 символов.');
    }
    if (password.length > 50) {
      throw new Error('Пароль не должен превышать 50 символов.');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Пароль должен содержать хотя бы одну строчную букву.');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Пароль должен содержать хотя бы одну цифру');
    }

    if (/^(.)\1+$/.test(password)) {
      throw new Error('Пароль не может состоять из повторяющихся символов.');
    }
  }
};

export default validateData;
