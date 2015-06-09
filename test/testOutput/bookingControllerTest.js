    create: function (req, res, next) {
        var params = req.body;
        try {
            Booking.create(params, function (err, booking) {

                if (err) return next(err);

                res.json({
                    success: true,
                    bookingData: booking
                });

            });
        } catch (ex) {
            res.json({
                success: false,
                exception: ex
            });
        }
    },

    find: function (req, res, next) {

        var params = req.body;

        try {

            var options = {};

            if (params.where) {
                options.where = params.where;
            }
            if (params.limit) {
                options.limit = params.limit;
            }
            if (params.skip) {
                options.skip = params.skip;
            }
            if (params.sort) {
                options.sort = params.sort;
            }

            Booking.find(options)
                .populate('userId')
                .populate('serviceProviderId')
                .exec(function (err, booking) {
                    if (booking === undefined) {
                        res.json({
                            success: false,
                            exception: res.notFound()
                        });
                    }

                    if (err) return next(err);

                    res.json({
                        success: true,
                        bookingData: booking
                    });
                });

        } catch (ex) {
            res.json({
                success: false,
                exception: ex
            });
        }
    },
    update: function (req, res, next) {

        var criteria = {};

        criteria = _.merge({}, req.body);

        var id = req.body.bookingId;

        if (!id) {
            return res.badRequest('No bookingId provided.');
        }

        Booking.update(id, criteria, function (err, booking) {

            if (booking.length === 0) return res.notFound();

            if (err) return next(err);

            res.json({
                success: true,
                bookingData: booking
            });

        });
    },
    destroy: function (req, res, next) {

        var id = req.body.bookingId;

        if (!id) {
            return res.badRequest('No bookingId provided.');
        }

        Booking.findOne(id).exec(function (err, booking) {
            if (err) return res.serverError(err);

            if (!booking) return res.notFound();

            Booking.destroy(id, function (err) {

                if (err) return next(err);

                res.json({
                    success: true,
                    bookingData: booking
                });
            });

        });
    }

};
