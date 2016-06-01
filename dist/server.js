"use strict";
var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var cors = require('cors');
var router = express.Router();
var Apartment = require('./models/apartment');
var BusinessUnit = require('./models/businessunit');
var Task = require('./models/task');
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
app.use(cors());
var dbstring = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://heroku_d4n6hnhl:q4rfc1uikd51d5sups9mipivnl@ds057254.mlab.com:57254/heroku_d4n6hnhl';
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});
var authCheck = jwt({
    secret: new Buffer('460DPY7Pi4xnRUiirPuEfBdxS4wzQGcx8rlA-Qw76fURkmiwtrhv_IXffzsI84HM', 'base64'),
    audience: '1mvHGykVHvxzpwstp2wTmrzLrpzouVTm'
});
mongoose.connect(dbstring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + dbstring + '. ' + err);
    }
    else {
        console.log('Successfully connected to: ' + dbstring);
    }
    ;
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.get('/app/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
router.get('/api', authCheck, function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/api/apartments')
    .post(function (req, res) {
    var apartment = new Apartment();
    apartment.UnitAddress = req.body.taskname;
    apartment.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Apartment created!' });
    });
})
    .get(function (req, res) {
    Apartment.find({ unitID: { $exists: true }, UnitType: { $exists: true } }, 'unitID UnitType', function (err, apartments) {
        if (err)
            res.send(err);
        res.json(apartments);
    });
});
router.route('/api/apartments/:apartment_id')
    .get(function (req, res) {
    Apartment.findById(req.params.apartment_id, function (err, apartment) {
        if (err)
            res.send(err);
        res.json(apartment);
    });
});
router.route('/api/apartments/getprofile/:userEmail')
    .get(function (req, res) {
    Apartment.find({ userEmail: req.params.userEmail }, '-_id', function (err, apartment) {
        if (err)
            res.send(err);
        res.json(apartment);
    });
})
    .put(function (req, res) {
    Apartment.findById(req.params.apartment_id, function (err, apartment) {
        if (err)
            res.send(err);
        apartment.name = req.body.name;
        apartment.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'apartment updated!' });
        });
    });
})
    .delete(function (req, res) {
    Apartment.remove({
        _id: req.params.apartment_id
    }, function (err, apartment) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});
router.route('/api/businessunits')
    .get(function (req, res) {
    BusinessUnit.find(function (err, businessunits) {
        if (err)
            res.send(err);
        res.json(businessunits);
    });
});
/*Task Endpoints*/
router.route('/api/newtask')
    .post(function (req, res) {
    var task = new Task();
    task.taskname = req.body.taskname;
    task.taskdesc = req.body.taskdesc;
    task.taskstatus = req.body.taskstatus;
    task.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Task created!' });
    });
})
    .get(function (req, res) {
    Task.find(function (err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
});
router.route('/api/newtask/:task_id')
    .get(function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
})
    .put(function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);
        task.name = req.body.name;
        task.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'task updated!' });
        });
    });
})
    .delete(function (req, res) {
    Task.remove({
        _id: req.params.task_id
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});
app.use('/', router);

//# sourceMappingURL=data:application/json;base64,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c2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG52YXIgcG9ydDogbnVtYmVyID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xyXG52YXIgYXBwID0gZXhwcmVzcygpO1xyXG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XHJcbnZhciBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcbnZhciBqd3QgPSByZXF1aXJlKCdleHByZXNzLWp3dCcpO1xyXG52YXIgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG52YXIgQXBhcnRtZW50ID0gcmVxdWlyZSgnLi9tb2RlbHMvYXBhcnRtZW50Jyk7XHJcbnZhciBCdXNpbmVzc1VuaXQgPSByZXF1aXJlKCcuL21vZGVscy9idXNpbmVzc3VuaXQnKTsgXHJcbnZhciBUYXNrID0gcmVxdWlyZSgnLi9tb2RlbHMvdGFzaycpO1xyXG5cclxuYXBwLnVzZSgnL2FwcCcsIGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdhcHAnKSkpO1xyXG5hcHAudXNlKCcvbGlicycsIGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsaWJzJykpKTtcclxuYXBwLnVzZShjb3JzKCkpO1xyXG5cclxudmFyIGRic3RyaW5nID1cclxuICAgIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSB8fFxyXG4gICAgcHJvY2Vzcy5lbnYuTU9OR09IUV9VUkwgfHxcclxuICAgICdtb25nb2RiOi8vaGVyb2t1X2Q0bjZobmhsOnE0cmZjMXVpa2Q1MWQ1c3VwczltaXBpdm5sQGRzMDU3MjU0Lm1sYWIuY29tOjU3MjU0L2hlcm9rdV9kNG42aG5obCc7XHJcblxyXG52YXIgc2VydmVyID0gYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBob3N0ID0gc2VydmVyLmFkZHJlc3MoKS5hZGRyZXNzO1xyXG4gICAgdmFyIHBvcnQgPSBzZXJ2ZXIuYWRkcmVzcygpLnBvcnQ7XHJcbiAgICBjb25zb2xlLmxvZygnVGhpcyBleHByZXNzIGFwcCBpcyBsaXN0ZW5pbmcgb24gcG9ydDonICsgcG9ydCk7XHJcbn0pO1xyXG5cclxudmFyIGF1dGhDaGVjayA9IGp3dCh7XHJcbiAgc2VjcmV0OiBuZXcgQnVmZmVyKCc0NjBEUFk3UGk0eG5SVWlpclB1RWZCZHhTNHd6UUdjeDhybEEtUXc3NmZVUmttaXd0cmh2X0lYZmZ6c0k4NEhNJywgJ2Jhc2U2NCcpLFxyXG4gIGF1ZGllbmNlOiAnMW12SEd5a1ZIdnh6cHdzdHAyd1RtcnpMcnB6b3VWVG0nXHJcbn0pO1xyXG5cclxubW9uZ29vc2UuY29ubmVjdChkYnN0cmluZywgZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgIGlmIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2cgKCdFUlJPUiBjb25uZWN0aW5nIHRvOiAnICsgZGJzdHJpbmcgKyAnLiAnICsgZXJyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2cgKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvOiAnICsgZGJzdHJpbmcpO1xyXG4gICAgICB9O1xyXG59KTtcclxuXHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xyXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuXHJcbnJvdXRlci5nZXQoJy9hcHAvKicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgIHJlcy5zZW5kRmlsZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvYXBpJyxhdXRoQ2hlY2ssIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ2hvb3JheSEgd2VsY29tZSB0byBvdXIgYXBpIScgfSk7XHJcbn0pO1xyXG5cclxuICAgcm91dGVyLnJvdXRlKCcvYXBpL2FwYXJ0bWVudHMnKVxyXG4gICAgLnBvc3QoZnVuY3Rpb24ocmVxLCByZXMpIHsgICAgICAgIFxyXG4gICAgICAgIHZhciBhcGFydG1lbnQgPSBuZXcgQXBhcnRtZW50KCk7XHJcbiAgICAgICAgYXBhcnRtZW50LlVuaXRBZGRyZXNzID0gcmVxLmJvZHkudGFza25hbWU7XHJcblxyXG4gICAgICAgIGFwYXJ0bWVudC5zYXZlKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiAnQXBhcnRtZW50IGNyZWF0ZWQhJyB9KTtcclxuICAgICAgICB9KTtcclxuICB9KVxyXG4gIC8vICAgLmdldChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gIC8vICAgICAgIEFwYXJ0bWVudC5maW5kKGZ1bmN0aW9uKGVyciwgYXBhcnRtZW50cykge1xyXG4gIC8vICAgICAgICAgICBpZiAoZXJyKVxyXG4gIC8vICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuXHJcbiAgLy8gICAgICAgICAgIHJlcy5qc29uKGFwYXJ0bWVudHMpO1xyXG4gIC8vICAgICAgIH0pO1xyXG4gIC8vIH0pO1xyXG5cclxuICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LmZpbmQoe3VuaXRJRDogeyRleGlzdHM6IHRydWV9LCBVbml0VHlwZTogeyRleGlzdHM6IHRydWV9fSwndW5pdElEIFVuaXRUeXBlJyxmdW5jdGlvbihlcnIsIGFwYXJ0bWVudHMpIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcblxyXG4gICAgICAgICAgICByZXMuanNvbihhcGFydG1lbnRzKTtcclxuICAgICAgICB9KTtcclxuICB9KTtcclxuICBcclxuICByb3V0ZXIucm91dGUoJy9hcGkvYXBhcnRtZW50cy86YXBhcnRtZW50X2lkJykgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LmZpbmRCeUlkKHJlcS5wYXJhbXMuYXBhcnRtZW50X2lkLCBmdW5jdGlvbihlcnIsIGFwYXJ0bWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgcmVzLmpzb24oYXBhcnRtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgcm91dGVyLnJvdXRlKCcvYXBpL2FwYXJ0bWVudHMvZ2V0cHJvZmlsZS86dXNlckVtYWlsJykgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LmZpbmQoe3VzZXJFbWFpbDpyZXEucGFyYW1zLnVzZXJFbWFpbH0sJy1faWQnLCBmdW5jdGlvbihlcnIsIGFwYXJ0bWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgcmVzLmpzb24oYXBhcnRtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAvLyAgKipUaGUgYWJvdmUgY29kZSBjYW4gYmUgd3JpdHRlbiBhcyBmb2xsb3dzIGFzIHdlbGwgKipcclxuICAgLy8gIHJvdXRlci5yb3V0ZSgnL2FwaS9hcGFydG1lbnRzL2dldHByb2ZpbGUxLzpVc2VyRW1haWwnKSAgICBcclxuICAgLy8gIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuICAgLy8gICAgICB2YXIgcXVlcnkgPSBBcGFydG1lbnQuZmluZCh7fSkuc2VsZWN0KCcud2hlcmUoe3VzZXJFbWFpbDpyZXEucGFyYW1zLlVzZXJFbWFpbH0pOyAtX2lkJykud2hlcmUoe3VzZXJFbWFpbDpyZXEucGFyYW1zLlVzZXJFbWFpbH0pO1xyXG4gICAvLyAgICAgICAgIHF1ZXJ5LmV4ZWMoZnVuY3Rpb24gKGVyciwgQXBhcnRtZW50KSB7XHJcbiAgIC8vICAgICAgaWYgKGVycikgcmV0dXJuIG5leHQoZXJyKTtcclxuICAgLy8gICAgICByZXMuc2VuZChBcGFydG1lbnQpO1xyXG4gICAvLyAgfSk7XHJcbiAgIC8vIH0pXHJcblxyXG4gICAgLnB1dChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIEFwYXJ0bWVudC5maW5kQnlJZChyZXEucGFyYW1zLmFwYXJ0bWVudF9pZCwgZnVuY3Rpb24oZXJyLCBhcGFydG1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgIGFwYXJ0bWVudC5uYW1lID0gcmVxLmJvZHkubmFtZTsgIFxyXG4gICAgICAgICAgICBhcGFydG1lbnQuc2F2ZShmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ2FwYXJ0bWVudCB1cGRhdGVkIScgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAuZGVsZXRlKGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LnJlbW92ZSh7XHJcbiAgICAgICAgICAgIF9pZDogcmVxLnBhcmFtcy5hcGFydG1lbnRfaWRcclxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIGFwYXJ0bWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuXHJcbiAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ1N1Y2Nlc3NmdWxseSBkZWxldGVkJyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZSgnL2FwaS9idXNpbmVzc3VuaXRzJykgICAgICAgICAgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQnVzaW5lc3NVbml0LmZpbmQoZnVuY3Rpb24oZXJyLCBidXNpbmVzc3VuaXRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24oYnVzaW5lc3N1bml0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgLypUYXNrIEVuZHBvaW50cyovXHJcblxyXG4gIHJvdXRlci5yb3V0ZSgnL2FwaS9uZXd0YXNrJylcclxuICAgIC5wb3N0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICAgICAgdGFzay50YXNrbmFtZSA9IHJlcS5ib2R5LnRhc2tuYW1lO1xyXG4gICAgICAgIHRhc2sudGFza2Rlc2MgPSByZXEuYm9keS50YXNrZGVzYztcclxuICAgICAgICB0YXNrLnRhc2tzdGF0dXMgPSByZXEuYm9keS50YXNrc3RhdHVzO1xyXG5cclxuICAgICAgICB0YXNrLnNhdmUoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdUYXNrIGNyZWF0ZWQhJyB9KTtcclxuICAgICAgICB9KTtcclxuICB9KVxyXG4gICAgLmdldChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIFRhc2suZmluZChmdW5jdGlvbihlcnIsIHRhc2tzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24odGFza3MpO1xyXG4gICAgICAgIH0pO1xyXG4gIH0pO1xyXG4gIFxyXG4gIHJvdXRlci5yb3V0ZSgnL2FwaS9uZXd0YXNrLzp0YXNrX2lkJykgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgVGFzay5maW5kQnlJZChyZXEucGFyYW1zLnRhc2tfaWQsIGZ1bmN0aW9uKGVyciwgdGFzaykge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgcmVzLmpzb24odGFzayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC5wdXQoZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICBUYXNrLmZpbmRCeUlkKHJlcS5wYXJhbXMudGFza19pZCwgZnVuY3Rpb24oZXJyLCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICB0YXNrLm5hbWUgPSByZXEuYm9keS5uYW1lOyAgXHJcbiAgICAgICAgICAgIHRhc2suc2F2ZShmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ3Rhc2sgdXBkYXRlZCEnIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLmRlbGV0ZShmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIFRhc2sucmVtb3ZlKHtcclxuICAgICAgICAgICAgX2lkOiByZXEucGFyYW1zLnRhc2tfaWRcclxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHRhc2spIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcblxyXG4gICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdTdWNjZXNzZnVsbHkgZGVsZXRlZCcgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuYXBwLnVzZSgnLycsIHJvdXRlcik7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
