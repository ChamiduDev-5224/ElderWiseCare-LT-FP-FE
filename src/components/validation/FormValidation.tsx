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
  
    // if (value === null || value === undefined) return true;
    // if (typeof value === 'string' && value.trim() === '') return true;
    // if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    // if (Array.isArray(value) && value.length === 0) return true;
    // return false;
};