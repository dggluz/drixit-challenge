print('Start #################################################################');

db = db.getSiblingDB('drixit');
db.createUser(
  {
    user: 'drixit',
    pwd: 'api1234',
    roles: [{ role: 'read', db: 'drixit' }],
  }
);
db.createCollection('users');

db.users.insert({
    "id" : "it-drixit-1",
    "avatar" : "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
    "email" : "it@drixit.com",
    "password" : hex_md5("some-password"),
    "name" : "IT",
    "surname" : "Drixit",
    "age" : 25,
    "role" : "admin"
});

db.users.insert({
    "id" : "info-drixit-2",
    "avatar" : "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
    "email" : "info@drixit.com",
    "password" : hex_md5("other-password"),
    "name" : "Info",
    "surname" : "Drixit",
    "age" : 30,
    "role" : "user"
})

print('END #################################################################');