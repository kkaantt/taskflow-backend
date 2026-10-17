const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/data.json');

const readData = () => {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// 1. Görev Listeleme (GET /tasks)
router.get('/', (req, res) => {
    const data = readData();
    res.json(data.tasks);
});

// 2. Görev Detayı (GET /tasks/:id)
router.get('/:id', (req, res) => {
    const data = readData();
    const taskId = parseInt(req.params.id);
    const task = data.tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Görev bulunamadı!" });
    }
    res.json(task);
});

// 3. Yeni Görev Ekleme (POST /tasks)
router.post('/', (req, res) => {
    const data = readData();
    const { title, description, priority, status, assignee } = req.body;

    if (!title || !assignee) {
        return res.status(400).json({ error: "Başlık ve atanan kişi (assignee) alanları zorunludur." });
    }

    const newTask = {
        id: data.tasks.length > 0 ? data.tasks[data.tasks.length - 1].id + 1 : 1,
        title,
        description: description || "",
        priority: priority || "medium",
        status: status || "pending",
        assignee
    };

    data.tasks.push(newTask);
    writeData(data);

    res.status(201).json({ message: "Görev başarıyla oluşturuldu.", task: newTask });
});

// 4. Görev Güncelleme (PUT /tasks/:id)
router.put('/:id', (req, res) => {
    const data = readData();
    const taskId = parseInt(req.params.id);
    const taskIndex = data.tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Güncellenecek görev bulunamadı!" });
    }

    const { title, description, priority, status, assignee } = req.body;

    data.tasks[taskIndex] = {
        id: taskId,
        title: title || data.tasks[taskIndex].title,
        description: description !== undefined ? description : data.tasks[taskIndex].description,
        priority: priority || data.tasks[taskIndex].priority,
        status: status || data.tasks[taskIndex].status,
        assignee: assignee || data.tasks[taskIndex].assignee
    };

    writeData(data);
    res.json({ message: "Görev başarıyla güncellendi.", task: data.tasks[taskIndex] });
});

// 5. Görev Silme (DELETE /tasks/:id)
router.delete('/:id', (req, res) => {
    const data = readData();
    const taskId = parseInt(req.params.id);
    const taskIndex = data.tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Silinecek görev bulunamadı!" });
    }

    const deletedTask = data.tasks.splice(taskIndex, 1);
    writeData(data);

    res.json({ message: "Görev başarıyla silindi.", task: deletedTask[0] });
});

module.exports = router;