var Request = null;
const ACTION_CREATE = 'create';
jQuery(function ($) {
    'use strict';
    Request = {
        
        Init: function () {
            this.CacheElements();
        },
        CacheElements: function () {
            this.$sludgeCollections = $("#form-sludge-collections");
        },
        ShowError:function(data,wrapperId='form-response-wraper'){
            if(data.success == false){
                var data = {
                    'errors': App.ObjectToArray(data.response.errors)
                }
                App.loadTemplate(wrapperId,'tmpl-errors',data);
            }
        },
        SludgeCollectionsRequest:function(data,action = ACTION_CREATE){
            Ajax.PostWithFile(Request.$sludgeCollections,data,"SludgeCollectionsResponse",false);
        },
        SludgeCollectionsResponse:function(data){
            Request.ShowError(data,'modal-message-wrapper');
            if(data.success == true){
                $("#disposalModal").modal('hide');
                var message={
                    'message':data.response.message
                }
                App.loadTemplate('application-message-wrapper','tmpl-success',message);
                App.RemoveMessage('application-message-wrapper');
            }
        }
    };

    Request.Init();
});
