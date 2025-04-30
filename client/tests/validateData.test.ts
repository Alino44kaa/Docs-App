import validateData from '@/utils/validateData';

describe('validateData', () => {
  describe('name validation', () => {
    it('passes with valid name', () => {
      const data = { name: 'John123' };
      expect(() => validateData(data)).not.toThrow();
    });

    it('throws error if name is missing or empty', () => {
      const data1 = { name: '' };
      const data2 = { name: '   ' };
      expect(() => validateData(data1)).toThrow('Требуется имя');
      expect(() => validateData(data2)).toThrow('Требуется имя');
    });

    it('throws error if name is too short', () => {
      const data = { name: 'A' };
      expect(() => validateData(data)).toThrow(
        'Имя должно быть длиной не менее 2 символов.'
      );
    });

    it('throws error if name is too long', () => {
      const data = { name: 'A'.repeat(21) };
      expect(() => validateData(data)).toThrow(
        'Имя не должно превышать 20 символов.'
      );
    });

    it('throws error if name contains invalid characters', () => {
      const data = { name: 'John@Doe' };
      expect(() => validateData(data)).toThrow(
        'Имя может содержать только буквы, цифры и символы подчеркивания.'
      );
    });
  });

  describe('password validation', () => {
    it('passes with valid password', () => {
      const data = { password: 'Password123' };
      expect(() => validateData(data)).not.toThrow();
    });

    it('throws error if password is missing or empty', () => {
      const data1 = { password: '' };
      const data2 = { password: '   ' };
      expect(() => validateData(data1)).toThrow('Требуется пароль');
      expect(() => validateData(data2)).toThrow('Требуется пароль');
    });

    it('throws error if password is too short', () => {
      const data = { password: 'Pass123' };
      expect(() => validateData(data)).toThrow(
        'Пароль должен быть длиной не менее 8 символов.'
      );
    });

    it('throws error if password is too long', () => {
      const data = { password: 'a1'.repeat(26) };
      expect(() => validateData(data)).toThrow(
        'Пароль не должен превышать 50 символов.'
      );
    });

    it('throws error if password lacks lowercase letter', () => {
      const data = { password: 'PASSWORD123' };
      expect(() => validateData(data)).toThrow(
        'Пароль должен содержать хотя бы одну строчную букву.'
      );
    });

    it('throws error if password lacks number', () => {
      const data = { password: 'Password' };
      expect(() => validateData(data)).toThrow(
        'Пароль должен содержать хотя бы одну цифру'
      );
    });
  });

  it('does not throw if neither name nor password is provided', () => {
    const data = { otherField: 'value' };
    expect(() => validateData(data)).not.toThrow();
  });
});
