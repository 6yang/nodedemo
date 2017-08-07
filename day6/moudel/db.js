/**
 * Created by liuyang on 2017/7/15.
 */
var MongoClient = require('mongodb').MongoClient;

function _connect(datebase,callback){
    var url = "mongodb://localhost:27017/"+datebase;
    MongoClient.connect(url,function(err,db){
        callback(err,db);
    });
}
//插入数据
exports.insertOne = function (datebase,collectionName,json,callback) {
    _connect(datebase,function(err,db){
        if(err){
            callback(err,db);
            db.close();
            return;
        }
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);

            db.close();

        })
    })
}
//查找数据
exports.find = function(datebase,collectionName,json,D,E){
    if(arguments.length == 4){
        var callback = D;
        var skipNumber = 0;
        var limit = 0;
        var sort = {};
    }else if(arguments.length == 5){
        var callback = E;
        var limit = parseInt(D.limit) ||0;
        var skipNumber =parseInt( D.skip)*parseInt(D.limit) || 0;
        var sort = D.sort||{};
    }else{
        throw new  Error("参数不正确");
    }

    var result= [];

    _connect(datebase,function(err,db){
        var cursor = db.collection(collectionName).find(json).limit(limit).skip(skipNumber).sort(sort);

        cursor.each(function(err,doc){
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            if(doc!=null){
                result.push(doc)
            }else{
                callback(null,result);
                db.close();
            }
        })
    });
}
//删除
exports.deleteMany = function(datebase,collectionName,json,callback){
    _connect(datebase,function(err,db){
       db.collection(collectionName).deleteMany(json,function(err,result){
           callback(err,result);
           db.close();
       })
    });
}
//修改
exports.updateMany = function(datebase,collectionName,json1,json2,callback){
    _connect(datebase,function(err,db){
       db.collection(collectionName).updateMany(
           json1,
           json2,
           function(err,result){
               callback(err,result);
           }
       );
    });
}
exports.fcount = function(datebase,collectionName,callback){
    _connect(datebase,function(err,db){
       db.collection(collectionName).count({}).then(function(count){
           callback(count);
           db.close();
       });
    });
}