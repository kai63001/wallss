db = db.getSiblingDB('wallss')
db.createUser(
    {
        user: "romeo",
        pwd: "qw123456",
        roles: [
            {
                role: "readWrite",
                db: "wallss"
            }
        ]
    }
);