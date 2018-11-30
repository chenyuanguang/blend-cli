let config=require("./config")
let fs=require("fs")
let deviceHtml={
    mobile(){
        let str=`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" href="/static/css/reset.css">
                <script>
                    function Rem() {
                            if (document.documentElement.clientWidth >= ${config.device.width}) {
                            console.log(document.documentElement.clientWidth)
                                document.documentElement.style.width = ${config.device.width};
                
                                document.documentElement.style.fontSize = rem + 'px';
                                // document.body.style.fontSize = rem + 'px';
                            } else if (document.documentElement.clientWidth <= 320) {
                                document.documentElement.clientWidth = 320;
                                document.documentElement.style.fontSize = rem + 'px';
                                // document.body.style.fontSize = rem + 'px';
                            }else{
                            var rem = document.documentElement.clientWidth / ${config.device.width}*100;
                                document.documentElement.style.fontSize = rem + 'px';
                            }
                        }
                        Rem()
                        window.onresize = function() {
                            Rem();
                        };
                </script>
                <title>Document</title>
            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>`
            fs.writeFile('./src/index.html', str, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
        },
    pc(){
        let str=`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" href="/static/css/reset.css">
                <title>Document</title>
            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>`
            fs.writeFile('./src/index.html', str, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
    }
}


module.exports=config.device.type=="mobile"?deviceHtml.mobile:deviceHtml.pc