// Email validate
export const isEmail = (val: any): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const res = emailRegex.test(val);
    return res;
}
//password length should be more than 8
export const passwordLength = (val: any): boolean => {
    if (val?.length < 8) {
        return false;
    } else {
        return true
    }
}

// check empty 
export const isEmpty = (value: any): boolean => {
    
    if(value.length>0){

        return false
    } else {
        return true
    }
  
};