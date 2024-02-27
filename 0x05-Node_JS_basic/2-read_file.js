const fs = require('fs');

const countStudents = (path) => {
  try {
    let data = fs.readFileSync(path, 'utf8').toString().split('\n');
    data = data.slice(1, -1);
    const fields = {};
    for (const row of data) {
      const [student, , , field] = row.split(',').map((item) => item.trim());
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student);
    }
    console.log(`Number of students: ${data.length}`);
    for (const field in fields) {
      if (field) {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
