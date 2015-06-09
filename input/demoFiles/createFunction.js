/**
 * SubjectController
 *
 * @description :: Server-side logic for managing subjects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function (req, res, next) {
        var params = req.body;
        Subject.create(params, function (err, subject) {
            if (err) return next(err);
            res.status(201);
            res.json(subject);
        })
    },
     update: function (req, res, next) {
        var criteria = _.merge({}, req.body);
        var id = req.body['id'];
        if (!id) {
            return req.badRequest("No id provided");
        }

        Subject.update(id, criteria, function (err, subject) {
            if (subject.length == 0) return res.notFound();
            if (err) return next(err);
            res.status(201);
            res.json(subject);
        });
    },

    destroy: function (req, res, next) {
        var id = req.body['id'];
        if (!id) {
            return req.badRequest("No id provided");
        }

        Subject.findOne(id).exec(function (err, result) {
            if (err) return res.serverError(err);
            if (!result) return res.notFound();
            Subject.destroy(id, function (err) {
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
        Subject.find(options)
