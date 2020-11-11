import { render } from './render';

export const renderLoading = (ctx) => {
  return render({
    ...ctx,
    loading: true,
  });
};
