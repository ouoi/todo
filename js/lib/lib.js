/**
 * custom library
 *
 * author: ldw
 * date: 2017.06.20
 */

var lib = {
    // 한자릿수 숫자를 두자릿수 문자열로 변환
    getTwoDigit: function (num) {
        return (num < 10 ? '0' : '') + num;
    },

    // time을 날짜 형식 문자열로 변환 (yyyy.MM.DD)
    getDateFormat: function (date) {
        var dateObj = new Date(date);
        return dateObj.getFullYear() + '.' + this.getTwoDigit(dateObj.getMonth() + 1) + '.' + this.getTwoDigit(dateObj.getDate());
    }
};