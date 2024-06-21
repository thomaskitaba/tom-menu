export const checkEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};


export const checkTextExist = (text) => {
  if (text.length > 0) {
    return (true);
  }
  return (false);

}

export const checkPhone = (phone) => {
  if (phone.length < 8) {
    return(false);
  }
  return (true);
}