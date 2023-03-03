export const checkLogIn = () => {
    const memberId = getCookie("memberId");

    if(memberId){
        return true;
    }else{
        return false;
    }
}

export const getCookie = (name) => { 
    let value;
    console.log("전체쿠키");
    console.log(document.cookie);
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {
        const _cookie = cookie.trim();
        if(_cookie.startsWith(name+"=")){
            value = cookie.substring(name.length + 1);
        }
    });
    console.log(name + "의 cookie=" + value);
    return value;
}

export const deleteCookie = (name) => {
    console.log("delete cookie.. "+name);
    console.log(document.cookie)
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
