/**
 * "To Do List" data controller
 *
 * author: ldw
 * date: 2017.06.20
 */

var DATA_CONT = {
    /* 데이터 리스트
     * 기본적으로 서버에서 데이터를 가져와야 하지만 서버가 없기 때문에 임시 테이터를 설정하였습니다.
     * 테이터 구조는 json 형식으로 아래와 같은 필드로 구성을 하였습니다.
     *
     * id: DB에 저장되는 primary key
     * status: 완료 상태 (boolean)
     * importance: 중요도 (0:'매주중요' / 1:'중요' / 2:'보통')
     * date: 추가일
     * content: 내용
     * order: 리스트 순서
     */
    _DATA_LIST: null,

    // 데이터 리스트 가져오기
    getToDoListData: function (filter) {
        if (!this._DATA_LIST) {
            this._DATA_LIST = [
                {
                    id: 1,
                    status: true,
                    importance: 0,
                    date: 1481900400000,
                    content: '세탁소에서 세탁물 찾아오기',
                    order: 0
                }, {
                    id: 2,
                    status: false,
                    importance: 1,
                    date: 1481814000000,
                    content: '두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다. 두줄인 경우 이렇게 텍스트가 자연스럽게 떨어져야 합니다.',
                    order: 1
                }
            ];
        }

        if (filter && filter.importance && filter.status) {
            return this._DATA_LIST.filter(function (item) {
                var resultImportance = true,
                    resultStatus = true;
                if (filter.importance && filter.importance.length > 0) {
                    resultImportance = filter.importance.indexOf(item.importance) > -1;
                }
                if (filter.status && filter.status.length > 0) {
                    resultStatus = filter.status.indexOf(item.status) > -1;
                }
                return resultImportance && resultStatus;
            });
        }
        return this._DATA_LIST;
    },

    // 데이터 가져오기
    getToDoItemData: function (id) {
        return this._DATA_LIST.map(function (item) {
            if (item.id === id) {
                return item;
            }
        });
    },

    // 아이템 추가
    addToDoItemData: function (importance, content) {
        var item = {
            id: this._DATA_LIST.length + 1,
            status: false,
            importance: Number(importance),
            date: new Date().getTime(),
            content: content,
            order: this._DATA_LIST.length
        }
        this._DATA_LIST.push(item);
    },

    // 아이템 status 변경
    updateToDoItemStatus: function (id, status) {
        if (id && status) {
            var item = this.getToDoItemData(id);
            item.status = status;
        }
    },

    // 아이템 순서 변경
    updateToDoItemOrder: function (before, order) {
        var item = this._DATA_LIST.splice(before, 1);
        this._DATA_LIST.splice(order, 0, item[0]);
        this._DATA_LIST.forEach(function (item, i) {
            item.order = i;
        });
    }
};