const Car = function (make, speed) {
	this.make = make;
	this.speed = speed;
};

Car.prototype.accelerate = function () {
	this.speed += 10;
	console.log("The speed of ", this.make, " car is ", this.speed, " KM/H");
};

Car.prototype.brake = function () {
	this.speed -= 5;
	console.log("The speed of ", this.make, " car is ", this.speed, " KM/H");
};

let BMW = new Car("BMW", 120);
let Mercedes = new Car("Mercedes", 95);

BMW.accelerate();
BMW.accelerate();
BMW.accelerate();
BMW.accelerate();
BMW.accelerate();

BMW.brake();
BMW.brake();
BMW.brake();
BMW.brake();

Mercedes.accelerate();
Mercedes.accelerate();
Mercedes.accelerate();

Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
