const poolPromise = require('../config/db');

async function getAllBooks() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Books');
    return result.recordset;  // Return all books
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Error fetching books');
  }
}

async function getBookById(id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)  // Prevent SQL injection
      .query('SELECT * FROM Books WHERE id = @id');
    
    if (result.recordset.length === 0) {
      throw new Error('Book not found');
    }
    
    return result.recordset[0];  // Return the first (and only) book
  } catch (error) {
    console.error('Error fetching book:', error);
    throw new Error('Error fetching book');
  }
}

// Add a new book
async function createBook(title) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('title', sql.NVarChar, title)
      .query('INSERT INTO Books (title) OUTPUT INSERTED.id, INSERTED.title VALUES (@title)');
    
    return result.recordset[0];  // Return the newly inserted book
  } catch (error) {
    console.error('Error creating book:', error);
    throw new Error('Error creating book');
  }
}

// Update an existing book
async function updateBook(id, title) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, title)
      .query('UPDATE Books SET title = @title WHERE id = @id');
    
    if (result.rowsAffected === 0) {
      throw new Error('Book not found');
    }

    return { id, title };
  } catch (error) {
    console.error('Error updating book:', error);
    throw new Error('Error updating book');
  }
}

// Delete a book
async function deleteBook(id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Books WHERE id = @id');
    
    if (result.rowsAffected === 0) {
      throw new Error('Book not found');
    }

    return { id };
  } catch (error) {
    console.error('Error deleting book:', error);
    throw new Error('Error deleting book');
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
