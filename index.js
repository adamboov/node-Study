// 1.加载http模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
// 2.创建服务
http.createServer(function(req, res) {
    //为res对象添加一个render()函数
    res.render = function(filename) {
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, 'Not Found', { 'Content-Type': 'text/html;charset=utf-8' });
                res.end('404, Not Found!');
                return;
            }
            res.setHeader('Content-Type', mime.getType(filename));
            res.end(data);
        });
    }

    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();
    // 3.根据请求路径，返回对应的html
    if (req.url === '/' || req.url === '/index' && req.method === 'get') {
        // 4.读取index.html 并返回
        // fs.readFile(path.join(__dirname, 'views', 'index.html'), function(err, data) {
        //     if (err) {
        //         throw err;
        //     }
        //     res.end(data);
        // });
        res.render(path.join(__dirname, 'views', 'index.html'));
    } else if (req.url === '/submit' && req.method === 'get') {
        res.render(path.join(__dirname, 'views', 'submit.html'));
    } else if (req.url === '/item' && req.method === 'get') {
        res.render(path.join(__dirname, 'views', 'item.html'));
    } else if (req.url.startsWith('/add') && req.method === 'get') {
        res.render(path.join(__dirname, 'views', 'add.html'));
    } else if (req.url === '/add' && req.method === 'post') {
        res.render(path.join(__dirname, 'views', 'add.html'));
    } else if (req.url.startsWith('/resources') && req.method === 'get') {
        fs.readFile(path.join(__dirname, req.url), function(err, data) {
            if (err) {
                // throw err;
                res.writeHead(404, 'Not Found', { 'Content-Type': 'text/html;charset=utf-8' });
                res.end('404, Not Found!');
                return
            }
            res.setHeader('Content-Type', mime.getType(req.url));
            res.end(data);
        });
    } else {
        res.writeHead(404, 'Not Found', {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end('404, Page Not Found!');
    }
}).listen(8090, function() {
    console.log('http://localhost:8090');
});