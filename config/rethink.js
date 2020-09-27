const r = require('rethinkdb');
const dbConfig = require('./db');

const connection = r.connect(dbConfig).then(connection => {
	module.exports.findById = async (tableName, id) => {
		return await r
			.table(tableName)
			.filter(r.row('id').eq(id))
			.run(connection)
			.then(cursor => {
				return cursor.toArray();
			});
	};
	module.exports.findByEmail = async (tableName, email) => {
		return await r
			.table(tableName)
			.filter(r.row('email').eq(email))
			.run(connection)
			.then(cursor => {
				return cursor.toArray();
			});
	};
	module.exports.insertUser = async (tableName, data) => {
		return await r
			.table(tableName)
			.insert(data)
			.run(connection)
			.then(result => result);
	};
});
