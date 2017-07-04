/**
 * "To Do List" main controller
 *
 * author: ldw
 * date: 2017.06.20
 */

// 중요도 문자열 enum
var INPORTANCE = {
    0: '매주중요',
    1: '중요',
    2: '보통'
};

// filter 전역변수
var FILTER = {
    importance: [],
    status: []
};

// 초기 데이터 입력
function initData(dataList) {
    $('.list-area ul').html('');

    if (!dataList || !dataList.length) {
        return;
    }

    var len = dataList.length,
        i,
        data,
        elemStr = '';

    for (i = 0; i < len; i++) {
        data = dataList[i];
        elemStr += '<li class="item" id="' + data.id + '">'
                    + '<div class="todo-check">'
                        + '<input type="checkbox" id="check_' + data.id + '" ' + (data.status ? 'checked' : '') + '/><label for="check_' + data.id + '"></label>'
                    + '</div>'
                    + '<div>'
                        + '<small>중요도: ' + INPORTANCE[data.importance] + '</small>'
                        + '<small>추가일: ' + lib.getDateFormat(data.date) + '</small>'
                        + '<div class="todo-tit ' + (data.status ? 'selected' : '') + '">' + data.content + '</div>'
                    + '</div>'
                    + '<div class="drag-area"></div>'
                + '</li>';
    }
    $('.list-area ul').html(elemStr);

    initSortable();
    bindCheckboxEvent();
}

// 드래그 앤 드롭 설정
function initSortable() {
    // jQuery UI sortable 사용
    $('.list').sortable({
        axis: 'y',
        handle: '.drag-area',
        update: function (e, ui) {
            var itemData = DATA_CONT.getToDoItemData(ui.item.attr('id')),
                order = $('.list-area ul li').index(ui.item);
            DATA_CONT.updateToDoItemOrder(itemData.order, order);
        }
    });
}

// checkbox event bind
function bindCheckboxEvent() {
    // checkbox 활성화 시 line through 처리
    $('.todo-check input').on('change', function (e) {
        var $target = $(e.target),
            itemElem = $target.closest('li');
        itemElem.find('.todo-tit').toggleClass('selected');

        DATA_CONT.updateToDoItemStatus(itemElem.attr('id'), itemElem.find('input[type="checkbox"]').is(':checked'));
    });
}

// item 추가
function addToDoItem() {
    var importanceElem = $('header .selectbox select'),
        contentElem = $('header .input-text'),
        importance = importanceElem.val(),
        content = contentElem.val();
    
    if (!content || content.length == 0) {
        alert('할 일을 입력하세요.');
        return;
    }
    if (!importance) {
        importance = 2;
    }

    DATA_CONT.addToDoItemData(importance, content);
    
    importanceElem.val('');
    contentElem.val('');

    initData(DATA_CONT.getToDoListData(FILTER));
}

// input box keydown event bind
function bindInputEvent() {
    $('.input-text').on('keydown', function (e) {
        // enter key 입력시 item 추가
        if (e.keyCode === 13) {
            addToDoItem();
        }
    });
}

// 추가 버튼 event bind
function bindAddButtonEvent() {
    $('.btn-search').click(function () {
        addToDoItem();
    });
}

// 중요도 필터 버튼 event bind
function bindImportanceButtonEvent() {
    $('#importance button').click(function (e) {
        var $target = $(e.target);
            importance = $target.data('value');
        if (importance === -1) {
            $('#importance button').removeClass('active');
            FILTER.importance = [];
        } else {
            $('#importance button').eq(0).removeClass('active');
            FILTER.importance.push(importance);
        }
        $target.addClass('active');
        initData(DATA_CONT.getToDoListData(FILTER));
    });
}

// 상태 필터 버튼 event bind
function bindStatusButtonEvent() {
    $('#status button').click(function (e) {
        var $target = $(e.target),
            status = $target.data('status');
        if (status === -1) {
            $('#status button').removeClass('active');
            FILTER.status = [];
        } else {
            $('#status button').eq(0).removeClass('active');
            FILTER.status.push(status);
        }
        $target.addClass('active');
        initData(DATA_CONT.getToDoListData(FILTER));
    });
}


$(function() {
    // 초기화
    initData(DATA_CONT.getToDoListData());

    // event bind
    bindInputEvent();
    bindAddButtonEvent();
    bindImportanceButtonEvent();
    bindStatusButtonEvent();
});
