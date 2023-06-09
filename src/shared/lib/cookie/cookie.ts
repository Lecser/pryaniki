export const cookie = {
  set(cName: string, cValue: string, expDays: number) {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cName}=${cValue}; ${expires}; path=/`;
  },
  get(cName: string) {
    const name = `${cName}=`;
    const cDecoded = decodeURIComponent(document.cookie); // to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  },
  remove(cName: string) {
    document.cookie = `${cName}=;expires=${new Date(0)}`;
  }
};
