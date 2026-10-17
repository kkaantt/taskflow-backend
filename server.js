const express = require('express');
const app = express();
const PORT = 3000;

// Middleware'ler
app.use(express.json());
const logger = require('./middlewares/logger');
app.use(logger);

// Router'ları bağlama (Eğer klasör adını routes yaptıysan burası doğrudan çalışacaktır)
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

// Çalışanları listelemek için ek endpoint
const fs = require('fs');
const path = require('path');
app.get('/employees', (req, res) => {
    const dataFilePath = path.join(__dirname, 'data/data.json');
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    res.json(JSON.parse(fileData).employees);
});

// Ana sayfa
app.get('/', (req, res) => {
    res.send('Taskflow API Projesine Hoş Geldiniz!');
});

// Sunucuyu başlatma
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});