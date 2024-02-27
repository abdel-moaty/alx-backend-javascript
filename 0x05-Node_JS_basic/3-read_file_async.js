const fs = require('fs');

const countStudents = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n').filter(Boolean);
        const groups = {
          CS: [],
          SWE: []
        };

        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',').map(str => str.trim());
          const name = parts[0];
          const field = parts[3];
          if (field === 'CS' || field === 'SWE') {
            groups[field].push(name);
          }
        }

        const totalStudents = lines.length - 1;
        console.log(`Number of students: ${totalStudents}`);
        for (const [field, students] of Object.entries(groups)) {
          console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
        }
        resolve(true);
      }
    });
  });
};

module.exports = countStudents;
