var Person = function(firstAndLast) {
  var full = firstAndLast;

  this.getFirstName = function() {
    return full.split(' ')[0];
  };

  this.getLastName = function() {
    return full.split(' ')[1];
  };

  this.getFullName = function() {
    return full;
  };

  this.setFirstName = function(name) {
    full = name + ' ' + this.getLastName();
  };

  this.setLastName = function(name) {
    full = this.getFirstName() + ' ' + name;
  };

  this.setFullName = function(name) {
    full = name;
  };
};

var bob = new Person('Bob Ross');
bob.getFullName();