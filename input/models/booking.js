module.exports = {

    attributes: {
        bookingId: {
            type: "integer",
            autoIncrement: true,
            primaryKey: true
        },
        serviceProviderId: {
            model: "ServiceProvider",
            via: "bookingId"
        },
        userId: {
            model: "User",
            via: "bookingId"
        },

        bookingStartTime: {
            type: "dateTime"
        },
        bookingEndTime: {
            type: "dateTime"
        },
        isConfirmedByConsumer:{
            type:"boolean",
            defaultsTo:false
        },
        isConfirmedByServiceProvider:{
            type:"boolean",
            defaultsTo:false
        }
    }
};
