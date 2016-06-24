"use strict";
const express = require('express');
const path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var cors = require('cors');
var router = express.Router();
var multer = require('multer');
var multers3 = require('multer-s3');
var serveIndex = require('serve-index');
var aws = require('aws-sdk');
var Apartment = require('./models/apartment');
var BusinessUnit = require('./models/businessunit');
var Files = require('./models/file');
var Task = require('./models/task');
var FileMongo = require('./models/file');
var s3 = new aws.S3({});
//var filelocation;
var upload = multer({
    storage: multers3({
        s3: s3,
        bucket: 'angular2files',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file key           
            //            filelocation = file.location;
        }
    })
});
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/filesdirectory', serveIndex(__dirname + '/uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.post("/uploads", multer({dest: "./uploads/"}).array("uploads[]", 12), function(req, res) {
//         var filemongo = new FileMongo();
//         filemongo.originalname = req.files[0].originalname;
//         filemongo._idapt = req.body._idapt;
//         console.log(req.body);
//         filemongo.save(function(err) {
//         });        
//     (res.send(req.files)); 
// });
//duplicate files are not handled, best would be to send multer filename to aws
app.post('/s3upload', upload.array('uploads[]', 12), function (req, res, next) {
    var filemongo = new FileMongo();
    filemongo.originalname = req.files[0].originalname;
    filemongo._idapt = req.body._idapt;
    filemongo.createddate = Date.now();
    //     console.log(filelocation);         
    filemongo.save(function (err) {
    });
    (res.send(req.files));
    //  res.send("Uploaded!");
});
// app.get('/download', function(req, res){
//   var file = '/uploads/e4bc8831547dcb0be7333bbce387de5b';
//   res.download(file); // Set disposition and send it.
// });
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
router.get('/app/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
router.get('/api', authCheck, function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/api/getusers')
    .get(function (req, res) {
    Apartment.find({ userEmail: { $exists: true, $ne: null } }, 'userEmail', function (err, apartments) {
        if (err)
            res.send(err);
        res.json(apartments);
    });
});
router.route('/api/apartments/updateprofile/:_id')
    .put(function (req, res) {
    Apartment.findById(req.params._id, function (err, apartment) {
        if (err)
            res.send(err);
        apartment.userFirstName = req.body.userFirstName;
        apartment.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'user profile updated!' });
        });
    });
});
router.route('/api/apartments/getprofile/:userEmail')
    .get(function (req, res) {
    Apartment.find({ userEmail: req.params.userEmail }, function (err, apartment) {
        if (err)
            res.send(err);
        res.json(apartment);
    });
});
//  **The above code can be written as follows as well **
//  router.route('/api/apartments/getprofile1/:UserEmail')    
//  .get(function(req, res, next) {
//      var query = Apartment.find({}).select('.where({userEmail:req.params.UserEmail}); -_id').where({userEmail:req.params.UserEmail});
//         query.exec(function (err, Apartment) {
//      if (err) return next(err);
//      res.send(Apartment);
//  });
// })
//Business Unit Service endpoints 
router.route('/api/businessunits')
    .get(function (req, res) {
    BusinessUnit.find({ BusinessUnitName: { $exists: true } }, function (err, businessunits) {
        if (err)
            res.send(err);
        res.json(businessunits);
    });
});
router.route('/api/businessunits/butype')
    .get(function (req, res) {
    BusinessUnit.find({ unitID: { $exists: true }, UnitType: { $exists: true } }, 'unitID UnitType', { sort: { unitID: 1 } }, function (err, businessunits) {
        if (err)
            res.send(err);
        res.json(businessunits);
    });
});
// db.contest.aggregate([
//     {"$group" : {_id:"$province", count:{$sum:1}}}
// ])
router.route('/api/apartments/getstats')
    .get(function (req, res) {
    //Apartment.aggregate([{$match:{_id: "aptType"}},{$group:{_id:{aptType:"$aptType"},count:{$sum:1}}}],function(err, apartments) {
    Apartment.find('aptType', function (err, apartments) {
        if (err)
            res.send(err);
        res.json(apartments);
    });
});
router.route('/api/apartments/getdetails/:aptType/:aptStatus')
    .get(function (req, res) {
    Apartment.find({ $and: [{ aptType: req.params.aptType }, { aptStatus: req.params.aptStatus }] }, function (err, apartments) {
        if (err)
            res.send(err);
        res.json(apartments);
    });
});
router.route('/api/apartments/files/:_idapt')
    .get(function (req, res) {
    Files.find({ _idapt: req.params._idapt }, function (err, files) {
        //Files.find({_idapt:req.params._idapt}).sort({'createddate.$date': 1}).toArray(function(err, files) {
        if (err)
            res.send(err);
        res.json(files);
    });
});
/*Task Endpoints*/
router.route('/api/newtask')
    .post(function (req, res) {
    var task = new Task();
    task.taskname = req.body.taskname;
    task.taskdesc = req.body.taskdesc;
    task.assignedto = req.body.assignedto;
    task.taskstatus = 'OPEN';
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
router.route('/api/mytask/:userEmail')
    .get(function (req, res) {
    Task.find({ $and: [{ assignedto: req.params.userEmail.toLowerCase() }, { taskstatus: 'OPEN' }] }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
});
router.route('/api/newtask/:_id')
    .get(function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
})
    .put(function (req, res) {
    Task.findById(req.params._id, function (err, task) {
        if (err)
            res.send(err);
        task.taskname = req.body.taskname;
        task.taskdesc = req.body.taskdesc;
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
router.route('/api/mark/:_id')
    .put(function (req, res) {
    Task.findById(req.params._id, function (err, task) {
        if (err)
            res.send(err);
        task.taskstatus = 'CLOSED';
        task.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'task updated!' });
        });
    });
});
app.use('/', router);

//# sourceMappingURL=data:application/json;base64,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LElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztLQUM3QixHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVMsR0FBRyxFQUFFLElBQUk7UUFDNUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVMsR0FBRztZQUNsQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFBO0FBRU4sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG52YXIgcG9ydDogbnVtYmVyID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xyXG52YXIgYXBwID0gZXhwcmVzcygpO1xyXG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XHJcbnZhciBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcbnZhciBqd3QgPSByZXF1aXJlKCdleHByZXNzLWp3dCcpO1xyXG52YXIgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnZhciBtdWx0ZXIgPSByZXF1aXJlKCdtdWx0ZXInKTtcclxudmFyIG11bHRlcnMzID0gcmVxdWlyZSgnbXVsdGVyLXMzJyk7XHJcbnZhciBzZXJ2ZUluZGV4ID0gcmVxdWlyZSgnc2VydmUtaW5kZXgnKTtcclxudmFyIGF3cyA9IHJlcXVpcmUoJ2F3cy1zZGsnKVxyXG5cclxudmFyIEFwYXJ0bWVudCA9IHJlcXVpcmUoJy4vbW9kZWxzL2FwYXJ0bWVudCcpO1xyXG52YXIgQnVzaW5lc3NVbml0ID0gcmVxdWlyZSgnLi9tb2RlbHMvYnVzaW5lc3N1bml0Jyk7IFxyXG52YXIgRmlsZXMgPSByZXF1aXJlKCcuL21vZGVscy9maWxlJyk7XHJcbnZhciBUYXNrID0gcmVxdWlyZSgnLi9tb2RlbHMvdGFzaycpO1xyXG52YXIgRmlsZU1vbmdvID0gcmVxdWlyZSgnLi9tb2RlbHMvZmlsZScpO1xyXG52YXIgczMgPSBuZXcgYXdzLlMzKHsgLyogLi4uICovIH0pXHJcbi8vdmFyIGZpbGVsb2NhdGlvbjtcclxuXHJcbnZhciB1cGxvYWQgPSBtdWx0ZXIoe1xyXG4gICAgc3RvcmFnZTogbXVsdGVyczMoe1xyXG4gICAgICAgIHMzOnMzLCAgICAgICBcclxuICAgICAgICBidWNrZXQ6ICdhbmd1bGFyMmZpbGVzJyxcclxuICAgICAgICBrZXk6IGZ1bmN0aW9uIChyZXEsZmlsZSwgY2IpIHtcclxuICAgICAgICAgICAgICBjYihudWxsLCBmaWxlLm9yaWdpbmFsbmFtZSk7IC8vdXNlIERhdGUubm93KCkgZm9yIHVuaXF1ZSBmaWxlIGtleSAgICAgICAgICAgXHJcbiAgLy8gICAgICAgICAgICBmaWxlbG9jYXRpb24gPSBmaWxlLmxvY2F0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pO1xyXG5cclxuYXBwLnVzZSgnL2FwcCcsIGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdhcHAnKSkpO1xyXG5hcHAudXNlKCcvbGlicycsIGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsaWJzJykpKTtcclxuYXBwLnVzZSgnL3VwbG9hZHMnLCBleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAndXBsb2FkcycpKSk7XHJcbmFwcC51c2UoJy9maWxlc2RpcmVjdG9yeScsIHNlcnZlSW5kZXgoX19kaXJuYW1lICsgJy91cGxvYWRzJykpO1xyXG5hcHAudXNlKGNvcnMoKSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xyXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuXHJcblxyXG5hcHAudXNlKGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcclxuICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdFwiKTtcclxuICAgIG5leHQoKTtcclxufSk7XHJcblxyXG4vLyBhcHAucG9zdChcIi91cGxvYWRzXCIsIG11bHRlcih7ZGVzdDogXCIuL3VwbG9hZHMvXCJ9KS5hcnJheShcInVwbG9hZHNbXVwiLCAxMiksIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbi8vICAgICAgICAgdmFyIGZpbGVtb25nbyA9IG5ldyBGaWxlTW9uZ28oKTtcclxuLy8gICAgICAgICBmaWxlbW9uZ28ub3JpZ2luYWxuYW1lID0gcmVxLmZpbGVzWzBdLm9yaWdpbmFsbmFtZTtcclxuLy8gICAgICAgICBmaWxlbW9uZ28uX2lkYXB0ID0gcmVxLmJvZHkuX2lkYXB0O1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5KTtcclxuLy8gICAgICAgICBmaWxlbW9uZ28uc2F2ZShmdW5jdGlvbihlcnIpIHtcclxuLy8gICAgICAgICB9KTsgICAgICAgIFxyXG4vLyAgICAgKHJlcy5zZW5kKHJlcS5maWxlcykpOyBcclxuLy8gfSk7XHJcblxyXG4vL2R1cGxpY2F0ZSBmaWxlcyBhcmUgbm90IGhhbmRsZWQsIGJlc3Qgd291bGQgYmUgdG8gc2VuZCBtdWx0ZXIgZmlsZW5hbWUgdG8gYXdzXHJcbmFwcC5wb3N0KCcvczN1cGxvYWQnLCB1cGxvYWQuYXJyYXkoJ3VwbG9hZHNbXScsMTIpLCBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICAgdmFyIGZpbGVtb25nbyA9IG5ldyBGaWxlTW9uZ28oKTtcclxuICAgICAgICAgZmlsZW1vbmdvLm9yaWdpbmFsbmFtZSA9IHJlcS5maWxlc1swXS5vcmlnaW5hbG5hbWU7XHJcbiAgICAgICAgIGZpbGVtb25nby5faWRhcHQgPSByZXEuYm9keS5faWRhcHQ7XHJcbiAgICAgICAgIGZpbGVtb25nby5jcmVhdGVkZGF0ZSA9IERhdGUubm93KCk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coZmlsZWxvY2F0aW9uKTsgICAgICAgICBcclxuICAgICAgICAgZmlsZW1vbmdvLnNhdmUoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAocmVzLnNlbmQocmVxLmZpbGVzKSk7IFxyXG4vLyAgcmVzLnNlbmQoXCJVcGxvYWRlZCFcIik7XHJcbn0pO1xyXG5cclxuXHJcbi8vIGFwcC5nZXQoJy9kb3dubG9hZCcsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcclxuLy8gICB2YXIgZmlsZSA9ICcvdXBsb2Fkcy9lNGJjODgzMTU0N2RjYjBiZTczMzNiYmNlMzg3ZGU1Yic7XHJcbi8vICAgcmVzLmRvd25sb2FkKGZpbGUpOyAvLyBTZXQgZGlzcG9zaXRpb24gYW5kIHNlbmQgaXQuXHJcbi8vIH0pO1xyXG5cclxudmFyIGRic3RyaW5nID1cclxuICAgIHByb2Nlc3MuZW52Lk1PTkdPTEFCX1VSSSB8fFxyXG4gICAgcHJvY2Vzcy5lbnYuTU9OR09IUV9VUkwgfHxcclxuICAgICdtb25nb2RiOi8vaGVyb2t1X2Q0bjZobmhsOnE0cmZjMXVpa2Q1MWQ1c3VwczltaXBpdm5sQGRzMDU3MjU0Lm1sYWIuY29tOjU3MjU0L2hlcm9rdV9kNG42aG5obCc7XHJcblxyXG52YXIgc2VydmVyID0gYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBob3N0ID0gc2VydmVyLmFkZHJlc3MoKS5hZGRyZXNzO1xyXG4gICAgdmFyIHBvcnQgPSBzZXJ2ZXIuYWRkcmVzcygpLnBvcnQ7XHJcbiAgICBjb25zb2xlLmxvZygnVGhpcyBleHByZXNzIGFwcCBpcyBsaXN0ZW5pbmcgb24gcG9ydDonICsgcG9ydCk7XHJcbn0pO1xyXG5cclxudmFyIGF1dGhDaGVjayA9IGp3dCh7XHJcbiAgc2VjcmV0OiBuZXcgQnVmZmVyKCc0NjBEUFk3UGk0eG5SVWlpclB1RWZCZHhTNHd6UUdjeDhybEEtUXc3NmZVUmttaXd0cmh2X0lYZmZ6c0k4NEhNJywgJ2Jhc2U2NCcpLFxyXG4gIGF1ZGllbmNlOiAnMW12SEd5a1ZIdnh6cHdzdHAyd1RtcnpMcnB6b3VWVG0nXHJcbn0pO1xyXG5cclxubW9uZ29vc2UuY29ubmVjdChkYnN0cmluZywgZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgIGlmIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2cgKCdFUlJPUiBjb25uZWN0aW5nIHRvOiAnICsgZGJzdHJpbmcgKyAnLiAnICsgZXJyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2cgKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvOiAnICsgZGJzdHJpbmcpO1xyXG4gICAgICB9O1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQoJy9hcHAvKicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgIHJlcy5zZW5kRmlsZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvYXBpJyxhdXRoQ2hlY2ssIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ2hvb3JheSEgd2VsY29tZSB0byBvdXIgYXBpIScgfSk7XHJcbn0pO1xyXG5cclxuICByb3V0ZXIucm91dGUoJy9hcGkvZ2V0dXNlcnMnKSAgICBcclxuICAgIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMpIHsgICAgICAgIFxyXG4gICAgICAgIEFwYXJ0bWVudC5maW5kKHt1c2VyRW1haWw6IHskZXhpc3RzOiB0cnVlLCAkbmU6IG51bGx9fSwndXNlckVtYWlsJywgZnVuY3Rpb24oZXJyLCBhcGFydG1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbihhcGFydG1lbnRzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIHJvdXRlci5yb3V0ZSgnL2FwaS9hcGFydG1lbnRzL3VwZGF0ZXByb2ZpbGUvOl9pZCcpICAgIFxyXG4gICAgLnB1dChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIEFwYXJ0bWVudC5maW5kQnlJZChyZXEucGFyYW1zLl9pZCwgZnVuY3Rpb24oZXJyLCBhcGFydG1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgYXBhcnRtZW50LnVzZXJGaXJzdE5hbWUgPSByZXEuYm9keS51c2VyRmlyc3ROYW1lOyAgXHJcbiAgICAgICAgICAgIGFwYXJ0bWVudC5zYXZlKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiAndXNlciBwcm9maWxlIHVwZGF0ZWQhJyB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIFxyXG4gICAgcm91dGVyLnJvdXRlKCcvYXBpL2FwYXJ0bWVudHMvZ2V0cHJvZmlsZS86dXNlckVtYWlsJykgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LmZpbmQoe3VzZXJFbWFpbDpyZXEucGFyYW1zLnVzZXJFbWFpbH0sZnVuY3Rpb24oZXJyLCBhcGFydG1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKGFwYXJ0bWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgLy8gICoqVGhlIGFib3ZlIGNvZGUgY2FuIGJlIHdyaXR0ZW4gYXMgZm9sbG93cyBhcyB3ZWxsICoqXHJcbiAgIC8vICByb3V0ZXIucm91dGUoJy9hcGkvYXBhcnRtZW50cy9nZXRwcm9maWxlMS86VXNlckVtYWlsJykgICAgXHJcbiAgIC8vICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgIC8vICAgICAgdmFyIHF1ZXJ5ID0gQXBhcnRtZW50LmZpbmQoe30pLnNlbGVjdCgnLndoZXJlKHt1c2VyRW1haWw6cmVxLnBhcmFtcy5Vc2VyRW1haWx9KTsgLV9pZCcpLndoZXJlKHt1c2VyRW1haWw6cmVxLnBhcmFtcy5Vc2VyRW1haWx9KTtcclxuICAgLy8gICAgICAgICBxdWVyeS5leGVjKGZ1bmN0aW9uIChlcnIsIEFwYXJ0bWVudCkge1xyXG4gICAvLyAgICAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XHJcbiAgIC8vICAgICAgcmVzLnNlbmQoQXBhcnRtZW50KTtcclxuICAgLy8gIH0pO1xyXG4gICAvLyB9KVxyXG4gICAgXHJcbiAgIC8vQnVzaW5lc3MgVW5pdCBTZXJ2aWNlIGVuZHBvaW50cyBcclxuICAgIHJvdXRlci5yb3V0ZSgnL2FwaS9idXNpbmVzc3VuaXRzJykgICAgICAgICAgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQnVzaW5lc3NVbml0LmZpbmQoe0J1c2luZXNzVW5pdE5hbWU6IHskZXhpc3RzOiB0cnVlfX0sZnVuY3Rpb24oZXJyLCBidXNpbmVzc3VuaXRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24oYnVzaW5lc3N1bml0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKCcvYXBpL2J1c2luZXNzdW5pdHMvYnV0eXBlJykgICAgICAgICAgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQnVzaW5lc3NVbml0LmZpbmQoe3VuaXRJRDogeyRleGlzdHM6IHRydWV9LCBVbml0VHlwZTogeyRleGlzdHM6IHRydWV9fSwndW5pdElEIFVuaXRUeXBlJyx7c29ydDp7dW5pdElEOiAxfX0sZnVuY3Rpb24oZXJyLCBidXNpbmVzc3VuaXRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24oYnVzaW5lc3N1bml0cyk7XHJcbiAgICAgICAgIH0pO1xyXG4gICB9KTsgICBcclxuXHJcbiAgICAvLyBkYi5jb250ZXN0LmFnZ3JlZ2F0ZShbXHJcbi8vICAgICB7XCIkZ3JvdXBcIiA6IHtfaWQ6XCIkcHJvdmluY2VcIiwgY291bnQ6eyRzdW06MX19fVxyXG4vLyBdKVxyXG5cclxuICAgIHJvdXRlci5yb3V0ZSgnL2FwaS9hcGFydG1lbnRzL2dldHN0YXRzJykgICAgICAgICAgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgLy9BcGFydG1lbnQuYWdncmVnYXRlKFt7JG1hdGNoOntfaWQ6IFwiYXB0VHlwZVwifX0seyRncm91cDp7X2lkOnthcHRUeXBlOlwiJGFwdFR5cGVcIn0sY291bnQ6eyRzdW06MX19fV0sZnVuY3Rpb24oZXJyLCBhcGFydG1lbnRzKSB7XHJcbiAgICAgICAgICBBcGFydG1lbnQuZmluZCgnYXB0VHlwZScsZnVuY3Rpb24oZXJyLCBhcGFydG1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbihhcGFydG1lbnRzKTtcclxuICAgICAgICAgfSk7XHJcbiAgIH0pOyAgICAgICBcclxuIFxyXG4gICByb3V0ZXIucm91dGUoJy9hcGkvYXBhcnRtZW50cy9nZXRkZXRhaWxzLzphcHRUeXBlLzphcHRTdGF0dXMnKSAgICAgICAgICAgICBcclxuICAgIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMpIHsgICAgICAgIFxyXG4gICAgICAgICAgQXBhcnRtZW50LmZpbmQoeyRhbmQ6W3thcHRUeXBlOnJlcS5wYXJhbXMuYXB0VHlwZX0se2FwdFN0YXR1czpyZXEucGFyYW1zLmFwdFN0YXR1c31dfSwgZnVuY3Rpb24oZXJyLCBhcGFydG1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbihhcGFydG1lbnRzKTtcclxuICAgICAgICAgfSk7XHJcbiAgIH0pOyAgICAgICBcclxuXHJcblxyXG4gICAgcm91dGVyLnJvdXRlKCcvYXBpL2FwYXJ0bWVudHMvZmlsZXMvOl9pZGFwdCcpICAgICAgICAgICAgIFxyXG4gICAgLmdldChmdW5jdGlvbihyZXEsIHJlcykgeyAgICAgICAgXHJcbiAgICAgICAgICBGaWxlcy5maW5kKHtfaWRhcHQ6cmVxLnBhcmFtcy5faWRhcHR9LCBmdW5jdGlvbihlcnIsIGZpbGVzKSB7XHJcbiAgICAgICAgICAvL0ZpbGVzLmZpbmQoe19pZGFwdDpyZXEucGFyYW1zLl9pZGFwdH0pLnNvcnQoeydjcmVhdGVkZGF0ZS4kZGF0ZSc6IDF9KS50b0FycmF5KGZ1bmN0aW9uKGVyciwgZmlsZXMpIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKGZpbGVzKTtcclxuICAgICAgICB9KTtcclxuICAgfSk7ICBcclxuXHJcbiAgLypUYXNrIEVuZHBvaW50cyovXHJcblxyXG4gIHJvdXRlci5yb3V0ZSgnL2FwaS9uZXd0YXNrJylcclxuICAgIC5wb3N0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICAgICAgdGFzay50YXNrbmFtZSA9IHJlcS5ib2R5LnRhc2tuYW1lO1xyXG4gICAgICAgIHRhc2sudGFza2Rlc2MgPSByZXEuYm9keS50YXNrZGVzYztcclxuICAgICAgICB0YXNrLmFzc2lnbmVkdG8gPSByZXEuYm9keS5hc3NpZ25lZHRvO1xyXG4gICAgICAgIHRhc2sudGFza3N0YXR1cyA9ICdPUEVOJztcclxuICAgICAgICB0YXNrLnNhdmUoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdUYXNrIGNyZWF0ZWQhJyB9KTtcclxuICAgICAgICB9KTtcclxuICB9KVxyXG4gICAgLmdldChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIFRhc2suZmluZChmdW5jdGlvbihlcnIsIHRhc2tzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24odGFza3MpO1xyXG4gICAgICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICByb3V0ZXIucm91dGUoJy9hcGkvbXl0YXNrLzp1c2VyRW1haWwnKSAgICBcclxuICAgIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICBUYXNrLmZpbmQoeyRhbmQ6W3thc3NpZ25lZHRvOnJlcS5wYXJhbXMudXNlckVtYWlsLnRvTG93ZXJDYXNlKCl9LHt0YXNrc3RhdHVzOidPUEVOJ31dfSwgZnVuY3Rpb24oZXJyLCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbih0YXNrKTtcclxuICAgICAgICB9KTtcclxuICB9KSAgXHJcbiAgXHJcbiAgcm91dGVyLnJvdXRlKCcvYXBpL25ld3Rhc2svOl9pZCcpICAgIFxyXG4gICAgLmdldChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIFRhc2suZmluZEJ5SWQocmVxLnBhcmFtcy50YXNrX2lkLCBmdW5jdGlvbihlcnIsIHRhc2spIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKHRhc2spO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucHV0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgVGFzay5maW5kQnlJZChyZXEucGFyYW1zLl9pZCwgZnVuY3Rpb24oZXJyLCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICB0YXNrLnRhc2tuYW1lID0gcmVxLmJvZHkudGFza25hbWU7ICBcclxuICAgICAgICAgICAgdGFzay50YXNrZGVzYyA9IHJlcS5ib2R5LnRhc2tkZXNjO1xyXG4gICAgICAgICAgICB0YXNrLnNhdmUoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICd0YXNrIHVwZGF0ZWQhJyB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC5kZWxldGUoZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICBUYXNrLnJlbW92ZSh7XHJcbiAgICAgICAgICAgIF9pZDogcmVxLnBhcmFtcy50YXNrX2lkXHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiAnU3VjY2Vzc2Z1bGx5IGRlbGV0ZWQnIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKCcvYXBpL21hcmsvOl9pZCcpICBcclxuICAgIC5wdXQoZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICBUYXNrLmZpbmRCeUlkKHJlcS5wYXJhbXMuX2lkLCBmdW5jdGlvbihlcnIsIHRhc2spIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgIHRhc2sudGFza3N0YXR1cyA9ICdDTE9TRUQnOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRhc2suc2F2ZShmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ3Rhc2sgdXBkYXRlZCEnIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pICBcclxuXHJcbmFwcC51c2UoJy8nLCByb3V0ZXIpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
