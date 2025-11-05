class BaseService {
  constructor(model) {
    if (!model) throw new Error("Model é obrigatório no service");
    this.model = model;
  }

  async create(data, options = {}) {
    if (this.beforeCreate) await this.beforeCreate(data, options);
    const created = await this.model.create(data, options);
    if (this.afterCreate) await this.afterCreate(created, options);
    return created;
  }

  async getAll(query = {}) {
    return await this.model.findAll(query);
  }

  async getById(id, query = {}) {
    return await this.model.findByPk(id, query);
  }

  async update(id, data, options = {}) {
    const instance = await this.getById(id);
    if (!instance) return null;

    if (this.beforeUpdate) await this.beforeUpdate(instance, data, options);
    await instance.update(data, options);
    if (this.afterUpdate) await this.afterUpdate(instance, options);

    return instance;
  }

  async delete(id, options = {}) {
    const instance = await this.getById(id);
    if (!instance) return null;

    if (this.beforeDelete) await this.beforeDelete(instance, options);
    await instance.destroy(options);
    if (this.afterDelete) await this.afterDelete(id, options);

    return instance;
  }
}

module.exports = BaseService;
