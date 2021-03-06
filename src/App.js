Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        console.log("launch");
       Rally.data.ModelFactory.getModel({
            type: 'User Story',
            success: this._onModelRetrieved,
            scope: this
        });
    },
    _onModelRetrieved: function(model) {
        console.log("_onModelRetrieved");
        this.model = model;
        this._readRecord(model);
    },
    
     _readRecord: function(model) {
        var id = 13888228557;
        console.log("_readRecord");
        this.model.load(id, {
            fetch: ['Name', 'Defects'],
            callback: this._onRecordRead,
            scope: this
        });
    },
    
    _onRecordRead: function(record, operation) {
        console.log('name...', record.get('Name'));
        console.log('defects...', record.get('Defects'));
        if(operation.wasSuccessful()) {
            //load the store first by passing additional config to the getCollection method
             var defectStore = record.getCollection('Defects', {
                autoLoad: true,
                listeners: { load: function() {
                    //once loaded now do the add and sync
                    defectStore.add({'_ref':'/defect/12353151477'});
                    defectStore.sync({
                        callback: function() {
                            console.log('success');
                        }
                    });
                }}
            });
        }

    }, 
});
