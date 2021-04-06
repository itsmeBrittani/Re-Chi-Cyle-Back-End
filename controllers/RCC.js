const express = require('express');
const router = express.Router();
const Event = require('../models/event.js');
const moment = require('moment');
const fetch = require('node-fetch')
exports.index = function(req, res) {
    res.render('index', { moment: moment });
};

//Routes
//seed

router.get('/seed', async (req, res) => {
    const newEvents =
        [
            {
            title: 'Shred a Thon',
            location: '1400 N Ashland Ave, Chicago, IL, 60622',
            date: 'Saturday, April 17th, 2021',
            startTime: '9 AM',
            endTime: '12 PM',
            description: 'Free community event sponsored by 2nd Ward Alderman Brian Hopkins. Point of Contact : Lisa Ryan - Contact Number: 312-643-2299'
        }, {
            title: 'Shred a Thon',
            location: '3557 S King Dr, Chicago, IL 60653',
            date: 'Saturday, April 17th, 2021',
            startTime: '9 AM',
            endTime: '12 PM',
            description: 'Free community event sponsored by 4th Ward Alderman Sophia King. Contact Number: 773-536-8103'
        }, {
            title: 'Shred a Thon',
            location: '7901 S Sangamon St, Chicago, IL 60620',
            date: 'Saturday, April 24th, 2021',
            startTime: '9 AM',
            endTime: '1 PM',
            description: 'Free community event sponsored by 17th Ward Alderman David Moore. Point of Contact : Cynthia Love - Contact Number: 773-934-3225'
        }
    ]

    try {
        const seedItems = await Event.create(newEvents)
        res.send(seedItems)
    } catch (err) {
        res.send('This is not what I want');
    }
});


//index
router.get('/events', (req, res) => {
    Event.find({}, (err, events) => {
    res.render('index.ejs', {
        allEvents: events
    });
    });
});

//new
router.get('/newevent', (req, res) => {
    res.render('new.ejs')
});

//create
router.post('/', (req, res)=>{
    Event.create(req.body, (error, createdEvent)=>{
    res.redirect('/events');
    });
});

//edit
router.get('/:id/edit', (req, res)=>{
    Events.findById(req.params.id, (err, foundReport)=> {
        res.render('edit.ejs', { 
        event: foundEvent,
        method: 'PUT'
    });
});
});


//update
router.put('/:id', (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedEvent) => {
        res.redirect('/ReChiCyle');
    });
});

//show
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    Event.findById(req.params.id, (err, foundEvent) => {res.render('show.ejs', {
        event: foundEvent
    });
});
})

//destroy
router.delete('/:id', (req, res) => {
    Event.findByIdAndRemove(req.params.id, (error, deletedEvent) => {
        res.redirect('/ReChiCycle');
    });
});

module.exports = router;