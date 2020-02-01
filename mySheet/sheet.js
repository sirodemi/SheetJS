
        var X = XLSX;

        // ファイル選択時のメイン処理
        function handleFile(e) {

            var files = e.target.files;
            var f = files[0];

            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var wb;
                var arr = fixdata(data);
                wb = X.read(btoa(arr), {
                    type: 'base64',
                    cellDates: true,
                });

                var output = "";
                output = to_json(wb);

                /////////////////////////////////   ここでデータを取り出す   ////////////////////////////////////////
                for (var item in output) {
                    console.log("output:",output,"    item: ",item)
                    for (var subItem in output[item]) {
                        console.log("output[item]:",output[item],"    subItem:",subItem)
                        if (typeof output[item][subItem] === 'object') {
                            for (var sub2Item in output[item][subItem]) {
                                console.log(item + ': ' + subItem + ': ' + sub2Item
                                    + ': ' + output[item][subItem][sub2Item])
                            }
                        }
                        else {
                            console.log(item + ': ' + subItem + ': ' + output[item][subItem])
                        }
                    }
                }

                var sheet = new Array(10);
                for(let y = 0; y < 10; y++) {
                    sheet[y] = new Array(10).fill(0);
                }

                for(j=0;j<8;j++){
                    for(i=0;i<10;i++){
                        if(output.math[j][i] != undefined){
                            sheet[j][i] = output.math[j][i];
                        }
                    }
                }

                for(j=0;j<10;j++){
                    for(i=0;i<10;i++){
                        console.log(sheet[j][i]);
                    }
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////////





                $("pre#result").html(JSON.stringify(output, null, 2));

            };
            reader.readAsArrayBuffer(f);
        }

        // ファイルの読み込み
        function fixdata(data) {
            var o = "",
                l = 0,
                w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w,
                l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        }

        // ワークブックのデータをjsonに変換
        function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = X.utils.sheet_to_json(
                    workbook.Sheets[sheetName],
                    {
                        raw: true,
                    });
                    
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }

        // 画面初期化
        $(document).ready(function () {

            // ファイル選択欄 選択イベント
            // http://cccabinet.jpn.org/bootstrap4/javascript/forms/file-browser
            $('.custom-file-input').on('change', function (e) {
                handleFile(e);
                $(this).next('.custom-file-label').html($(this)[0].files[0].name);
            })
        });
