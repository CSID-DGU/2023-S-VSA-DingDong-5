const { Schema, Mongoose } = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

module.exports = (schema, mongoose, name, inc_field) => {
  const AutoIncrement = AutoIncrementFactory(mongoose);
  const option = { id: `${name}_${inc_field}`, inc_field };
  schema.plugin(AutoIncrement, option);
};
