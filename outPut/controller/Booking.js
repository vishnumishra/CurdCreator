/**
 * BookingController
 *
 * @description :: Server-side logic for managing bookings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function (req, res, next) {
        var params = req.body;
        Booking.create(params, function (err, booking) {
            if (err) return next(err);
            res.status(201);
            res.json(booking);
        })
    },
     update: function (req, res, next) {
        var criteria = _.merge({}, req.body);
        var id = req.body['id'];
        if (!id) {
            return req.badRequest("No id provided");
        }

        Booking.update(id, criteria, function (err, booking) {
            if (booking.length == 0) return res.notFound();
            if (err) return next(err);
            res.status(201);
            res.json(booking);
        });
    },

    destroy: function (req, res, next) {
        var id = req.body['id'];
        if (!id) {
            return req.badRequest("No id provided");
        }

        Booking.findOne(id).exec(function (err, result) {
            if (err) return res.serverError(err);
            if (!result) return res.notFound();
            Booking.destroy(id, function (err) {
                if (err) return next(err);
                return res.json(result);
            })
        });
    },

    find: function (req, res, next) {
        var params = req.body;
        var options = {};
        var allOptions = ["where", "skip", "limit", "sort"];
        allOptions.forEach(function (delimiter) {
            if (params[delimiter]) {
                options[delimiter] = params[delimiter]
            };
        });
        Booking.find(options)
           .populate('hello')
           .populate('hi')
            .exec(function (err, booking) {
            if (!booking) {
                res.json({
                    success: false,
                    exception: res.notFound()
                });
            };
            if (err) return next(err);

            res.json({
                success: true,
                BookingData: booking
            });
        });
    }

};
