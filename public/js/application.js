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
                }, 20000);
            },
            Post: function (page="") {
                let data = {
                    'year':$("#year").val(),
                    'month':$("#month").val(),
                    'page': page
                };
                let paging = {};
                var request = $.ajax({
                    url: '/subscribers',
                    type: 'POST',
                    data: data
    
                });
                request.done(function (response) {
                    let subscribers = response.data;
                    let rows = subscribers.data;
                    paging = {
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
                    if(jqXHR.status === 422 || jqXHR.status === 400){
                        let errors = App.ObjectToArray(jqXHR.responseJSON.errors);
                        let errorResponse={
                           'message': jqXHR.responseJSON.message,
                           'errors': errors
                        };
                        paging = {
                            'totalSubscriber': 0,
                            'prev': null,
                            'currentPage': "",
                            'lastPage':  null,
                            'next': null
                        };
                        App.loadTemplate("error-wrapper","tmpl-errors",errorResponse);
                        App.loadTemplate("top-paging-wrapper","tmpl-subscriber-paging",paging);
                        App.loadTemplate("list-of-subscriber","tmpl-nodata",null);
                        App.loadTemplate("bottom-paging-wrapper","tmpl-subscriber-paging",paging);
                    }else{
                        alert("Something went wrong. Please reload the page and try again.");
                    }
                });
                request.always(function () {
                    App.RemoveMessage('error-wrapper');
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
                $("#reset-birth-filter-form").on("click",function(){
                    $("#birth-filter-form")[0].reset();
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
