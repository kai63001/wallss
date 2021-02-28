db = db.getSiblingDB('admin')
db.createUser(
    {
        user: "root1",
        pwd: "root",
        roles: [
            { role: "userAdminAnyDatabase", db: "admin" }, 
             { role: "dbAdminAnyDatabase", db: "admin" }, 
             { role: "readWriteAnyDatabase", db: "admin" }
        ]
    }
);
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