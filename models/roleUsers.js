var db=require('../config/DBConnection');

exports.getAllRoleUser = () => {
	var sql = `select * from role_user`;
	return db.load(sql);
}

exports.getIdRoleUserByName = (name) => {
	var sql = `select * from role_user where name='${name}'`;
	return db.load(sql);
}
