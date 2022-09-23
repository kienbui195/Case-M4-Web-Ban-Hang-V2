
export let checkRegisterUser = (password: string) => {
    let checkPassword1: RegExp = /^(?=.{6,}).*$/; //it nhat 6 ki tu
    let result1 = checkPassword1.test(password);

    let checkPassword2: RegExp = /^(?=.*\d+).*$/; //co it nhat 1 chu so
    let result2 = checkPassword2.test(password);

    let checkPassword3: RegExp = /^(?=.*[a-z]+).*$/ //chua it nhat 1 chu in Hoa
    let result3 = checkPassword3.test(password);

    let checkPassword4: RegExp = /^(?=.*[^a-zA-Z0-9])[ -~]+$/ //chua it nhat 1 ki tu dac biet, bao gom ca dau cach
    let result4 = checkPassword4.test(password);
    
    if (result1 && result2 && result3 && result4)
        return true;
    else
        return false;
}
