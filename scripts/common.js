export const checkLogIn = () => {
    const memberId = getCookie("memberId");

    if (memberId) {
        return true;
    } else {
        return false;
    }
}

export const getCookie = (name) => {
    let value;
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {
        const _cookie = cookie.trim();
        if (_cookie.startsWith(name + "=")) {
            value = _cookie.substring(name.length + 1);
        }
    });
    return value;
}

export const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export const setPageInformation = (currentPage, pageRangeSize, size, totalCount) => { //rangeSize 한 화면에 보여지는 페이지 갯수 ex. < 5 6 7 8 9 >
    const totalPageCount = Math.ceil(totalCount / size);

    const range = Math.floor((currentPage-1) / pageRangeSize) + 1; // 현재 페이지가 속해있는 페이지의 범위
    const startPage = (range - 1) * pageRangeSize + 1;
    let endPage = startPage + pageRangeSize - 1;

    if (endPage > totalPageCount) {
        endPage = totalPageCount;
    }

    const hasPrevPage = endPage / pageRangeSize > 1 ? true : false;
    const hasNextPage = endPage < totalPageCount ? true : false ;

    const result = {
        currentPage: currentPage,
        totalPageCount : totalPageCount,
        startPage : startPage,
        endPage: endPage,
        hasPrevPage : hasPrevPage,
        hasNextPage : hasNextPage
    }

    return result;
}
