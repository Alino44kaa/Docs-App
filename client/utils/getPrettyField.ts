const getPrettyField = (input: string): string => {
  const fieldMap: { [key: string]: string } = {
    title: 'название',
    description: 'описание',
    author: 'агент',
    image: 'URL изображения',
    publisher: 'клиент',
    publishedDate: 'дата публикации',
    infoLink: 'URL дополнительной информации',
    category: 'категории',
    reviewHelpfulness: 'полезность',
    reviewSummary: 'краткое содержание',
    reviewText: 'мнение',
    user: 'пользователь',
    reviewScore: 'рейтинг',
  };

  return fieldMap[input] || input;
};

export default getPrettyField;
