var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
/*var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
}

app.get('/*', renderIndex);*/
var router = express.Router();
router.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.use('/', router);
var dbstring = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://heroku_cb2hb6wm:5plmn61cgsp0l5roqa2qh83mgk@ds011439.mlab.com:11439/heroku_cb2hb6wm';
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});
mongoose.connect(dbstring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + dbstring + '. ' + err);
    }
    else {
        console.log('Successfully connected to: ' + dbstring);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE9BQU8sV0FBVyxTQUFTLENBQUMsQ0FBQztBQUNwQyxJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixJQUFJLElBQUksR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDNUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDcEIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3hDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVuQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVsRTs7Ozs2QkFJNkI7QUFHN0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDL0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFHckIsSUFBSSxRQUFRLEdBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztJQUN2Qiw4RkFBOEYsQ0FBQztBQUVuRyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUMxQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3BDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNqRSxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7SUFDdkMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUUsdUJBQXVCLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFFLDZCQUE2QixHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBSXZELENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcbnZhciBwb3J0OiBudW1iZXIgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XHJcbnZhciBhcHAgPSBleHByZXNzKCk7XHJcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcclxudmFyIG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuXHJcbmFwcC51c2UoJy9hcHAnLCBleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnYXBwJykpKTtcclxuYXBwLnVzZSgnL2xpYnMnLCBleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbGlicycpKSk7XHJcblxyXG4vKnZhciByZW5kZXJJbmRleCA9IChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XHJcbiAgICByZXMuc2VuZEZpbGUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSk7XHJcbn1cclxuXHJcbmFwcC5nZXQoJy8qJywgcmVuZGVySW5kZXgpOyovXHJcblxyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci5nZXQoJy8qJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgcmVzLnNlbmRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJykpO1xyXG59KTtcclxuXHJcbmFwcC51c2UoJy8nLCByb3V0ZXIpO1xyXG5cclxuXHJcbnZhciBkYnN0cmluZyA9XHJcbiAgICBwcm9jZXNzLmVudi5NT05HT0xBQl9VUkkgfHxcclxuICAgIHByb2Nlc3MuZW52Lk1PTkdPSFFfVVJMIHx8XHJcbiAgICAnbW9uZ29kYjovL2hlcm9rdV9jYjJoYjZ3bTo1cGxtbjYxY2dzcDBsNXJvcWEycWg4M21na0BkczAxMTQzOS5tbGFiLmNvbToxMTQzOS9oZXJva3VfY2IyaGI2d20nO1xyXG5cclxudmFyIHNlcnZlciA9IGFwcC5saXN0ZW4ocG9ydCwgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaG9zdCA9IHNlcnZlci5hZGRyZXNzKCkuYWRkcmVzcztcclxuICAgIHZhciBwb3J0ID0gc2VydmVyLmFkZHJlc3MoKS5wb3J0O1xyXG4gICAgY29uc29sZS5sb2coJ1RoaXMgZXhwcmVzcyBhcHAgaXMgbGlzdGVuaW5nIG9uIHBvcnQ6JyArIHBvcnQpO1xyXG59KTtcclxuXHJcbm1vbmdvb3NlLmNvbm5lY3QoZGJzdHJpbmcsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xyXG4gICAgICBpZiAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nICgnRVJST1IgY29ubmVjdGluZyB0bzogJyArIGRic3RyaW5nICsgJy4gJyArIGVycik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nICgnU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0bzogJyArIGRic3RyaW5nKTtcclxuLyogICAgICBuZXdJdGVtLnNhdmUobmV3SXRlbSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnIFRoaXMgaXMgdGhlIGluc2VydGVkIGRhdGEnICsgbmV3SXRlbSk7Ki9cclxuICAgICAgfVxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
