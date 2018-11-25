const appRoot = require('app-root-path');
const { Model } = require('objection');
const Knex = require('knex');

const knexConfig = require(`${appRoot}/knexfile`);

const knex = Knex(knexConfig[process.env.NODE_ENV]);
Model.knex(knex);


class Person extends Model {
  static get tableName() {
    return 'persons';
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: 'persons.id',
          to: 'persons.parentId',
        }
      }
    };
  }
}

async function createSchema() {
  const hasTable = await knex.schema.hasTable('persons');
  if (!hasTable) {
    return knex.schema.createTable('persons', table => {
      table.increments('id').primary();
      table.integer('parentId').references('persons.id');
      table.string('firstName');
    });
  }
}

async function main() {
  const sylvester = await Person.query().insertGraph({
    firstName: 'Sylvester',
    children: [
      {
        firstName: 'Sage',
      },
      {
        firstName: 'Luke',
      },
    ],
  });

  console.log('created:', sylvester);

  const sylvesters = await Person.query()
    .where('firstName', 'Sylvester')
    .eager('children')
    .orderBy('id');
  
  console.log('sylvesters:', sylvesters);

}

createSchema().then(() => main()).catch(console.error);
