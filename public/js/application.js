var App = null;

jQuery(function ($) {
    'use strict';
    App = {
            init: function () {
                this.CommonEvents();
            },
            loadTemplate: function (el, temp, data = null) {
                $('#' + el).html(tmpl(temp, data));
            },
            AppendTemplate: function (el, temp, data = null) {
                $('#' + el).append(tmpl(temp, data));
            },
            ObjectToArray: function (obj = {}) {
                var arr = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        arr.push(obj[key]);
                    }
                }

                var merged = arr.reduce(function (prev, next) {
                    return prev.concat(next);
                });

                return merged;
            },
            RemoveMessage: function (elementId) {
                setTimeout(function () {
                    $("#" + elementId).html('');
                }, 5000);
            },
            Post: function (page="") {
                let data = {
                    'year':$("#year").val(),
                    'month':$("#month").val(),
                    'page': page
                };
                var request = $.ajax({
                    url: '/subscribers',
                    type: 'POST',
                    data: data
    
                });
                request.done(function (response) {
                    let subscribers = response.data;
                    let rows = subscribers.data;
                    let paging = {
                        'totalSubscriber': subscribers.total,
                        'prev': subscribers.prev_page_url,
                        'currentPage': subscribers.current_page,
                        'lastPage':  subscribers.last_page,
                        'next': subscribers.next_page_url
                    };
                    App.loadTemplate("top-paging-wrapper","tmpl-subscriber-paging",paging);
                    App.loadTemplate("list-of-subscriber","tmpl-subscribers",rows);
                    App.loadTemplate("bottom-paging-wrapper","tmpl-subscriber-paging",paging);
                });
                request.fail(function (jqXHR, textStatus) {
                    /*if (jqXHR.status === 403 && textStatus === "error") {
                        location.reload();
                    } else {
                        Request[responseHandler].apply(this, [{
                            "element": el,
                            "response": jqXHR.responseJSON,
                            "success": false,
                            "message": "Action has been failed to perform"
                        }]);
                    }*/
                });
                request.always(function () {
                    Ajax.ProcessStatus(false);
                });
            },
            CommonEvents: function () {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                App.Post();

                $("#birth-filter-form").on('submit',function(e){
                    e.preventDefault();
                    App.Post(1);
                });
                
                $(document.body).on("click",".paging-page",function(){
                    let pageUrl = $(this).data('page');
                    let page = 1;
                    if(pageUrl != ""){
                        page = pageUrl.split("subscribers?page=")[1];
                    }
                    App.Post(page);
                });
            }
        };

    App.init();
});
