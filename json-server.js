'use strict';
const faker = require('faker');
const fakeBody = () =>
  `${faker.company.catchPhrase()}. ${faker.company.catchPhrase()}. ${faker.lorem.paragraphs(faker.random.number({min: 2, max: 8}))}.`;

const message = (props) => Object.assign({
  from: `${faker.name.firstName()} ${faker.name.lastName()}`,
  fromAvatar: faker.image.avatar(),
  subject: faker.company.catchPhrase(),
  body: fakeBody(),
  flagged: faker.random.boolean(),
}, props);

const messages = [];
for (let id = 1; id < 100; id++)
  messages.push(message({id}));


function getInitialData() {
  return {
    messages,
  }
}

module.exports = getInitialData;
