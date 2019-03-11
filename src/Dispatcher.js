const Dispatcher = (() => {
  let instance;
  let _id = 0;
  const _callbacks = {};

  function Dispatcher() {
    if (instance) return instance;
    instance = this;
  };
  
  Dispatcher.prototype.register = callback => {
    _callbacks[_id] = callback;
    return _id++
  };

  Dispatcher.prototype.unregister = id => { delete _callbacks[id] };

  Dispatcher.prototype.dispatch = payload => {
    for( let id in _callbacks ) { _callbacks[id](payload) }
  }

  return Dispatcher;
})();

export default Dispatcher
