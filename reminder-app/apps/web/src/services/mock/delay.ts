export const wait = (ms = 300): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
