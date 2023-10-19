class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findOne(name) {
    return await this.model.findOne(name);
  }

  async update(data) {
    return await this.model.findOneAndUpdate(data);
  }

  async delete(name) {
    return await this.model.findOneAndDelete({ name });
  }

  async findAll() {
    return await this.model.find();
  }

  // Add other common database operations as needed
}

module.exports = BaseRepository;
