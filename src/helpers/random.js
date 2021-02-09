

export const generateId = () => {
  var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var text = "";

  for (var i = 0; i < 8; i++) {
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }

  return text;
};