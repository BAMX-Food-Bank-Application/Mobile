const validateEmail = (_email) => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;    
    return emailRegex.test(_email);
  }


const validatePassword = (_password) => {
/*
    - at least 8 characters
    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    - Can contain special characters
*/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(_password);
}

const validateNumbers = (_number) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(_number);
}

const validateDate = (_date) => {
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return dateRegex.test(_date);
}

module.exports = { validateEmail, validatePassword, validateNumbers, validateDate };