db.dropDatabase();
db.createCollection("users");
db.users.insert({
    accounts:"gcf",
    created_at:new Date(),
    pwd:hex_md5("1234"),
    nick:"admin",
    avatar:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACO0lEQVR42u2ZaXOCMBCG/f9/TRFw6jHO9LDlEKQqrdyF7S697UwhkEDo+OH9mOR9shuSXUZhGMKQNboA/DcAcx/ByklAtTJQzBfQ7AL0bQGqncPaTeQCOAUh3HgxTK380+jMgT+1dNJybPA+vleAxTYtjVeZ/i4NIXX7LTokHSPVBqQxwM6PmIxXQZmHuFuAlZuCjovz0sLNugOg3SpTgSMAzdcZwLXHd/c7B1hiuAcNsHBeBABAdwBXwwfIuQOQLgB1Nd9iCmHIeUqzoeNDPFQA5xjhS7MQAFDADucWDjClJ/IWhEgxc/EAqg3CAEj+88ABXD8aNsBOPEAhFODpJDiFNMEAwg9xgOUfvRx5G6fbvbOLzD9FsN7x+5wu3bxxXdyqqOcFEAQ9dSXKfg8aaKWGTwhuja37fdrYvO4UZTr23plz/Zg9Gi13nntrkSBYAIxDIhfAEd8wUzRWRwreJawXlnAAMsQCEASSAZChKeZ1Hc2wopOuvV6mUE2AuWwAtPszO6sNMMGKznuK5AAg8xOspOqa/w7B4yC3ArAPEWhWxmz+U0YGD48dXWSuH8LGi0A3UxgbOe560dz4mRSMBs2p4tx3uIbDUNxXAmy8GGbWl2lajJfx3yBQrkFr6RbBxM0BaIIxGaaJe9QYN0wxM3aAcmDP5j9EB54JgAprCqdMuvWSegD0WZzTX0TJABQ8F8fnGgAq/f6Uzfy7xkZRDTAxQVoAUlAFILN5knfW+PoBYB1i6QGu7J+f1FebMjmuZa3kQAAAAABJRU5ErkJggg==",
    profile:'nothing yet',
    firends:[],
    isadmin:true,
    notebook:0,
    todocount:0,
    pageurl:''
});
