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
router.route('/api/getusers')
    .get(function (req, res) {
    Apartment.find({ userEmail: { $exists: true, $ne: null } }, 'userEmail', function (err, apartments) {
        if (err)
            res.send(err);
        res.json(apartments);
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
app.use('/', router);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTyxPQUFPLFdBQVcsU0FBUyxDQUFDLENBQUM7QUFDcEMsSUFBTyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDOUIsSUFBSSxJQUFJLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQzVDLElBQUksR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3BCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN4QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUMsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDcEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXBDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVoQixJQUFJLFFBQVEsR0FDUixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO0lBQ3ZCLDhGQUE4RixDQUFDO0FBRW5HLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO0lBQzFCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2pFLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxrRUFBa0UsRUFBRSxRQUFRLENBQUM7SUFDaEcsUUFBUSxFQUFFLGtDQUFrQztDQUM3QyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFFLHVCQUF1QixHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBRSw2QkFBNkIsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQUEsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRTNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDbkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsU0FBUyxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDM0MsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUM7QUFFQSxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0tBQzdCLElBQUksQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ25CLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7SUFDaEMsU0FBUyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUUxQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVMsR0FBRztRQUN2QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0tBRUQsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsRUFBRSxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLEVBQUMsRUFBQyxpQkFBaUIsRUFBQyxVQUFTLEdBQUcsRUFBRSxVQUFVO1FBQzFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQztLQUMxQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUNsQixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVMsR0FBRyxFQUFFLFNBQVM7UUFDL0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFTCxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztLQUMxQixHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUNsQixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLEVBQUMsRUFBQyxXQUFXLEVBQUUsVUFBUyxHQUFHLEVBQUUsVUFBVTtRQUN4RixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFekIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUM7S0FDcEQsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDbEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBRSxVQUFTLEdBQUcsRUFBRSxTQUFTO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztLQVlELEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ2xCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBUyxHQUFHLEVBQUUsU0FBUztRQUMvRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDL0IsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFTLEdBQUc7WUFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztLQUVELE1BQU0sQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ3JCLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDYixHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZO0tBQy9CLEVBQUUsVUFBUyxHQUFHLEVBQUUsU0FBUztRQUN0QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0tBQ2pDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBUyxHQUFHLEVBQUUsYUFBYTtRQUN6QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFrQjtBQUVsQixNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztLQUN6QixJQUFJLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBUyxHQUFHO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0tBQ0MsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFTLEdBQUcsRUFBRSxLQUFLO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztLQUNuQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSTtRQUN0RyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7S0FDOUIsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztLQUVELEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSTtRQUM1QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVMsR0FBRztZQUNsQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztLQUVELE1BQU0sQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDUixHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPO0tBQzFCLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSTtRQUNqQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFUCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcbnZhciBwb3J0OiBudW1iZXIgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XHJcbnZhciBhcHAgPSBleHByZXNzKCk7XHJcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcclxudmFyIG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxudmFyIGp3dCA9IHJlcXVpcmUoJ2V4cHJlc3Mtand0Jyk7XHJcbnZhciBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnZhciBBcGFydG1lbnQgPSByZXF1aXJlKCcuL21vZGVscy9hcGFydG1lbnQnKTtcclxudmFyIEJ1c2luZXNzVW5pdCA9IHJlcXVpcmUoJy4vbW9kZWxzL2J1c2luZXNzdW5pdCcpOyBcclxudmFyIFRhc2sgPSByZXF1aXJlKCcuL21vZGVscy90YXNrJyk7XHJcblxyXG5hcHAudXNlKCcvYXBwJywgZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2FwcCcpKSk7XHJcbmFwcC51c2UoJy9saWJzJywgZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xpYnMnKSkpO1xyXG5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG52YXIgZGJzdHJpbmcgPVxyXG4gICAgcHJvY2Vzcy5lbnYuTU9OR09MQUJfVVJJIHx8XHJcbiAgICBwcm9jZXNzLmVudi5NT05HT0hRX1VSTCB8fFxyXG4gICAgJ21vbmdvZGI6Ly9oZXJva3VfZDRuNmhuaGw6cTRyZmMxdWlrZDUxZDVzdXBzOW1pcGl2bmxAZHMwNTcyNTQubWxhYi5jb206NTcyNTQvaGVyb2t1X2Q0bjZobmhsJztcclxuXHJcbnZhciBzZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGhvc3QgPSBzZXJ2ZXIuYWRkcmVzcygpLmFkZHJlc3M7XHJcbiAgICB2YXIgcG9ydCA9IHNlcnZlci5hZGRyZXNzKCkucG9ydDtcclxuICAgIGNvbnNvbGUubG9nKCdUaGlzIGV4cHJlc3MgYXBwIGlzIGxpc3RlbmluZyBvbiBwb3J0OicgKyBwb3J0KTtcclxufSk7XHJcblxyXG52YXIgYXV0aENoZWNrID0gand0KHtcclxuICBzZWNyZXQ6IG5ldyBCdWZmZXIoJzQ2MERQWTdQaTR4blJVaWlyUHVFZkJkeFM0d3pRR2N4OHJsQS1Rdzc2ZlVSa21pd3RyaHZfSVhmZnpzSTg0SE0nLCAnYmFzZTY0JyksXHJcbiAgYXVkaWVuY2U6ICcxbXZIR3lrVkh2eHpwd3N0cDJ3VG1yekxycHpvdVZUbSdcclxufSk7XHJcblxyXG5tb25nb29zZS5jb25uZWN0KGRic3RyaW5nLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcclxuICAgICAgaWYgKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyAoJ0VSUk9SIGNvbm5lY3RpbmcgdG86ICcgKyBkYnN0cmluZyArICcuICcgKyBlcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyAoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG86ICcgKyBkYnN0cmluZyk7XHJcbiAgICAgIH07XHJcbn0pO1xyXG5cclxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxucm91dGVyLmdldCgnL2FwcC8qJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgcmVzLnNlbmRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJykpO1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQoJy9hcGknLGF1dGhDaGVjaywgZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgcmVzLmpzb24oeyBtZXNzYWdlOiAnaG9vcmF5ISB3ZWxjb21lIHRvIG91ciBhcGkhJyB9KTtcclxufSk7XHJcblxyXG4gICByb3V0ZXIucm91dGUoJy9hcGkvYXBhcnRtZW50cycpXHJcbiAgICAucG9zdChmdW5jdGlvbihyZXEsIHJlcykgeyAgICAgICAgXHJcbiAgICAgICAgdmFyIGFwYXJ0bWVudCA9IG5ldyBBcGFydG1lbnQoKTtcclxuICAgICAgICBhcGFydG1lbnQuVW5pdEFkZHJlc3MgPSByZXEuYm9keS50YXNrbmFtZTtcclxuXHJcbiAgICAgICAgYXBhcnRtZW50LnNhdmUoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdBcGFydG1lbnQgY3JlYXRlZCEnIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICBBcGFydG1lbnQuZmluZCh7dW5pdElEOiB7JGV4aXN0czogdHJ1ZX0sIFVuaXRUeXBlOiB7JGV4aXN0czogdHJ1ZX19LCd1bml0SUQgVW5pdFR5cGUnLGZ1bmN0aW9uKGVyciwgYXBhcnRtZW50cykge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuXHJcbiAgICAgICAgICAgIHJlcy5qc29uKGFwYXJ0bWVudHMpO1xyXG4gICAgICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICByb3V0ZXIucm91dGUoJy9hcGkvYXBhcnRtZW50cy86YXBhcnRtZW50X2lkJykgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LmZpbmRCeUlkKHJlcS5wYXJhbXMuYXBhcnRtZW50X2lkLCBmdW5jdGlvbihlcnIsIGFwYXJ0bWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgcmVzLmpzb24oYXBhcnRtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICByb3V0ZXIucm91dGUoJy9hcGkvZ2V0dXNlcnMnKSAgICBcclxuICAgIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMpIHsgICAgICAgIFxyXG4gICAgICAgIEFwYXJ0bWVudC5maW5kKHt1c2VyRW1haWw6IHskZXhpc3RzOiB0cnVlLCAkbmU6IG51bGx9fSwndXNlckVtYWlsJywgZnVuY3Rpb24oZXJyLCBhcGFydG1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbihhcGFydG1lbnRzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIFxyXG4gICAgcm91dGVyLnJvdXRlKCcvYXBpL2FwYXJ0bWVudHMvZ2V0cHJvZmlsZS86dXNlckVtYWlsJykgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LmZpbmQoe3VzZXJFbWFpbDpyZXEucGFyYW1zLnVzZXJFbWFpbH0sJy1faWQnLCBmdW5jdGlvbihlcnIsIGFwYXJ0bWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgcmVzLmpzb24oYXBhcnRtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAvLyAgKipUaGUgYWJvdmUgY29kZSBjYW4gYmUgd3JpdHRlbiBhcyBmb2xsb3dzIGFzIHdlbGwgKipcclxuICAgLy8gIHJvdXRlci5yb3V0ZSgnL2FwaS9hcGFydG1lbnRzL2dldHByb2ZpbGUxLzpVc2VyRW1haWwnKSAgICBcclxuICAgLy8gIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuICAgLy8gICAgICB2YXIgcXVlcnkgPSBBcGFydG1lbnQuZmluZCh7fSkuc2VsZWN0KCcud2hlcmUoe3VzZXJFbWFpbDpyZXEucGFyYW1zLlVzZXJFbWFpbH0pOyAtX2lkJykud2hlcmUoe3VzZXJFbWFpbDpyZXEucGFyYW1zLlVzZXJFbWFpbH0pO1xyXG4gICAvLyAgICAgICAgIHF1ZXJ5LmV4ZWMoZnVuY3Rpb24gKGVyciwgQXBhcnRtZW50KSB7XHJcbiAgIC8vICAgICAgaWYgKGVycikgcmV0dXJuIG5leHQoZXJyKTtcclxuICAgLy8gICAgICByZXMuc2VuZChBcGFydG1lbnQpO1xyXG4gICAvLyAgfSk7XHJcbiAgIC8vIH0pXHJcblxyXG4gICAgLnB1dChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIEFwYXJ0bWVudC5maW5kQnlJZChyZXEucGFyYW1zLmFwYXJ0bWVudF9pZCwgZnVuY3Rpb24oZXJyLCBhcGFydG1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgIGFwYXJ0bWVudC5uYW1lID0gcmVxLmJvZHkubmFtZTsgIFxyXG4gICAgICAgICAgICBhcGFydG1lbnQuc2F2ZShmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ2FwYXJ0bWVudCB1cGRhdGVkIScgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAuZGVsZXRlKGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQXBhcnRtZW50LnJlbW92ZSh7XHJcbiAgICAgICAgICAgIF9pZDogcmVxLnBhcmFtcy5hcGFydG1lbnRfaWRcclxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIGFwYXJ0bWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcclxuXHJcbiAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ1N1Y2Nlc3NmdWxseSBkZWxldGVkJyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZSgnL2FwaS9idXNpbmVzc3VuaXRzJykgICAgICAgICAgICAgXHJcbiAgICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgQnVzaW5lc3NVbml0LmZpbmQoZnVuY3Rpb24oZXJyLCBidXNpbmVzc3VuaXRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24oYnVzaW5lc3N1bml0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgLypUYXNrIEVuZHBvaW50cyovXHJcblxyXG4gIHJvdXRlci5yb3V0ZSgnL2FwaS9uZXd0YXNrJylcclxuICAgIC5wb3N0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICAgICAgdGFzay50YXNrbmFtZSA9IHJlcS5ib2R5LnRhc2tuYW1lO1xyXG4gICAgICAgIHRhc2sudGFza2Rlc2MgPSByZXEuYm9keS50YXNrZGVzYztcclxuICAgICAgICB0YXNrLmFzc2lnbmVkdG8gPSByZXEuYm9keS5hc3NpZ25lZHRvO1xyXG4gICAgICAgIHRhc2sudGFza3N0YXR1cyA9ICdPUEVOJztcclxuICAgICAgICB0YXNrLnNhdmUoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdUYXNrIGNyZWF0ZWQhJyB9KTtcclxuICAgICAgICB9KTtcclxuICB9KVxyXG4gICAgLmdldChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIFRhc2suZmluZChmdW5jdGlvbihlcnIsIHRhc2tzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24odGFza3MpO1xyXG4gICAgICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICByb3V0ZXIucm91dGUoJy9hcGkvbXl0YXNrLzp1c2VyRW1haWwnKSAgICBcclxuICAgIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICBUYXNrLmZpbmQoeyRhbmQ6W3thc3NpZ25lZHRvOnJlcS5wYXJhbXMudXNlckVtYWlsLnRvTG93ZXJDYXNlKCl9LHt0YXNrc3RhdHVzOidPUEVOJ31dfSwgZnVuY3Rpb24oZXJyLCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICByZXMuanNvbih0YXNrKTtcclxuICAgICAgICB9KTtcclxuICB9KSAgXHJcbiAgXHJcbiAgcm91dGVyLnJvdXRlKCcvYXBpL25ld3Rhc2svOl9pZCcpICAgIFxyXG4gICAgLmdldChmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgIFRhc2suZmluZEJ5SWQocmVxLnBhcmFtcy50YXNrX2lkLCBmdW5jdGlvbihlcnIsIHRhc2spIHtcclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKHRhc2spO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucHV0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgVGFzay5maW5kQnlJZChyZXEucGFyYW1zLl9pZCwgZnVuY3Rpb24oZXJyLCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICB0YXNrLnRhc2tuYW1lID0gcmVxLmJvZHkudGFza25hbWU7ICBcclxuICAgICAgICAgICAgdGFzay50YXNrZGVzYyA9IHJlcS5ib2R5LnRhc2tkZXNjO1xyXG4gICAgICAgICAgICB0YXNrLnNhdmUoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XHJcbiAgICAgICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICd0YXNrIHVwZGF0ZWQhJyB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC5kZWxldGUoZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICBUYXNrLnJlbW92ZSh7XHJcbiAgICAgICAgICAgIF9pZDogcmVxLnBhcmFtcy50YXNrX2lkXHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG5cclxuICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiAnU3VjY2Vzc2Z1bGx5IGRlbGV0ZWQnIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5hcHAudXNlKCcvJywgcm91dGVyKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
