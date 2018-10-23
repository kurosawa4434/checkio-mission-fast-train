//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {

        var $tryit;
        var io = new extIO({
            multipleArguments: false,
            functions: {
                js: 'fastTran',
                python: 'fast_train'
            },
        });
        io.start();
    }
);
