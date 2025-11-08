// Simple dependency injection container
class Container {
  constructor() {
    this.services = new Map();
    this.singletons = new Map();
  }

  // Register a service
  register(name, factory, options = {}) {
    this.services.set(name, { factory, options });
  }

  // Register a singleton service
  registerSingleton(name, factory) {
    this.register(name, factory, { singleton: true });
  }

  // Resolve a service
  resolve(name) {
    if (!this.services.has(name)) {
      throw new Error(`Service ${name} not registered`);
    }

    const { factory, options } = this.services.get(name);

    // If it's a singleton and already created, return the existing instance
    if (options.singleton && this.singletons.has(name)) {
      return this.singletons.get(name);
    }

    // Create new instance
    const instance = factory(this);
    
    // Store singleton if needed
    if (options.singleton) {
      this.singletons.set(name, instance);
    }

    return instance;
  }

  // Get all registered services
  getServices() {
    return Array.from(this.services.keys());
  }
}

module.exports = Container;