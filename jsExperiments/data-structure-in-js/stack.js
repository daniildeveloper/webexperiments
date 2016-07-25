function stack() {
  this._size = 0;
  this.storage = {};  //позволяет каждому экземпляру иметь собственный контейнер
}

stack.prototype.push = function (data) {
  //увеличиваем размер хранилища
  var size = this._size++;

  //назначает размер в качестве ключа хранилища
  //назначает данные в качестве значения ключа
  this.storage[size] = data;
};

//удаление данных [подразумевает удаление только последнего добавленного значения]
stack.prototype.pop = function () {
  var size = this._size,
    deletedData;

  if (size) {
    deletedData = this.storage[size];

    delete this.storage[size];

    this.size--;

    return deletedData;
  }
};


//реализация очереди
function Queque() {
  this._oldestIndex = 1;
  this._newestJndex = 1;
  this._storage = [];
}


//возвращает размер очереди, сохраняя индексы
Queque.prototype.size = function () {
  return this._newestJndex - this._oldestIndex;
};

Queque.prototype.enqueue = function (data) {
  this._storage[this._newestJndex] = data;
  this._newestJndex++;
};

Queque.prototype.dequeue = function () {
  var oldestIndex = this._oldestIndex,
    deletedData = this._storage[oldestIndex],
    newestIndex = this._newestJndex;

  if (oldestIndex !== newestIndex) {
    delete this._storage[oldestIndex];
    this._oldestIndex++;

    return deletedData;
  }
};