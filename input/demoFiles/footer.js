            .exec(function (err, subject) {
            if (!subject) {
                res.json({
                    success: false,
                    exception: res.notFound()
                });
            };
            if (err) return next(err);

            res.json({
                success: true,
                SubjectData: subject
            });
        });
    }

};
