var Ajax = null;
jQuery(function ($) {
    'use strict';
    Ajax = {

        url: 'error',
        type: 'GET',
        data: 'Jones=1',
        dataType: 'JSON',
        ProcessStatus: function (status = true) {
            if (status == true) {
                $('body').addClass('ajax-loader');
            } else {
                $('body').removeClass('ajax-loader');
            }
        },
        Get: function (action, data, responseHandler) {
            Ajax.ProcessStatus(true);
            var request = $.ajax({
                url: action,
                type: 'GET',
                data: data,
                dataType: 'JSON',
                contentType: "application/json"
            });
            request.done(function (response) {
                Request[responseHandler].apply(this, [{
                    "response": response,
                    "success": true
                }]);
            });
            request.fail(function (jqXHR, textStatus) {
                if (jqXHR.status === 403 && textStatus === "error") {
                    location.reload();
                } else if (jqXHR.status === 400) {
                    Request[responseHandler].apply(this, [{
                        "response": jqXHR.responseJSON,
                        "success": false
                    }]);
                } else {
                    Request[responseHandler].apply(this, [{
                        "response": jqXHR.responseJSON,
                        "success": false
                    }]);
                }
            });
            request.always(function () {
                Ajax.ProcessStatus(false);
            });
        },
        Post: function (el, data, responseHandler, custom) {
            Ajax.ProcessStatus(true);
            if (custom === false) {
                Ajax.url = el.attr("action");
            }
            var request = $.ajax({
                url: Ajax.url,
                type: 'POST',
                data: data

            });
            request.done(function (response) {
                Request[responseHandler].apply(this, [{
                    "element": el,
                    "response": response,
                    "success": true
                }]);
            });
            request.fail(function (jqXHR, textStatus) {
                if (jqXHR.status === 403 && textStatus === "error") {
                    location.reload();
                } else {
                    Request[responseHandler].apply(this, [{
                        "element": el,
                        "response": jqXHR.responseJSON,
                        "success": false,
                        "message": "Action has been failed to perform"
                    }]);
                }
            });
            request.always(function () {
                Ajax.ProcessStatus(false);
            });
        }
    };
});
