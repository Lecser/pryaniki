export const removeCookie = (cName: string) => {
  document.cookie = `${cName}=;expires=${new Date(0)}`;
};
