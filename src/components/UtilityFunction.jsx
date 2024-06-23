export const checkEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// returns true if text exists
export const checkTextExist = (text) => {
  if (text.length > 0) {
    return (true);
  }
  return (false);

}

// returns true if phone number is > 8 char
// valid formats
// +1-800-555-5555 (Valid)
// 18005555555 (Valid)
// +44 20 7123 1234 (Valid)
// 020 7123 1234 (Valid)
// +91-9876543210 (Valid)
// 9876543210 (Valid)
// 123-4567 (Valid)
// 0987675678 (Valid)
// 1234567 (Invalid)
// 123-45-678 (Invalid)
// +123 (456) 789-0123 (Valid)
export const checkPhone = (phone) => {
  const phoneRegex = /^(?:\+?\d{1,4}[-.\s]?)?(?:\(?\d{1,3}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return phoneRegex.test(phone);
}
