export const isEmpty = (data) => {
  return /^\s*$/.test(data);
};

export const isEmail = (email)=>{
    if(isEmpty(email)){
        return false
    }
    return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)
}

export const isNumber = (number)=>{
    if(isEmpty(number)){
        return false
    }
    return (/^[0-9]\d*$/).test(number)
}
export const isStrongPassword = (password)=>{
    if(isEmpty(password)){
        return false
    }
    return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/).test(password)
}
