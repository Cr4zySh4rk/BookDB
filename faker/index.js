const mongoose = require('mongoose');
const faker = require('faker');

// Replace 'your_database_url' with the actual URL of your MongoDB database
mongoose.connect("mongodb+srv://root:root@cluster0.f8mtppf.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    issued: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

async function generateRandomData() {
  const books = [];

  for (let i = 0; i < 10000; i++) { // increase number for more random entries to be inserted into the database
    const book = {
      title: faker.lorem.words(),
      author: faker.name.findName(),
      publishYear: faker.random.number({ min: 1800, max: 2023 }), // Adjust the range as needed
      issued: faker.random.arrayElement(['Yes', 'No']),
    };

    books.push(book);
  }

  await Book.insertMany(books);
  console.log('Random entries inserted successfully.');
  mongoose.connection.close();
}

generateRandomData();