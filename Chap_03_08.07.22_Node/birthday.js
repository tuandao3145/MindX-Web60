const getBirthday = (dateString) => {
	return new Date(dateString);
};

// console.log(getBirthday("1996/08/21"));

module.exports.getBirthday = getBirthday;
